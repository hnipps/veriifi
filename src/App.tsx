import React, { useState, useCallback, useMemo } from "react";
import "./App.css";
import PhotoUploader from "./components/PhotoUploader";
import msFaceAPI from "./services/ms-face-api";
import PhotoPreview from "./components/PhotoPreview";
import { Requirement_State } from "./components/RequirementListItem";

const App: React.FC = () => {
  const [result, setResult] = useState();
  const [photo, setPhoto] = useState({ preview: undefined });
  // const [requirements, setRequirements] = useState([
  //   { req: "One face in the photo", state: Requirement_State.UNCHECKED },
  //   { req: "In focus", state: Requirement_State.UNCHECKED }
  // ]);

  const [requirementFaceState, setRequirementFaceState] = useState(
    Requirement_State.UNCHECKED
  );
  const [requirementFocusState, setRequirementFocusState] = useState(
    Requirement_State.UNCHECKED
  );

  const requirements = [
    { req: "One face in the photo", state: requirementFaceState },
    { req: "In focus", state: requirementFocusState }
  ];

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
    [msFaceAPI, setPhoto]
  );

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

  return (
    <main className="mt4 mw7 center">
      <PhotoPreview
        className="center"
        preview={photo.preview}
        requirements={requirements}
      />
      <div className="center w5 flex justify-betwen mt1">
        <button className="photo-uploader__button">
          <PhotoUploader updateUploadedPhoto={updateUploadedPhoto}>
            Choose a photo
          </PhotoUploader>
        </button>
        <button
          className="photo-uploader__button"
          disabled={!Boolean(photo.preview)}
        >
          Submit
        </button>
      </div>
      <p>{JSON.stringify(result)}</p>
      <p>{JSON.stringify(requirements)}</p>
    </main>
  );
};

export default App;
