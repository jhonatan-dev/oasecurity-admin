"use strict";

let smallRostroDetectado = document.getElementById("smallRostroDetectado");

let rostroDectectado = false;

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
    "btn",
    "col",
    "m12",
    "s12",
  ];
  const btnCaptureCameraIconClasses = ["material-icons", "left"];
  btnCaptureCamera.classList.add(...btnCaptureCameraClasses);
  btnCaptureCameraIcon.classList.add(...btnCaptureCameraIconClasses);
  btnCaptureCamera.innerText = "Capturar imagen";
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
  btnRemoveCapturedImage.innerText = "Borrar captura";
  btnRemoveCapturedImageIcon.innerText = "cancel";
  btnRemoveCapturedImage.append(btnRemoveCapturedImageIcon);
  btnRemoveCapturedImage.addEventListener("click", removeInputFace);
  return btnRemoveCapturedImage;
}

function controlarDetecciones(result) {
  //console.log("resultado: ", result.expressions)
  const gestos = ["angry", "disgusted", "fearful", "happy", "neutral", "sad", "surprised"];
  rostroDectectado = result ? true : false;
  if (rostroDectectado) {
    smallRostroDetectado.innerText = "SI";
  } else {
    smallRostroDetectado.innerText = "NO";
  }
}

function initializeCameraControls() {
  const cameraControls = document.getElementById("cameraControls");
  cameraControls.append(createCaptureCameraButton());
  cameraControls.append(createRemoveCapturedImageButton());
  removeInputFace();
}
