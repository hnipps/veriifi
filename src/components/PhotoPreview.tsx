import React from "react";
import "./PhotoPreview.css";

const PhotoPreview = ({
  preview,
  onClick
}: {
  preview?: string;
  onClick?: () => void;
}) => {
  const style = preview ? { backgroundImage: `url(${preview})` } : {};
  return <div className="preview" style={style} onClick={onClick} />;
};

export default PhotoPreview;
