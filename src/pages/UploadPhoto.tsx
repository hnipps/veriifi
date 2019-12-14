import React, { useCallback, useState, useMemo } from "react";
import { Link } from "react-router-dom";

import PhotoPreview from "../components/PhotoPreview";
import PhotoUploader from "../components/PhotoUploader";
import { Requirement_State } from "../components/RequirementListItem";
import msFaceAPI from "../services/ms-face-api";
import Heading from "../components/Heading";
import Button from "../components/Button";

const UploadPhoto = () => {
  const [photo, setPhoto] = useState({ preview: undefined });
  const [result, setResult] = useState();

  const [requirementFaceState, setRequirementFaceState] = useState(
    Requirement_State.UNCHECKED
  );
  const [requirementFocusState, setRequirementFocusState] = useState(
    Requirement_State.UNCHECKED
  );

  const requirementsPhoto = [
    { req: "One face in the photo", state: requirementFaceState },
    { req: "In focus", state: requirementFocusState }
  ];

  const updateRequirements = useMemo(
    () => ({ hasSingleFace, isInFocus }: any) => {
      setRequirementFaceState(
        hasSingleFace
          ? Requirement_State.SATISFIED
          : Requirement_State.NOT_SATISFIED
      );
      setRequirementFocusState(
        isInFocus
          ? Requirement_State.SATISFIED
          : Requirement_State.NOT_SATISFIED
      );
    },
    [setRequirementFaceState, setRequirementFocusState]
  );

  const updateUploadedPhoto = useCallback(
    (photo: any, dimensions: { height: number; width: number }) => {
      const { width, height } = dimensions;
      setPhoto(photo);
      msFaceAPI(photo.blob, { width, height }).then((newResult: any) => {
        setResult(newResult);
        updateRequirements(newResult);
        console.log(newResult);
      });
    },
    [setPhoto, updateRequirements]
  );

  console.log(photo);

  return (
    <>
      <Heading element="h1" className="tc">
        Upload a photo of yourself
      </Heading>
      <PhotoPreview
        className="center cover"
        preview={photo.preview}
        requirements={requirementsPhoto}
      />
      <div className="center w5 flex justify-betwen mt1">
        <Button element="button" className="mr1" variant="secondary">
          <PhotoUploader updateUploadedPhoto={updateUploadedPhoto}>
            Choose a photo
          </PhotoUploader>
        </Button>
        <Button element={Link} to="/done" disabled={!Boolean(photo.preview)}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default UploadPhoto;
