import React from "react";

const BuyingSelling: React.FC<void> = () => {
  return (
    <main className="flex min-h-screen flex-col p-12">
      <h1>Buying & Selling</h1>
      <div>
        Exchanges are the place where you can buy or sell one currency with
        another currency. Usually, there is a company in the middle who
        facilitates this trade. If you want to buy currency A for currency B,
        you send currency B to the company. The company finds the seller for the
        currency A, and then send the currency A to you.
      </div>
    </main>
  );
};

export default BuyingSelling;
