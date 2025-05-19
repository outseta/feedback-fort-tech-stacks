import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../data/comments";
import { useUser } from "../../data/user";
import EditCommentForm from "./EditCommentForm";

const Comment = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const { data: user } = useUser();

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteComment(comment.uid),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", comment.feedback_uid],
      });
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteMutate();
    }
  };

  const isAuthor = user?.Uid === comment.outseta_person_uid;

  if (isEditing) {
    return (
      <EditCommentForm comment={comment} onCancel={() => setIsEditing(false)} />
    );
  }

  return (
    <div className="px-4 py-2">
      <div className="flex items-center mt-0.5 gap-2">
        <span className="text-xs text-base-content/40 font-normal">
          {new Date(comment.created_at).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}
        </span>
        {isAuthor && <div className="flex-1 h-px bg-base-content/10 mx-2" />}
        {isAuthor && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-xs btn-ghost min-h-0 h-5 w-5 p-0 opacity-50 hover:opacity-100 focus:opacity-100"
              type="button"
              aria-label="Edit comment"
            >
              <span role="img" aria-label="Edit">
                ✏️
              </span>
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="btn btn-xs btn-ghost text-error min-h-0 h-5 w-5 p-0 opacity-50 hover:opacity-100 focus:opacity-100"
              type="button"
              aria-label="Delete comment"
            >
              {isDeleting ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <span role="img" aria-label="Delete">
                  🗑️
                </span>
              )}
            </button>
          </div>
        )}
      </div>
      <div className="mt-1">
        <p className="whitespace-pre-line text-base-content text-sm m-0 inline">
          {comment.content}
        </p>
      </div>
    </div>
  );
};

export default Comment;
