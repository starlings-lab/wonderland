import React from "react";

import ReviewCard from "@/components/ReviewCard";

const ReviewPage: React.FC = () => {
  return (
    <ReviewCard nextTopicIndex={1}>
      <div className="mb-5">
        We learned what a decentralized exchange is and how you can buy a
        cryptocurrency there.
      </div>
    </ReviewCard>
  );
};

export default ReviewPage;
