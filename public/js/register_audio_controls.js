"use strict";

const recordingContainer = document.getElementById("recordingContainer");
let currentAudioBlob = null;

function setAudioSecondsHtml(recordingTime) {
  smallSeconds.innerText =
    Number(recordingTime) > 9 ? `${recordingTime}` : `0${recordingTime}`;
}

function createAudioElement(srcUrl) {
  const audioElement = document.createElement("audio");
  audioElement.controls = true;
  audioElement.src = srcUrl;
  return audioElement;
}

function resetRecordingContainer() {
  if (recordingContainer.hasChildNodes()) {
    recordingContainer.style.display = "none";
    recordingContainer.innerHTML = "";
  }
}

function appendAudioElement(blob) {
  const url = UrlInterface.createObjectURL(blob);
  recordingContainer.style.display = "block";
  recordingContainer.append(createAudioElement(url));
  currentAudioBlob = blob;
}

function createStartRecordingButton() {
  const btnStartRecording = document.createElement("button");
  btnStartRecording.id = "buttonStartRecording";
  const btnStartRecordingIcon = document.createElement("i");
  const btnStartRecordingClasses = [
    "waves-effect",
    "waves-light",
    "light-blue",
    "btn",
    "col",
    "m12",
    "s12",
  ];
  const btnStartRecordingIconClasses = ["material-icons", "left"];
  btnStartRecording.classList.add(...btnStartRecordingClasses);
  btnStartRecordingIcon.classList.add(...btnStartRecordingIconClasses);
  btnStartRecording.innerText = "Iniciar grabación";
  btnStartRecordingIcon.innerText = "play_arrow";
  btnStartRecording.append(btnStartRecordingIcon);
  btnStartRecording.addEventListener("click", startRecording);
  return btnStartRecording;
}
