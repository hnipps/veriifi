import React from "react";

interface DialogProps {
  children: React.ReactNode;
}

const Dialog = ({ children }: DialogProps) => {
  return (
    <dialog className="mw6 flex flex-column justify-center top-50" open={true}>
      {children}
    </dialog>
  );
};

export default Dialog;
