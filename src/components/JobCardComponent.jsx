import { MapPin, Clock, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JobCardComponent({ job }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-4xl shadow-lg w-full max-w-sm"
    >
    <div className="relative">
      <img
        src={job.image}
        alt="Job Image"
        className="w-full h-40 object-cover rounded-4xl"
      />
      <img
        src={job.image}
        alt="Job Image"
        className="absolute w-16 h-16 object-cover rounded-lg bottom-0 right-0 transform -translate-x-1/2 translate-y-1/2 shadow-lg"
      />
    </div>
    <div className="px-4 py-6 mt-6 flex flex-col gap-6">
      <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
      <div className="text-sm flex justify-between items-center gap-1 mb-1">
        <div className="flex items-center gap-1 font-semibold">
            <MapPin className="w-4 h-4" />
            {job.location}
        </div>
        {job.type}
      </div>
      <div className="text-sm text-gray-500 flex items-center gap-1 mb-1">
        {job.date} by
      </div>
      <p className="text-sm -mt-5 mb-4">{job.by}</p>
    </div>
    </motion.div>
  );
}