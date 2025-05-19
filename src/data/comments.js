import { supabase } from "./client";

export const createComment = async (feedbackUid, content) => {
  const { data, error } = await supabase
    .from("comments")
    .insert({
      feedback_uid: feedbackUid,
      content,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const listComments = async (feedbackUid) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("feedback_uid", feedbackUid)
    .is("deleted_at", null)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
};

export const updateComment = async (commentUid, content) => {
  const { data, error } = await supabase
    .from("comments")
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq("uid", commentUid)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteComment = async (commentUid) => {
  const { data, error } = await supabase
    .from("comments")
    .update({ deleted_at: new Date().toISOString() })
    .eq("uid", commentUid)
    .select()
    .single();

  if (error) throw error;
  return data;
};
