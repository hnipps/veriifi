import React, { useCallback, useState, useMemo } from "react";
import PhotoPreview from "../components/PhotoPreview";
import PhotoUploader from "../components/PhotoUploader";
import { Requirement_State } from "../components/RequirementListItem";
import Link from "../components/Link";
import msFaceAPI from "../services/ms-face-api";

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
      <h1 className="tc">Upload a photo of yourself</h1>
      <PhotoPreview
        className="center cover"
        preview={photo.preview}
        requirements={requirementsPhoto}
      />
      <div className="center w5 flex justify-betwen mt1">
        <button className="photo-uploader__button">
          <PhotoUploader updateUploadedPhoto={updateUploadedPhoto}>
            Choose a photo
          </PhotoUploader>
        </button>
        <Link to="/done" disabled={!Boolean(photo.preview)}>
          Submit
        </Link>
      </div>
    </>
  );
};

export default UploadPhoto;
