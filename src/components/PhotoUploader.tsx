import React from "react";

import ReactDropzone from "react-dropzone";

const PhotoUploader = ({
  updateUploadedPhoto,
  children
}: {
  updateUploadedPhoto: (
    photo: any,
    dimensions: { height: number; width: number }
  ) => void;
  children?: React.ReactNode;
}) => {
  /**
   * Runs when files are dropped onto the uploader or selected from a browser dialog.
   * Should only ever be a single JPG/PNG file, according to our uploader setup (see `<ReactDropzone>` props).
   * Establishes the photo blob, preview, and dimensions to pass back to the app & Face API.
   * Note the `.preview` property used to be part of the `File` that `react-dropzone` returns but that no longer works which is why `URL.createObjectURL()` is used.
   * @param {File[]} uploadedPhotos - An array of files chosen via the uploader. Should only have length of 1!
   */
  const onDrop = (uploadedPhotos: any[]) => {
    if (uploadedPhotos.length === 1) {
      window.URL = window.URL || window.webkitURL;
      const photo = uploadedPhotos[0];

      photo.blob = new Blob([photo], { type: photo.type });
      photo.preview = URL.createObjectURL(photo.blob);

      // Standard JS Image object will have dimensions once `src` has loaded
      // Don't call parent component's method until dimensions are acquired
      var tempPhoto = new Image();
      tempPhoto.src = photo.preview;
      tempPhoto.addEventListener("load", function() {
        const { width, height } = this;
        updateUploadedPhoto(photo, { width, height });
      });
    }
  };

  return (
    <ReactDropzone
      onDrop={onDrop}
      accept="image/jpeg, image/png"
      multiple={false}
      maxSize={6000000}
      noDrag
    >
      {({ getRootProps, getInputProps }) => (
        <div className="photo-uploader" {...getRootProps()}>
          <input {...getInputProps()} />
          <span>{children}</span>
        </div>
      )}
    </ReactDropzone>
  );
};

export default PhotoUploader;
