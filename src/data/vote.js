import { supabase } from "./client";

export const addVote = async (feedbackUid) => {
  const { data, error } = await supabase
    .from("vote")
    .insert({
      feedback_uid: feedbackUid,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteVote = async (voteUid) => {
  const { data, error } = await supabase
    .from("vote")
    .update({ deleted_at: new Date().toISOString() })
    .eq("uid", voteUid)
    .select()
    .single();

  if (error) throw error;
  return data;
};
