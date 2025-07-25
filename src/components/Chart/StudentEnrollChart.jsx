import React from 'react';

const StudentEnrollCharts = () => {
  return (
    <div className="rounded-xl h-[160px] w-full flex items-center justify-start px-3 overflow-hidden">
      
      <div className="relative w-20 h-20 flex-shrink-0">
        <div className="absolute inset-0 border-[6px] border-gray-400 rounded-full"></div>
        <div className="absolute inset-[6px] bg-white rounded-full flex items-center justify-center text-[10px] text-center leading-tight px-1">
          Total Students
        </div>
      </div>

      
      <div className="ml-3 flex flex-col sm:flex-row flex-wrap gap-x-4 gap-y-1 text-xs text-black">
        {['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'].map((course, index) => (
          <div key={index} className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
            <span>{course}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentEnrollCharts;
