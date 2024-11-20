import React from "react";
import { useTracker } from "../Contexts/TrackerContext";

const Balance = () => {
  const { calculateBalance } = useTracker();
  const balance = calculateBalance();

  return (
    <div className="text-center bg-blue-50 py-4 rounded-lg shadow-md border border-blue-300">
      <h2 className="text-xl font-medium text-blue-600">Balance</h2>
      <h3 className="text-4xl font-bold text-blue-800 mt-2">${balance.toFixed(2)}</h3>
    </div>
  );
};

export default Balance;
