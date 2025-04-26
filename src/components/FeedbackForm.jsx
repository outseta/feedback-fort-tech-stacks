import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

const FeedbackForm = ({ className }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (newFeedback) => {
      const { data, error } = await supabase
        .from("feedback")
        .insert([newFeedback])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
      setTitle("");
      setDescription("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      title,
      description,
      status: "requested",
      upvotes: 0,
    });
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter a descriptive title"
            required
          />
        </div>
        <div className="form-control mt-4">
          <label className="label py-2">
            <span className="label-text">Description</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Describe your feedback in detail"
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
