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
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm font-medium">
              {comment.outseta_person?.full_name ||
                comment.outseta_person?.email}
            </p>
            <p className="text-sm text-base-content/70">
              {new Date(comment.created_at).toLocaleString()}
            </p>
          </div>
          {isAuthor && (
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost btn-xs btn-circle"
                data-tip="More actions"
              >
                ⋮
              </button>
              <menu
                tabIndex={0}
                className="dropdown-content menu shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <button onClick={() => setIsEditing(true)}>Edit</button>
                </li>
                <li>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="text-error"
                  >
                    {isDeleting ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </li>
              </menu>
            </div>
          )}
        </div>
        <p className="mt-2">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
