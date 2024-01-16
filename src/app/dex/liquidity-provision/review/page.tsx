import React from "react";

import dynamic from "next/dynamic";

const ReviewCard = dynamic(() => import("@/components/ReviewCard"), {
  ssr: false,
});

const ReviewPage: React.FC = () => {
  return (
    <ReviewCard nextTopicIndex={5}>
      <div className="mt-5 mb-1">
        We learned how to provide liquidity in a decentralized exchange. Here is
        a quick summary:
      </div>
      <ol className="ml-5 list-disc list-inside">
        <li>Anyone can provide liquidity without asking for permission</li>
        <li>You need to provide two cryptocurrencies together</li>
        <li>The value of these two cryptocurrencies should be the same</li>
      </ol>
    </ReviewCard>
  );
};

export default ReviewPage;
