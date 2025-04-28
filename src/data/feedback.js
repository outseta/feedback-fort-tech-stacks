import { supabase } from "../supabase";

export const createFeedback = async (newFeedback) => {
  const { data, error } = await supabase
    .from("feedback")
    .insert(newFeedback)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const listFeedbackWithVotes = async () => {
  const { data, error } = await supabase
    .from("active_feedback_with_votes")
    .select()
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
};

export const deleteFeedback = async (feedbackUid) => {
  const { data, error } = await supabase
    .from("feedback")
    .update({ deleted_at: new Date().toISOString() })
    .eq("uid", feedbackUid)
    .select()
    .single();

  if (error) throw error;
  return data;
};
