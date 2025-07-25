import React from 'react';
import { FaDownload } from 'react-icons/fa';
import Lines from './Lines';

const ApplicantTable = () => {
  const headers = [
    'Application Id',
    'Full Name',
    'Email Id',
    'Course Enrolled',
    'Resume',
    'Submission Date',
    'Status',
    'Actions',
    '',
  ];

  const colCount = headers.length;

  const statusButtons = (
    <div className="flex justify-center gap-1">
      {['Accepted', 'Pending', 'Reviewed', 'Rejected'].map((status) => (
        <button
          key={status}
          className="border px-2 py-1 rounded text-xs bg-gray-200"
        >
          {status}
        </button>
      ))}
    </div>
  );

  const resumeCell = (
    <div className="flex items-center justify-between px-2 w-full h-full">
      <div className="w-1/2" />
      <div className="w-1/2 flex justify-end">
        <button className="text-gray-600 hover:text-gray-800">
          <FaDownload />
        </button>
      </div>
    </div>
  );

  const placeholderRow = Array.from({ length: colCount }).map((_, i) => {
    if (i === 6) return statusButtons;
    return '';
  });

  const data = Array.from({ length: 8 }, () => placeholderRow);

  return (
    <div className="overflow-auto border border-gray-200 rounded-lg">
      <table className="min-w-full text-xs text-lcenter border border-gray-200 bg-white">
        <thead className="bg-gray-100 text-gray-500">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 border border-gray-400 text-center"
              >
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

export default ApplicantTable;
