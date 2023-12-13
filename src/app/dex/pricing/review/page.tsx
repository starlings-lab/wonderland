"use client";
import React from "react";

import ReviewCard from "@/components/ReviewCard";

const ReviewPage: React.FC = () => {
  return (
    <ReviewCard nextTopicIndex={2}>
      <div className="mb-5">
        We learned how a decentralized exchange allows people to exchange one
        cryptocurrency with another one without a middleman using their pricing
        mechanism.
      </div>
    </ReviewCard>
  );
};

export default ReviewPage;
