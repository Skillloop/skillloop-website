import React from 'react';
import Lines from './Lines';

const PaymentConfirmation = () => (
  <table className="w-full text-xs text-left bg-white rounded-lg overflow-hidden border border-gray-300 shadow">
    <thead className="bg-gray-100 text-gray-500">
      <tr>
        {[
          "Application Id", 
          "Full Name", 
          "Contact Number", 
          "Email Id",
          "Institute", 
          "Role Applied for", 
          "Applied on", 
          "Resume",
          "External Links",
          "Status",
        ].map((heading, index, array) => (
          <th
            key={heading}
            className={`px-4 py-2 border-b border-gray-300 text-center ${
              index !== array.length - 1 ? 'border-r border-gray-300' : ''
            }`}
          >
            {heading}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="text-gray-700">
      <Lines colCount={10} rowCount={3} />
    </tbody>
  </table>
);

export default PaymentConfirmation;
