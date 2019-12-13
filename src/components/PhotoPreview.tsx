import React from "react";

import RequirementList, { Requirement } from "./RequirementListItem";

import "./PhotoPreview.css";

interface PhotoPreviewProps extends React.HTMLAttributes<HTMLElement> {
  preview?: string;
  requirements?: Requirement[];
}

const PhotoPreview = ({
  preview,
  requirements,
  className,
  ...props
}: PhotoPreviewProps) => {
  const style = preview ? { backgroundImage: `url(${preview})` } : {};
  return (
    <div
      className={className + " preview bg-center h5 w5 ba br2 bw0"}
      style={style}
      {...props}
    >
      {requirements && (
        <aside className="photo-preview__requirements ml3 w5">
          <h2>Requirements</h2>
          <ul>
            {requirements.map(({ req, state }, i) => (
              <RequirementList isSatisfied={state} key={`req-${i}`}>
                {req}
              </RequirementList>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
};

export default PhotoPreview;
