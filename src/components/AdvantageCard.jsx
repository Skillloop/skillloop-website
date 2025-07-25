import { motion } from 'framer-motion';
function AdvantageCard ({ title, description, color }) {

  return (
    <motion.div
      className="relative w-[280px] h-[420px] rounded-2xl overflow-hidden text-white"
    >
      <div 
        className="absolute inset-0 p-6 flex flex-col justify-center h-full w-full"
        style={{ backgroundColor: color }}
      >
        <h2 className="text-xl font-bold leading-tight mb-2">{title}</h2>
        <p className="text-sm leading-snug">{description}</p>
      </div>
    </motion.div>
  );
};

export default AdvantageCard;
