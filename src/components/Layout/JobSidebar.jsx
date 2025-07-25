export function JobSidebar({ filters, onChange }) {
  return (
    <div className="bg-[#F8EEDD] p-6 rounded-lg shadow-md w-full max-w-xs">
      <h2 className="text-lg font-semibold mb-4">Type of Employment</h2>
      {filters.types.map(type => (
        <div key={type.label} className="flex items-center mb-2">
          <input type="checkbox" className="mr-2" checked={type.checked} onChange={() => onChange(type.label)} />
          <label className="text-sm text-gray-700">{type.label}</label>
        </div>
      ))}
      <h2 className="text-lg font-semibold mt-6 mb-4">Experience Level</h2>
      {filters.experience.map(exp => (
        <div key={exp.label} className="flex items-center mb-2">
          <input type="checkbox" className="mr-2" checked={exp.checked} onChange={() => onChange(exp.label)} />
          <label className="text-sm text-gray-700">{exp.label}</label>
        </div>
      ))}
    </div>
  );
}