import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import StatusBadge, { STATUS_OPTIONS } from "./StatusBadge";
import VoteButton from "./VoteButton";
import { listFeedbackWithVotes } from "../data/feedback";

const FeedbackList = ({ className, statuses = STATUS_OPTIONS }) => {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const {
    data: feedback,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["feedback"],
    queryFn: listFeedbackWithVotes,
    onError: (error) => {
      console.error(error);
    },
  });

  const getStatusCount = (status) => {
    if (!feedback) return 0;
    if (status === "all") return feedback.length;
    return feedback.filter((item) => item.status === status).length;
  };

  const filteredFeedback = feedback?.filter((item) =>
    selectedStatus === "all" ? true : item.status === selectedStatus
  );

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return <div className="text-error">Error: {error.message}</div>;
  }

  return (
    <div className="space-y-8">
      <menu className="flex flex-wrap gap-2 justify-center">
        {statuses.map((status) => (
          <StatusBadge
            key={status}
            status={status}
            onClick={() => setSelectedStatus(status)}
            isSelected={selectedStatus === status}
            count={getStatusCount(status)}
          />
        ))}
      </menu>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
      >
        {filteredFeedback.map((item) => (
          <div key={item.uid} className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
              <p>{item.description}</p>
              <div className="card-actions justify-between items-center mt-4">
                <StatusBadge
                  onClick={() => setSelectedStatus(item.status)}
                  status={item.status}
                />
                <VoteButton
                  feedbackUid={item.uid}
                  upvotes={item.upvotes}
                  userVoteId={item.user_vote_id}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;
