import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

const FeedbackForm = ({ className }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (newFeedback) => {
      // First create the feedback
      const { data: feedbackData, error: feedbackError } = await supabase
        .from("feedback")
        .insert(newFeedback)
        .select()
        .single();

      if (feedbackError) throw feedbackError;

      // Then add a vote for the created feedback
      const { error: voteError } = await supabase.from("vote").insert({
        feedback_uid: feedbackData.uid,
      });

      if (voteError) throw voteError;

      return feedbackData;
    },
    onSuccess: (props) => {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },
    onError: (error) => {
      console.error("error", error);
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
    <form onSubmit={handleSubmit} className={className}>
      <fieldset
        disabled={isPending}
        className="fieldset border-base-300 rounded-box border border-2 p-6"
      >
        <legend className="fieldset-legend text-lg font-semibold border-base-300 px-3">
          Submit Your Feedback
        </legend>
        <div className="form-control">
          <label className="label py-2">
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
        <div className="form-control mt-4">
          <label className="label py-2">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Describe your feedback in detail"
            name="description"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button
            // Only show active button when user is authenticated
            data-o-authenticated
            type="submit"
            className="btn btn-primary w-full"
            disabled={isPending}
          >
            {isPending ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Submit Feedback"
            )}
          </button>

          <button
            // Show inactive button when user is anonymous
            data-o-anonymous
            type="submit"
            className="btn btn-primary w-full"
            disabled
          >
            Submit Feedback
          </button>
        </div>
        <button
          className="btn btn-link btn-sm font-normal opacity-80"
          data-o-anonymous
          data-o-auth="1"
          data-mode="popup"
          data-widget-mode="login"
          type="button"
        >
          Log in to submit feedback
        </button>
      </fieldset>
    </form>
  );
};

export default FeedbackForm;
