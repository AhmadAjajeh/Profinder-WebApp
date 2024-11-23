import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
export default function Modal({
  children,
  onClose,
  animation,
  className,
  bgDiv,
  lockScroll,
}) {
  useEffect(() => {
    if (lockScroll) document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Add event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <>
      {bgDiv && (
        <div
          onClick={onClose}
          className="fixed z-30 right-0 w-full h-full bg-black opacity-70 dark:opacity-50"
        ></div>
      )}
      <motion.dialog
        // variants={animation}
        variants={animation}
        initial="hidden"
        animate="visible"
        exit="hidden"
        class={"fixed z-30 " + className}
        onClose={onClose}
        open
      >
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}
