import React from "react";
import clsx from "clsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFeedback } from "../data/feedback";
import { addVote } from "../data/vote";

const AddFeedbackForm = ({ className }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const newFeedback = await createFeedback(formData);
      await addVote(newFeedback.uid);
      return newFeedback;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    mutate(
      {
        title: formData.get("title"),
        description: formData.get("description"),
      },
      {
        onSuccess: () => {
          event.target.reset();
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx("card bg-base-100 shadow-lg", className)}
    >
      <fieldset disabled={isPending} className="card-body space-y-4">
        <legend className="sr-only">Submit Your Feedback</legend>
        <div className="space-y-2">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter a descriptive title"
            name="title"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Describe your feedback in detail"
            name="description"
            required
          />
        </div>

        <button
          data-o-authenticated
          type="submit"
          className="btn btn-primary w-full mb-0"
          disabled={isPending}
        >
          {isPending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Submit Feedback"
          )}
        </button>

        <div
          className="w-full tooltip mb-0"
          data-tip="Login to submit feedback"
          data-o-anonymous
        >
          <button type="submit" className="btn btn-primary w-full" disabled>
            Submit Feedback
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default AddFeedbackForm;
