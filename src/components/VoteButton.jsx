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
      <div className="tooltip" data-tip={userVoteId ? "Remove vote" : "Vote"}>
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
          data-o-authenticated // Vote button - only shown when logged in
        >
          <span className="text-lg">👍</span>
          <span>{upvotes}</span>
        </button>
      </div>
      <div
        className="flex gap-2 items-center tooltip"
        data-tip="Login to vote"
        data-o-anonymous // Vote summary - only shown when logged out
      >
        <span className="text-lg">👍</span>
        <span className="text-xs font-semibold">{upvotes}</span>
      </div>
    </>
  );
};

export default VoteButton;
