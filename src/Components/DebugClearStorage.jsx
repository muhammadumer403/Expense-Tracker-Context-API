import React from "react";

const DebugClearStorage = () => {
  const handleClear = () => {
    localStorage.removeItem("transactions");
    window.location.reload(); // Reload to clear in-memory state
  };

  return (
    <button
      onClick={handleClear}
      className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
    >
      Clear Local Storage
    </button>
  );
};

export default DebugClearStorage;
