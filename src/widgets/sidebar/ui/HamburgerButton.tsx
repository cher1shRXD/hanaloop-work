import { motion } from "framer-motion";
import { transition } from "../constants/transition";

const HamburgerButton = ({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-10 h-10 flex items-center justify-center self-end cursor-pointer hover:bg-surface transition-colors rounded-xl"
  >
    <div className="w-5 h-3.5 flex flex-col justify-between">
      <motion.span
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={transition}
        className="block h-0.5 w-full bg-current rounded-full"
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={transition}
        className="block h-0.5 w-full bg-current rounded-full"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={transition}
        className="block h-0.5 w-full bg-current rounded-full"
      />
    </div>
  </button>
);

export default HamburgerButton