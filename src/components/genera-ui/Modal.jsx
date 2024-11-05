import { createPortal } from "react-dom";
import { motion } from "framer-motion";
export default function Modal({
  children,
  onClose,
  animation,
  className,
  bgDiv,
}) {
  return createPortal(
    <>
      {bgDiv && (
        <div
          onClick={onClose}
          className="absolute z-30 w-full h-full bg-black opacity-70 dark:opacity-50"
        ></div>
      )}
      <motion.dialog
        // variants={animation}
        variants={animation}
        initial="hidden"
        animate="visible"
        exit="hidden"
        class={"z-30 " + className}
        onClose={onClose}
        open
      >
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}
