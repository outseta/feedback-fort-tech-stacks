import React from "react";
import { useQuery } from "@tanstack/react-query";
import { listComments } from "../../data/comments";
import Comment from "./Comment";
import AddCommentForm from "./AddCommentForm";

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
    <div className="flex flex-col h-full max-h-[400px]">
      <div className="flex-1 overflow-y-auto space-y-3 px-0">
        {comments?.map((comment) => (
          <Comment key={comment.uid} comment={comment} />
        ))}
      </div>
      <div className="pt-2 bg-base-100 sticky bottom-0 z-10 w-full p-0">
        <AddCommentForm feedbackUid={feedbackUid} />
      </div>
    </div>
  );
};

export default CommentList;
