"use strict";

const SSD_MOBILENETV1 = "ssd_mobilenetv1";
const TINY_FACE_DETECTOR = "tiny_face_detector";

let selectedFaceDetector = TINY_FACE_DETECTOR;

// ssd_mobilenetv1 options
let minConfidence = 0.5;

// tiny_face_detector options
let inputSize = 320; //128, 160, 224, 320, 416, 512, 608
let scoreThreshold = 0.5;

function getFaceDetectorOptions() {
  return selectedFaceDetector === SSD_MOBILENETV1
    ? new faceapi.SsdMobilenetv1Options({ minConfidence })
    : new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold });
}

function getCurrentFaceDetectionNet() {
  if (selectedFaceDetector === SSD_MOBILENETV1) {
    return faceapi.nets.ssdMobilenetv1;
  } else if (selectedFaceDetector === TINY_FACE_DETECTOR) {
    return faceapi.nets.tinyFaceDetector;
  } else {
    throw new Error("Error on function getCurrentFaceDetectionNet!");
  }
}

function isFaceDetectionModelLoaded() {
  return !!getCurrentFaceDetectionNet().params;
}

function getImageElementFromVideoElement(videoElement) {
  const canvas = document.createElement("canvas");
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  canvas
    .getContext("2d")
    .drawImage(
      videoElement,
      0,
      0,
      videoElement.videoWidth,
      videoElement.videoHeight
    );
  const image = document.createElement("img");
  image.src = canvas.toDataURL();
  return image;
}

function showExtractedFaceImages(faceImages) {
  const facesContainer = document.getElementById("facesContainer");
  facesContainer.innerHTML = "";
  faceImages.forEach((element) => {
    facesContainer.append(element);
  });
  facesContainer.style.display = "block";
}

async function extractFaces() {
  const videoEl = document.getElementById("inputVideo");
  if (videoEl.paused || videoEl.ended || !isFaceDetectionModelLoaded()) {
    return;
  }
  const inputImage = getImageElementFromVideoElement(videoEl);
  const detections = await faceapi.detectAllFaces(
    inputImage,
    getFaceDetectorOptions()
  );
  if (detections.length > 0) {
    const faceImages = await faceapi.extractFaces(inputImage, detections);
    showExtractedFaceImages(faceImages);
  }
}

async function onPlay() {
  const videoEl = document.getElementById("inputVideo");
  if (videoEl.paused || videoEl.ended || !isFaceDetectionModelLoaded())
    return setTimeout(() => onPlay());

  const result = await faceapi.detectSingleFace(
    videoEl,
    getFaceDetectorOptions()
  );

  const canvas = document.getElementById("overlay");

  if (result) {
    const dims = faceapi.matchDimensions(canvas, videoEl, true);
    faceapi.draw.drawDetections(canvas, faceapi.resizeResults(result, dims));
  } else {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  }

  setTimeout(() => onPlay());
}

function changeInputSize(size) {
  inputSize = parseInt(size);
}

async function changeFaceDetector(detector) {
  selectedFaceDetector = detector;
  document.getElementById("loader").style.display = "block";
  if (!isFaceDetectionModelLoaded()) {
    await getCurrentFaceDetectionNet().loadFromUri("/assets/face_nets");
  }
  document.getElementById("loader").style.display = "none";
}

async function run() {
  // load face detection model
  await changeFaceDetector(TINY_FACE_DETECTOR);
  changeInputSize(320);

  // try to access users webcam and stream the images to the video element
  const videoEl = document.getElementById("inputVideo");
  const stream = await getMediaStreamFromUser();
  setVideoMediaStream(videoEl, stream);
  initializeCameraControls();
}
