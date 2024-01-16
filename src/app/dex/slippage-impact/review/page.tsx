import React from "react";

import dynamic from "next/dynamic";

const ReviewCard = dynamic(() => import("@/components/ReviewCard"), {
  ssr: false,
});

const ReviewPage: React.FC = () => {
  return (
    <ReviewCard nextTopicIndex={3}>
      <div className="mb-5">
        We learned how Price Slippage & Impact are two related concepts which
        affects pricing when swapping tokens on decentralized exchange.
      </div>
      <div className="mb-5">
        You should be able to see effect of price impact when you change the
        size of input token in the buying playground (next chapter).
      </div>
    </ReviewCard>
  );
};

export default ReviewPage;
