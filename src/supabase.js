import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  accessToken: async (token) => {
    // On redirect, the access token is passed in the URL
    const url = new URL(window.location.href);
    const outsetaAccessParam = url.searchParams.get("access_token");
    // After redirect, the access token is available getAccessToken()
    const outsetaAccessToken =
      window.Outseta.getAccessToken() || outsetaAccessParam;
    const supabaseAccessToken = await exchangeToken(outsetaAccessToken);
    return supabaseAccessToken || token;
  },
});

let exchangeCache = null;

// Function to exchange Outseta token for Supabase token
export async function exchangeToken(outsetaAccessToken) {
  if (!outsetaAccessToken) {
    // Clear cache when no token is provided
    exchangeCache = null;
    return null;
  }

  if (exchangeCache?.outsetaAccessToken === outsetaAccessToken) {
    console.log("Return cached Supabase token");
    return exchangeCache.supabaseAccessToken;
  }

  try {
    console.log("Exchange Outseta token for Supabase token");
    const response = await fetch(`${supabaseUrl}/functions/v1/exchange`, {
      method: "POST",
      headers: {
        // Use the Outseta access token to exchange for a Supabase access token
        Authorization: `Bearer ${outsetaAccessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Token exchange failed");
    }

    const { supabaseAccessToken } = await response.json();
    exchangeCache = { supabaseAccessToken, outsetaAccessToken };
    return supabaseAccessToken;
  } catch (error) {
    console.error("Error exchanging token:", error);
    throw error;
  }
}
