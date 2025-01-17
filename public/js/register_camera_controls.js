"use strict";

function removeInputFace() {
  document.getElementById("facesContainer").innerHTML = "";
  document.getElementById("facesContainer").style.display = "none";
}

function createCaptureCameraButton() {
  const btnCaptureCamera = document.createElement("a");
  const btnCaptureCameraIcon = document.createElement("i");
  const btnCaptureCameraClasses = [
    "waves-effect",
    "waves-light",
    "blue",
    "btn",
    "col",
    "m12",
    "s12",
  ];
  const btnCaptureCameraIconClasses = ["material-icons", "left"];
  btnCaptureCamera.classList.add(...btnCaptureCameraClasses);
  btnCaptureCameraIcon.classList.add(...btnCaptureCameraIconClasses);
  btnCaptureCamera.innerText = "Capturar rostro";
  btnCaptureCameraIcon.innerText = "camera_alt";
  btnCaptureCamera.append(btnCaptureCameraIcon);
  btnCaptureCamera.addEventListener("click", extractFaces);
  return btnCaptureCamera;
}

function createRemoveCapturedImageButton() {
  const btnRemoveCapturedImage = document.createElement("a");
  const btnRemoveCapturedImageIcon = document.createElement("i");
  const btnRemoveCapturedImageClasses = [
    "waves-effect",
    "waves-light",
    "red",
    "btn",
    "col",
    "m12",
    "s12",
  ];
  const btnRemoveCapturedImageIconClasses = ["material-icons", "left"];
  btnRemoveCapturedImage.classList.add(...btnRemoveCapturedImageClasses);
  btnRemoveCapturedImageIcon.classList.add(
    ...btnRemoveCapturedImageIconClasses
  );
  btnRemoveCapturedImage.innerText = "Borrar captura de rostro";
  btnRemoveCapturedImageIcon.innerText = "cancel";
  btnRemoveCapturedImage.append(btnRemoveCapturedImageIcon);
  btnRemoveCapturedImage.addEventListener("click", removeInputFace);
  return btnRemoveCapturedImage;
}

function initializeCameraControls() {
  const cameraControls = document.getElementById("cameraControls");
  cameraControls.append(createCaptureCameraButton());
  cameraControls.append(createRemoveCapturedImageButton());
  removeInputFace();
}
