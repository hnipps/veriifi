import React from "react";

interface DialogProps {
  children: React.ReactNode;
}

const Dialog = ({ children }: DialogProps) => {
  return (
    <>
      <dialog
        className="absolute z-2 left-0 right-0 center bg-white pa3 ba bw2 mw6 flex flex-column justify-center top-50"
        open={true}
      >
        {children}
      </dialog>
      <div className="fixed top-0 right-0 left-0 bottom-0 bg-black-40" />
    </>
  );
};

export default Dialog;
