import React from "react";
import clsx from "clsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

const VoteButton = ({ feedbackUid, upvotes, userVoteId }) => {
  const queryClient = useQueryClient();

  const { mutate: vote, isPending } = useMutation({
    mutationFn: async () => {
      if (userVoteId) {
        // Unvote by soft deleting the vote
        const { data, error } = await supabase
          .from("vote")
          .update({ deleted_at: new Date().toISOString() })
          .eq("uid", userVoteId);

        if (error) throw error;
        return data;
      } else {
        // Create new vote
        const { data, error } = await supabase.from("vote").insert({
          feedback_uid: feedbackUid,
        });

        if (error) throw error;
        return data;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
      return data;
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <>
      <button
        onClick={(event) => {
          event.preventDefault();
          vote();
        }}
        disabled={isPending}
        className={clsx("btn btn-sm gap-2 rounded-full", {
          "btn-soft": userVoteId,
          "btn-ghost": !userVoteId,
        })}
      >
        <span className="text-lg">👍</span>
        <span>{upvotes}</span>
      </button>
    </>
  );
};

export default VoteButton;
