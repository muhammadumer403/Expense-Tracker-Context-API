import React, { useState } from "react";
import { useTracker } from "../Contexts/TrackerContext";

const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const { addTransaction } = useTracker();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) {
      alert("Invalid Amount");
      return;
    }
    const transaction = {
      type,
      amount: parseFloat(amount),
    };
    addTransaction(transaction);
    setAmount("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Transaction</h2>
      <div className="mb-4">
        <label htmlFor="type" className="block text-gray-600 mb-2">
          Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-600 mb-2">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
