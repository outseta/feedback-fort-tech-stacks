import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "../../data/comments";

const EditCommentForm = ({ comment, onCancel }) => {
  const [editContent, setEditContent] = React.useState(comment.content);
  const queryClient = useQueryClient();

  const { mutate: updateMutate, isPending: isUpdating } = useMutation({
    mutationFn: () => updateComment(comment.uid, editContent),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", comment.feedback_uid],
      });
      onCancel();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        className="textarea textarea-bordered w-full"
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        disabled={isUpdating}
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-ghost btn-sm"
          disabled={isUpdating}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={isUpdating}
        >
          {isUpdating ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </form>
  );
};

export default EditCommentForm;
