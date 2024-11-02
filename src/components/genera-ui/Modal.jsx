import { createPortal } from "react-dom";
import { motion } from "framer-motion";
export default function Modal({ children, onClose, animation, style }) {
  return createPortal(
    <>
      {/* <div
        class="absolute w-full h-screen bg-slate-300 opacity-30 top-0 left-0 z-10"
        onClick={onClose}
      ></div> */}

      <motion.dialog
        // variants={animation}
        variants={animation}
        initial="hidden"
        animate="visible"
        exit="hidden"
        class="rounded-lg"
        onClose={onClose}
        open
      >
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}
