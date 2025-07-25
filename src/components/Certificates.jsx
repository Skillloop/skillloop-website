
import { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { MdOutlineFileDownload } from "react-icons/md";

const Certificates = () => {
  const user = useSelector((state) => state.auth.user);
  const [selected, setSelected] = useState(null);

  // ✅ Pull certificates with PNG URLs
  const certificates =
    user?.yourCourses?.filter(
      (c) => c.certificateGenerated && c.certificate
    ) || [];


console.log(certificates)

  const handleDownloadAll = () => {
    certificates.forEach((cert) => {
      const link = document.createElement("a");
      link.href = cert.certificate;
      link.download = `${cert.title}.png`;
      link.click();
    });
  };

  const handleSingleDownload = (e, cert) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = cert.certificate;
    link.download = `${cert.title}.png`;
    link.click();
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-lg font-semibold">Certificates</h2>
        {certificates.length > 0 && (
          <button
            onClick={handleDownloadAll}
            className="text-sm border rounded px-4 py-1 flex items-center gap-2 cursor-pointer"
          >
            <MdOutlineFileDownload className="w-4 h-4" />
            Download All
          </button>
        )}
      </div>

      {certificates.length === 0 ? (
        <p className="text-gray-500">No certificates generated yet.</p>
      ) : (
        <>
          {/* Table layout for md+ */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[600px]">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-2">Certificate Preview</th>
                  <th className="py-2">Course Name</th>
                  <th className="py-2">Level</th>
                  <th className="py-2">Date</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert, index) => (
                  <tr
                    key={index}
                    onClick={() => setSelected(cert)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="py-3">
                      <img
                        src={cert.certificate}
                        
                        alt="Certificate"
                        className="w-32 rounded object-cover"
                      />
                    </td>
                    <td className="py-3">{cert.title}</td>
                    <td className="py-3">{cert.level}</td>
                    <td className="py-3">
                      {cert.purchasedAt
                        ? new Date(cert.purchasedAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="py-3">
                      <button
                        onClick={(e) => handleSingleDownload(e, cert)}
                        className="border text-sm px-4 py-1 rounded flex items-center gap-1 cursor-pointer"
                      >
                        <MdOutlineFileDownload className="w-4 h-4" />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout for mobile */}
          <div className="md:hidden space-y-4">
            {certificates.map((cert, index) => (
              <div
                key={index}
                onClick={() => setSelected(cert)}
                className="border rounded-lg p-4 flex flex-col gap-2 shadow-sm cursor-pointer"
              >
                <img
                  src={cert.certificate}
                  alt="Certificate"
                  className="w-full rounded object-cover"
                />
                <div>
                  <p className="font-medium">{cert.title}</p>
                  <p className="text-xs text-gray-500">
                    {cert.level} —{" "}
                    {cert.purchasedAt
                      ? new Date(cert.purchasedAt).toLocaleDateString()
                      : "—"}
                  </p>
                </div>
                <button
                  onClick={(e) => handleSingleDownload(e, cert)}
                  className="mt-2 border text-sm px-4 py-1 rounded flex items-center gap-1 w-fit"
                >
                  <MdOutlineFileDownload className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal preview */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-200 z-50"
              onClick={() => setSelected(null)}
            >
              <X className="w-6 h-6 cursor-pointer" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-lg p-4 max-w-[90vw] max-h-[90vh] flex flex-col items-center"
            >
              <p className="font-semibold mb-2">{selected.title}</p>
              <img
                src={selected.certificate}
                alt="Certificate Preview"
                className="max-h-[70vh] w-auto rounded-lg mb-4"
              />
              <button
                onClick={(e) => handleSingleDownload(e, selected)}
                className="border text-sm px-4 py-1 rounded flex items-center gap-1"
              >
                <MdOutlineFileDownload className="w-4 h-4" />
                Download
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certificates;
