import React from 'react';

const GlanceCard = ({ title, className = '', children }) => {
  return (
    <div className={`bg-orange-100 rounded-xl p-4 shadow-md ${className}`}>
      <h3 className="text-2xl  flex justify-center font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
};

export default GlanceCard;