const AppliedJobs = () => {
  const jobs = [
    {
      company: "Xinterview",
      profile: "Graphic Design",
      appliedOn: "15th July 2025",
      status: "Hired",
    },
    {
      company: "She Can Foundation",
      profile: "Social Sector",
      appliedOn: "15th January 2026",
      status: "Not selected",
    },
    {
      company: "InAmigos Foundation",
      profile: "Graphic Design",
      appliedOn: "16th January 2026",
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
      <h2 className="text-lg font-semibold mb-4">My Applied Jobs</h2>

      {/* Table for md+ screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[500px]">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">Company</th>
              <th className="py-2">Profile</th>
              <th className="py-2">Applied On</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3">{job.company}</td>
                <td className="py-3">{job.profile}</td>
                <td className="py-3">{job.appliedOn}</td>
                <td className="py-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-2 w-fit ${statusColor[job.status]}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${statusDot[job.status]}`} />
                    {job.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="md:hidden space-y-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm space-y-1"
          >
            <p className="text-sm">
              <span className="font-medium text-gray-600">Company:</span> {job.company}
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-600">Profile:</span> {job.profile}
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-600">Applied On:</span> {job.appliedOn}
            </p>
            <p className="text-sm">
              <span className="font-medium text-gray-600">Status:</span>{" "}
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full ${statusColor[job.status]}`}
              >
                <span className={`w-2 h-2 rounded-full ${statusDot[job.status]}`} />
                {job.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
