import React from "react";

const Modal = ({ children, openModal, onClose }) => {
  return (
    <div
        onClick={onClose}
      className={`fixed inset-0  bg-black   w-full h-dvh transition duration-300 ${
        openModal ? "visible opacity-80" : "opacity-0 invisible"
      }`}
    >
      <div className="w-full h-full flex items-center justify-center ">{children}</div>
    </div>
  );
};

export default Modal;
