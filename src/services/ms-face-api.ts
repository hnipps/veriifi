import { createService } from "./create-service";

/**
 * Makes the request to the Face API and returns the JSON response.
 * The `API_KEY` and `API_URL` changed depending on which subscription account you use.
 * @link https://bit.ly/2v1Jt7a
 * @param {Blob} photoBlob - A Blob for photo to be analyzed by Face API.
 * @param {Object} photoDimensions - A `{ width, height }` object with the dimensions of the supplied photo.
 * @returns {Object} Combined `photoDimensions` plus JSON array for face(s) detected in supplied photo.
 */
export const request = (
  photoBlob: Blob,
  photoDimensions: { height: number; width: number }
) => {
  const API_KEY = "82a9f2457404453a82958bc2c1801290";
  const API_URL =
    "https://rangleio.cognitiveservices.azure.com/face/v1.0/detect";
  const API_PARAMS = {
    returnFaceId: "false",
    returnFaceLandmarks: "false",
    returnRecognitionModel: "false",
    returnFaceAttributes: "accessories,blur,exposure,glasses,noise,occlusion",
    detectionModel: "detection_01",
    recognitionModel: "recognition_02"
  };

  // Assemble the URL and query string params
  const reqParams = Object.keys(API_PARAMS)
    .map(key => `${key}=${API_PARAMS[key as keyof typeof API_PARAMS]}`)
    .join("&");
  const reqURL = `${API_URL}?${reqParams}`;

  // Fetch via POST with required headers; body is the photo itself
  return fetch(reqURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": API_KEY
    },
    body: photoBlob
  }).then(response =>
    response.json().then(json => ({ json, photoDimensions }))
  );
};

/**
 * Transforms the raw JSON response received from Face API.
 * Given an array of detected faces, we simplify this into a series of yes/no requirements.
 * These requirements can then be used to render feedback and tips in a component.
 * Actual uploading of a photo would also be disabled unless all these requirements are met.
 * @param {Object} response - A `{json, photoDimenions }` object, where `json` is an array of "faces" that the API found.
 * @returns {Object} An object containing flags/requirements about the face to validate.
 */
export const transform = (response: {
  json: any;
  photoDimensions: { height: number; width: number };
}) => {
  const { json, photoDimensions } = response;

  // Detected face must be at least 50% as wide (and tall) as the photo
  // This threshold is not very robust at all!
  const MIN_FACE_TO_PHOTO_RATIO = 0.5;

  // Initial return object
  let requirements = {
    score: 0,
    errorMessage: null,
    hasSingleFace: false,
    isInFocus: false,
    isCorrectBrightness: false,
    isVisibleFace: false,
    isCorrectlyComposed: false
  };

  // Capture error returned from API and abort
  if (!Array.isArray(json)) {
    return Object.assign({}, requirements, {
      errorMessage: json.error.message
    });
  }

  // If exactly 1 face is detected, we can evaluate its attributes in detail
  if ((requirements.hasSingleFace = json.length === 1)) {
    const { width: photoWidth, height: photoHeight } = photoDimensions;
    const {
      faceRectangle: { width: faceWidth, height: faceHeight },
      faceAttributes: {
        blur: { blurLevel },
        noise: { noiseLevel },
        exposure: { exposureLevel },
        glasses,
        occlusion,
        accessories
      }
    } = json[0];

    // All conditions must be true to consider a face "visible"
    // Put in array to make the subsquent assignment less verbose
    const visibleChecks = [
      glasses === "NoGlasses",
      Object.values(occlusion).every(v => v === false),
      accessories.length === 0
    ];

    requirements.isInFocus =
      blurLevel.toLowerCase() === "low" && noiseLevel.toLowerCase() === "low";
    requirements.isCorrectBrightness =
      exposureLevel.toLowerCase() === "goodexposure" ||
      exposureLevel.toLowerCase() === "overexposure";
    requirements.isVisibleFace = visibleChecks.every(v => v === true);
    requirements.isCorrectlyComposed =
      faceWidth / photoWidth >= MIN_FACE_TO_PHOTO_RATIO &&
      faceHeight / photoHeight >= MIN_FACE_TO_PHOTO_RATIO;
  }

  // Use results to compute a "score" between 0 and 1
  // Zero means no requirements are met; 1 means ALL requirements are met (perfect score)
  // We actively ignore `errorMessage`, `score` in calculation because they're never boolean
  const values = Object.values(requirements);
  requirements.score =
    values.filter(e => e === true).length / (values.length - 2);

  return requirements;
};

/**
 * Function to request face detection from Azure's Face API for a specified photo.
 * Results will be a "laundy list" of requirements, each one indicating if it's been satisfied or not.
 * @param {Blob} photoBlob - A Blob for photo to be analyzed by Face API.
 * @returns {Promise} Can be resolved/rejected or continued with more `then()` methods that act on the resuting analysis.
 *
 * @example
 * import msFaceAPI from './services/msFaceAPI';
 * msFaceAPI(myPhotoBlob).then(requirements => { ... });
 */
const msFaceAPI = createService(request, transform);
export default msFaceAPI;
