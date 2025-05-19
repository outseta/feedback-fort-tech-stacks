import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../../data/comments";

const AddCommentForm = ({ feedbackUid }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ content }) => createComment(feedbackUid, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", feedbackUid] });
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
        content: formData.get("content"),
      },
      {
        onSuccess: () => {
          event.target.reset();
        },
        onError: (error) => {
          const content = event.target.content.value.trim();
          event.target.content.value = content;
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={isPending} className="space-y-2">
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Write a comment..."
          name="content"
          disabled={isPending}
          data-o-authenticated
          required
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={isPending}
            data-o-authenticated
          >
            {isPending ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Post Comment"
            )}
          </button>
        </div>
      </fieldset>
      <div
        className="tooltip w-full"
        data-tip="Login to comment"
        data-o-anonymous
      >
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="Login to write a comment..."
          disabled
        />
      </div>
    </form>
  );
};

export default AddCommentForm;
