import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../../data/comments";

const AddCommentForm = ({ feedbackUid }) => {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => createComment(feedbackUid, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", feedbackUid] });
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
      setContent("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      mutate();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        className="textarea textarea-bordered w-full"
        placeholder="Write a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isPending}
        data-o-authenticated
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={isPending || !content.trim()}
          data-o-authenticated
        >
          {isPending ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Post Comment"
          )}
        </button>
      </div>
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
