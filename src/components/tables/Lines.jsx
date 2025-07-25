import React from 'react';

function Lines({ data, colCount = 6 }) {
  const rows = data || Array.from({ length: 10 }, () => Array(colCount).fill(''));

  return (
    <>
      {rows.map((row, rowIndex) => (
        <tr key={rowIndex} className="h-8 border-b border-orange-300 text-gray-700">
          {row.map((cell, colIndex, array) => (
            <td
              key={colIndex}
              className={`px-4 py-0 ${
                colIndex !== array.length - 1 ? 'border-r border-orange-300' : ''
              }`}
            >
              <div className="flex items-center justify-center h-full">
                {cell}
              </div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}


export default Lines;
