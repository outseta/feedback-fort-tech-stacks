import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const FeedbackList = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const { data, error } = await supabase
          .from("feedback")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setFeedback(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {feedback.map((item) => (
        <div key={item.uid} className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">{item.title}</h2>
            <p>{item.description}</p>
            <div className="card-actions justify-between items-center mt-4">
              <div className="badge badge-primary">{item.status}</div>
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
