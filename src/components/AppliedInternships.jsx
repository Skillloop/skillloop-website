const AppliedInternships = () => {
  const internships = [
    {
      company: "Xinterview",
      profile: "Graphic Design Internship",
      appliedOn: "15th July 2025",
      duration: "3 Months",
      status: "Hired",
    },
    {
      company: "She Can Foundation",
      profile: "Social Sector Internship",
      appliedOn: "15th January 2026",
      duration: "4 Months",
      status: "Not selected",
    },
    {
      company: "InAmigos Foundation",
      profile: "Graphic Design Internship",
      appliedOn: "16th January 2026",
      duration: "6 Months",
      status: "Not selected",
    },
  ];

  const statusColor = {
    "Hired": "bg-green-100 text-green-600",
    "Not selected": "bg-red-100 text-red-600",
  };

  const statusDot = {
    "Hired": "bg-green-500",
    "Not selected": "bg-red-500",
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">My Applied Internships</h2>

      {/* Table layout for md+ */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[600px]">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">Company</th>
              <th className="py-2">Profile</th>
              <th className="py-2">Applied On</th>
              <th className="py-2">Duration</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {internships.map((internship, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3">{internship.company}</td>
                <td className="py-3">{internship.profile}</td>
                <td className="py-3">{internship.appliedOn}</td>
                <td className="py-3">{internship.duration}</td>
                <td className="py-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-2 w-fit ${statusColor[internship.status]}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${statusDot[internship.status]}`} />
                    {internship.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="md:hidden space-y-4">
        {internships.map((internship, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm space-y-1">
            <p className="text-sm">
              <span className="font-medium text-gray-600">Company:</span> {internship.company}
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-600">Profile:</span> {internship.profile}
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-600">Applied On:</span> {internship.appliedOn}
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-600">Duration:</span> {internship.duration}
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-600">Status:</span>{" "}
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full ${statusColor[internship.status]}`}
              >
                <span className={`w-2 h-2 rounded-full ${statusDot[internship.status]}`} />
                {internship.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedInternships;
