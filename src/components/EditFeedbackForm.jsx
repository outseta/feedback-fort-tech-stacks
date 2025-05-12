import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeedback } from "../data/feedback";

const EditFeedbackForm = ({ feedback, onClose, className }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      return updateFeedback(feedback.uid, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await mutate({
      title: formData.get("title"),
      description: formData.get("description"),
    });
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <fieldset disabled={isPending} className="fieldset space-y-4">
        <legend className="fieldset-legend text-lg mb-2">Edit Feedback</legend>
        <div className="space-y-2">
          <label className="label">Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter a descriptive title"
            name="title"
            defaultValue={feedback.title}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="label">Description</label>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Describe your feedback in detail"
            name="description"
            defaultValue={feedback.description}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-sm"
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={isPending}
          >
            {isPending ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default EditFeedbackForm;
