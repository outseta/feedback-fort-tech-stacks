import React from "react";
import clsx from "clsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addVote, deleteVote } from "../data/vote";

const VoteButton = ({ feedbackUid, upvotes, userVoteId }) => {
  const queryClient = useQueryClient();

  const { mutate: vote, isPending } = useMutation({
    mutationFn: async () => {
      if (userVoteId) {
        return deleteVote(userVoteId);
      } else {
        return addVote(feedbackUid);
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
