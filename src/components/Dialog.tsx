import React from "react";

interface DialogProps {
  children: React.ReactNode;
}

const Dialog = ({ children }: DialogProps) => {
  return (
    <dialog className="absolute left-0 right-0 center bg-white pa3 ba bw2 mw6 flex flex-column justify-center top-50" open={true}>
      {children}
    </dialog>
  );
};

export default Dialog;
