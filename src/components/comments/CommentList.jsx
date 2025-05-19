import React from "react";
import { useQuery } from "@tanstack/react-query";
import { listComments } from "../../data/comments";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentList = ({ feedbackUid }) => {
  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["comments", feedbackUid],
    queryFn: () => listComments(feedbackUid),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <span className="loading loading-spinner loading-sm"></span>
      </div>
    );
  }

  if (isError) {
    return <div className="text-error text-sm">Error: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      <CommentForm feedbackUid={feedbackUid} />
      <div className="space-y-4">
        {comments?.map((comment) => (
          <Comment key={comment.uid} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
