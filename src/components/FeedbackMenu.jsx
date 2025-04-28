import React, { useState } from "react";
import clsx from "clsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import KebabMenu from "../assets/kebabmenu.svg?react";
import { deleteFeedback } from "../data/feedback";

import EditFeedbackForm from "./EditFeedbackForm";

const FeedbackMenu = ({ feedback, className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },
    onError: (error) => {
      console.error("Error deleting feedback:", error);
    },
  });

  const handleDelete = (feedbackUid) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      deleteMutate(feedbackUid);
    }
  };

  if (isEditing) {
    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <EditFeedbackForm
            feedback={feedback}
            onClose={() => setIsEditing(false)}
          />
        </div>
        <div
          className="modal-backdrop"
          onClick={() => setIsEditing(false)}
        ></div>
      </div>
    );
  }

  return (
    <div className={clsx("dropdown dropdown-end", className)}>
      <button
        tabIndex={0}
        className="btn btn-ghost btn-circle btn-xs"
        data-tip="More actions"
      >
        <KebabMenu className="size-3" />
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
            onClick={() => handleDelete(feedback.uid)}
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
  );
};

export default FeedbackMenu;
