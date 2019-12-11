import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import PhotoUploader from "./components/PhotoUploader";
import msFaceAPI from "./services/ms-face-api";
import PhotoPreview from "./components/PhotoPreview";

const App: React.FC = () => {
  const [result, setResult] = useState();
  const [photo, setPhoto] = useState({ preview: undefined });

  const updateUploadedPhoto = (
    photo: any,
    dimensions: { height: number; width: number }
  ) => {
    const { width, height } = dimensions;
    setPhoto(photo);
    msFaceAPI(photo.blob, { width, height }).then((result: any) => {
      setResult(result);
      console.log(result);
    });
  };

  return (
    <>
      <PhotoPreview preview={photo.preview} />
      <button>
        <PhotoUploader updateUploadedPhoto={updateUploadedPhoto}>
          Upload a photo
        </PhotoUploader>
      </button>
      <button>Submit</button>
    </>
  );
};

export default App;
