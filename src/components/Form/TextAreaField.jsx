
import React from 'react';

const TextAreaField = ({ label, value, onChange, rows = 4, required = true }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <textarea
      className="w-full border border-gray-300 rounded px-4 py-2"
      value={value}
      onChange={onChange}
      rows={rows}
      required={required}
    />
  </div>
);

export default TextAreaField;
