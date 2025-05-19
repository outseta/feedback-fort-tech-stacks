import React from "react";
import clsx from "clsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addVote, deleteVote } from "../data/vote";

const VoteButton = ({
  feedbackUid,
  upvotes,
  userVoteId,
  placement = "top",
}) => {
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
      <div
        className={clsx("tooltip", {
          "tooltip-top": placement === "top",
          "tooltip-bottom": placement === "bottom",
          "tooltip-left": placement === "left",
          "tooltip-right": placement === "right",
        })}
        data-tip={userVoteId ? "Remove vote" : "Vote"}
      >
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
        className={clsx("flex gap-2 items-center tooltip", {
          "tooltip-top": placement === "top",
          "tooltip-bottom": placement === "bottom",
          "tooltip-left": placement === "left",
          "tooltip-right": placement === "right",
        })}
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
