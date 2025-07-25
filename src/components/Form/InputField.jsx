
import React from 'react';

const InputField = ({ label, value, onChange, type = 'text', required = true }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      className="w-full border border-gray-300 rounded px-4 py-2"
      type={type}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

export default InputField;
