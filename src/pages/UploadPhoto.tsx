import React, { useCallback, useState, useMemo } from "react";
import { Link } from "react-router-dom";

import PhotoPreview from "../components/PhotoPreview";
import PhotoUploader from "../components/PhotoUploader";
import {
  Requirement_State,
  Requirement
} from "../components/RequirementListItem";
import msFaceAPI from "../services/ms-face-api";
import Heading from "../components/Heading";
import Button from "../components/Button";
import Dialog from "../components/Dialog";

const UploadPhoto = () => {
  const [photo, setPhoto] = useState({ preview: undefined });
  const [, setResult] = useState({
    hasSingleFace: undefined,
    isInFocus: undefined
  });
  const [photoMeetsRequirements, setPhotoMeetsRequirements] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [checkingPhoto, setCheckingPhoto] = useState(false);

  const [requirementFaceState, setRequirementFaceState] = useState(
    Requirement_State.UNCHECKED
  );
  const [requirementFocusState, setRequirementFocusState] = useState(
    Requirement_State.UNCHECKED
  );

  const requirementsPhoto: Requirement[] = [
    {
      req: "One face in the photo",
      state: requirementFaceState
    },
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
      const doesPhotoMeetRequirements = (result: {
        hasSingleFace: any;
        isInFocus: any;
      }) =>
        Object.keys(result)
          .filter(key => key === "hasSingleFace" || key === "isInFocus")
          .reduce<any[]>(
            (acc, key) => [...acc, result[key as keyof typeof result]],
            []
          )
          .every(val => val);

      setCheckingPhoto(true);
      const { width, height } = dimensions;
      setPhoto(photo);
      msFaceAPI(photo.blob, { width, height }).then((newResult: any) => {
        setResult(newResult);
        updateRequirements(newResult);
        setPhotoMeetsRequirements(doesPhotoMeetRequirements(newResult));
        setCheckingPhoto(false);
      });
    },
    [setPhoto, updateRequirements, setPhotoMeetsRequirements]
  );

  const handleSubmitWithBadPhoto = () => {
    setIsDialogOpen(true);
  };

  const handleCancel = () => setIsDialogOpen(false);

  return (
    <>
      <Heading element="h1" className="tc mb3">
        Upload a photo of yourself
      </Heading>
      <PhotoPreview
        className="center cover"
        preview={photo.preview}
        requirements={requirementsPhoto}
        loading={checkingPhoto}
      />
      <div className="center w5 flex justify-betwen mt1">
        <Button element="button" className="mr1" variant="secondary">
          <PhotoUploader updateUploadedPhoto={updateUploadedPhoto}>
            Choose a photo
          </PhotoUploader>
        </Button>
        {photoMeetsRequirements ? (
          <Button
            element={Link}
            to="/done"
            disabled={!Boolean(photo.preview && !checkingPhoto)}
          >
            Submit
          </Button>
        ) : (
          <Button
            element="button"
            onClick={handleSubmitWithBadPhoto}
            disabled={!Boolean(photo.preview && !checkingPhoto)}
          >
            Submit
          </Button>
        )}
      </div>
      {isDialogOpen ? (
        <Dialog>
          <Heading element="h1" className="mb3">
            Are you sure?
          </Heading>
          <p className="mt0 mb2">Your photo does not meet all the criteria.</p>
          <p className="mt0">
            We might not be able to verify your identity and open your account.
          </p>
          <div className="flex">
            <Button element="button" onClick={handleCancel} className="mr1">
              Cancel
            </Button>
            <Button element={Link} to="/done" variant="secondary">
              I'll take my chances
            </Button>
          </div>
        </Dialog>
      ) : null}
    </>
  );
};

export default UploadPhoto;
