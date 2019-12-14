import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import PhotoPreview from "../components/PhotoPreview";
import PhotoUploader from "../components/PhotoUploader";
import { Requirement_State } from "../components/RequirementListItem";
import Heading from "../components/Heading";
import Button from "../components/Button";

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
      <Heading element="h1" className="tc">
        Upload your photo ID
      </Heading>
      <PhotoPreview
        className="center contain"
        preview={photo.preview}
        requirements={requirementsId}
      />
      <div className="center w5 flex justify-betwen mt1">
        <Button element="button" className="mr1" variant="secondary">
          <PhotoUploader updateUploadedPhoto={updateUploadedId}>
            Choose a photo
          </PhotoUploader>
        </Button>
        <Button element={Link} to="/photo" disabled={!Boolean(photo.preview)}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default UploadId;
