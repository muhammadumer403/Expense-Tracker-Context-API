import React, { useState } from "react";
import { useTracker } from "../Contexts/TrackerContext";


const Transactionlist = () => {
  const { transactions, removeTransaction, editTransaction } = useTracker();
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({ type: "", amount: "" });

  const handleEdit = (transaction) => {
    setIsEditing(transaction.id); // Set editing mode
    setEditData({ type: transaction.type, amount: transaction.amount }); // Populate form with current data
  };

  const handleSave = (id) => {
    if (!editData.amount || isNaN(editData.amount)) {
      alert("Invalid amount");
      return;
    }

    editTransaction(id, { type: editData.type, amount: parseFloat(editData.amount) }); // Update transaction
    setIsEditing(null); // Exit edit mode
    setEditData({ type: "", amount: "" }); // Reset edit form
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Transaction History</h3>
      <ul className="space-y-4">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={`p-4 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center 
              ${transaction.type === "income" ? "bg-green-50 border-green-400" : "bg-red-50 border-red-400"} border`}
          >
            {isEditing === transaction.id ? (
              <div className="w-full flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Edit Mode */}
                <select
                  value={editData.type}
                  onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                  className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 sm:w-1/3"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                <input
                  type="number"
                  value={editData.amount}
                  onChange={(e) =>
                    setEditData({ ...editData, amount: parseFloat(e.target.value) || "" })
                  }
                  className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 sm:w-1/3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(transaction.id)}
                    className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(null)}
                    className="bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Display Mode */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:w-2/3">
                  <span
                    className={`text-sm font-medium ${
                      transaction.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </span>
                  <span className="text-gray-800 text-lg">${transaction.amount.toFixed(2)}</span>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    className="text-blue-500 font-semibold hover:underline"
                    onClick={() => handleEdit(transaction)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 font-semibold hover:underline"
                    onClick={() => removeTransaction(transaction.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactionlist;
