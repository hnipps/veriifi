import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import PhotoPreview from "../components/PhotoPreview";
import PhotoUploader from "../components/PhotoUploader";
import RequirementListItem, {
  Requirement_State,
  Requirement
} from "../components/RequirementListItem";
import Heading from "../components/Heading";
import Button from "../components/Button";

const UploadId = () => {
  const [photo, setPhoto] = useState({ preview: undefined });

  const requirementsId: Requirement[] = [
    {
      req: "Government-issued ID",
      state: Requirement_State.UNCHECKED
    },
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
      <Heading element="h1" className="tc mb3">
        Upload your photo ID
      </Heading>
      <div className="flex justify-center flex-column flex-row-ns">
        <div className="dib v-top">
          <PhotoPreview
            className="center contain"
            preview={photo.preview}
            // requirements={requirementsId}
          />
          <div className="center w5 flex justify-betwen mt1">
            <Button element="button" className="mr1" variant="secondary">
              <PhotoUploader updateUploadedPhoto={updateUploadedId}>
                Choose a photo
              </PhotoUploader>
            </Button>
            <Button
              element={Link}
              to="/photo"
              disabled={!Boolean(photo.preview)}
            >
              Submit
            </Button>
          </div>
        </div>
        <aside className="dib v-top pl3 w5">
          <Heading element="h2" className="mb2 mt3">
            Requirements
          </Heading>
          <ul className="list pl2 ma0">
            {requirementsId.map(({ req, state }, i) => (
              <RequirementListItem isSatisfied={state} key={`req-${i}`}>
                {req}
              </RequirementListItem>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
};

export default UploadId;
