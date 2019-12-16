import React from "react";

import RequirementListItem, { Requirement } from "./RequirementListItem";
import Heading from "../components/Heading";

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
          <Heading element="h2" className="mb2 mt3">Requirements</Heading>
          <ul className="list pl2 ma0">
            {requirements.map(({ req, state }, i) => (
              <RequirementListItem isSatisfied={state} key={`req-${i}`}>
                {req}
              </RequirementListItem>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
};

export default PhotoPreview;
