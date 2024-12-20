import Modal from "./Modal";

export default function TopSideModal({ children, className }) {
  return (
    <Modal
      animation={{
        hidden: { y: 0, opacity: 0, scale: 0.6 },
        visible: { y: 20, opacity: 1, scale: 1 },
      }}
      className={"rounded-lg " + className}
    >
      <div class="max-w-md">
        <div
          class={`w-full flex flex-row items-center px-4 py-2 space-x-4 rtl:space-x-reverse `}
        >
          {children}
        </div>
      </div>
    </Modal>
  );
}
