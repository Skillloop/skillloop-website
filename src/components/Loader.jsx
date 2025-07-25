import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] text-center">
      <motion.div
        className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      ></motion.div>
      <div className="mt-4 text-gray-600 font-medium">Loading, please wait...</div>
    </div>
  );
}
