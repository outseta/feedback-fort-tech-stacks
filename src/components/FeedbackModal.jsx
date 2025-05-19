import React from "react";
import clsx from "clsx";
import CommentList from "./comments/CommentList";
import StatusBadge from "./StatusBadge";
import VoteButton from "./VoteButton";
import FeedbackMenu from "./FeedbackMenu";

const FeedbackModal = ({ feedback, open, onClose }) => {
  if (!open || !feedback) return null;

  return (
    <div
      className={clsx("modal modal-open", open && "modal-open")}
      tabIndex={-1}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div
        className="modal-box max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        <div className="mb-4">
          <h2 className="card-title text-2xl mb-2">{feedback.title}</h2>
          <p className="mb-2">{feedback.description}</p>
          <div className="flex gap-2 items-center mb-2">
            <StatusBadge status={feedback.status} />
            <VoteButton
              feedbackUid={feedback.uid}
              upvotes={feedback.upvotes}
              userVoteId={feedback.user_vote_id}
            />
            <span className="text-lg">💬 {feedback.comment_count}</span>
            {feedback.is_user_feedback && <FeedbackMenu feedback={feedback} />}
          </div>
        </div>
        <div className="divider">Comments</div>
        <CommentList feedbackUid={feedback.uid} />
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default FeedbackModal;
