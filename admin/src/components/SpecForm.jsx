import React, { useState } from "react";

export default function SpecForm({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [val, setVal] = useState("");

  const handleSave = () => {
    const specification = {
      name,
      value: val,
    };
    onSave((prev) => [...prev, specification]);
    setName("");
    setVal("");
    onClose();
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white p-4 rounded-md flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <label>نام</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-1 rounded-sm outline-none"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label>مقدار</label>
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="border p-1 rounded-sm outline-none"
          type="text"
        />
      </div>
      <button
        onClick={handleSave}
        type="button"
        className="w-fit p-1 bg-blue-500 text-white rounded-sm"
      >
        اضافه
      </button>
    </div>
  );
}
