import React from "react";

import "./PhotoPreview.css";
import LoadingSpinner from "./LoadingSpinner";

interface PhotoPreviewProps extends React.HTMLAttributes<HTMLElement> {
  preview?: string;
  loading?: boolean;
}

const PhotoPreview = ({
  preview,
  loading,
  className,
  ...props
}: PhotoPreviewProps) => {
  const style = preview ? { backgroundImage: `url(${preview})` } : {};
  return (
    <div
      className={className + " preview bg-center h5 w5 ba br2 bw0 relative"}
      style={style}
      {...props}
    >
      {loading ? (
        <div className="br2 absolute w-100 h-100 bg-black-30 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : null}
    </div>
  );
};

export default PhotoPreview;
