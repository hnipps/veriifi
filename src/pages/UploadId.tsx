import React, { useCallback, useState } from "react";

import PhotoPreview from "../components/PhotoPreview";
import PhotoUploader from "../components/PhotoUploader";
import { Requirement_State } from "../components/RequirementListItem";
import Link from "../components/Link";

const UploadId = () => {
  const [photo, setPhoto] = useState({ preview: undefined });

  const requirementsId = [
    { req: "Government-issued ID", state: Requirement_State.UNCHECKED },
    { req: "In focus", state: Requirement_State.UNCHECKED }
  ];

  const updateUploadedId = useCallback(
    (photo: any) => {
      setPhoto(photo);
    },
    [setPhoto]
  );

  return (
    <>
      <h1 className="tc">Upload your photo ID</h1>
      <PhotoPreview
        className="center contain"
        preview={photo.preview}
        requirements={requirementsId}
      />
      <div className="center w5 flex justify-betwen mt1">
        <button className="photo-uploader__button">
          <PhotoUploader updateUploadedPhoto={updateUploadedId}>
            Choose a photo
          </PhotoUploader>
        </button>
        <Link to="/photo" disabled={!Boolean(photo.preview)}>
          Submit
        </Link>
      </div>
    </>
  );
};

export default UploadId;
