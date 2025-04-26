import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

const fetchFeedback = async () => {
  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

const getStatusColor = (status) => {
  switch (status) {
    case "requested":
      return "badge-primary";
    case "planned":
      return "badge-info";
    case "in_progress":
      return "badge-warning";
    case "completed":
      return "badge-success";
    case "rejected":
      return "badge-error";
    default:
      return "badge-ghost";
  }
};

const FeedbackList = ({ className }) => {
  const {
    data: feedback,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["feedback"],
    queryFn: fetchFeedback,
  });

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
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className} `}
    >
      {feedback.map((item) => (
        <div key={item.uid} className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">{item.title}</h2>
            <p>{item.description}</p>
            <div className="card-actions justify-between items-center mt-4">
              <div
                className={`badge badge-soft ${getStatusColor(item.status)}`}
              >
                {item.status.replace("_", " ")}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">👍 {item.upvotes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
