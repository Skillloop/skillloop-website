import React from 'react';
import Lines from './Lines';

const StudentTable = () => {
  const headers = [
    'Enrollment ID',
    'Full Name',
    'Email Id',
    'Course Enrolled',
    'Certificate Status',
    'Payment Status',
    'Transaction Id',
    'Admin Action',
  ];

  const colCount = headers.length;

  const actionButtons = (
    <div className="flex gap-2 justify-center">
      {['View', 'Suspend', 'Delete'].map((action) => (
        <button
          key={action}
          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-600 px-2 py-1 rounded text-xs "
        >
          {action}
        </button>
      ))}
    </div>
  );

 
  const placeholderRow = Array(colCount - 1).fill('').concat(actionButtons);
  const data = Array.from({ length: 8 }, () => placeholderRow);

  return (
    <div className="overflow-auto border rounded-lg">
      <table className="min-w-full text-xs text-center border border-gray-300 bg-white">
        <thead className="bg-gray-100 text-gray-500">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-4 py-2 border border-gray-300 text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <Lines data={data} colCount={colCount} />
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
