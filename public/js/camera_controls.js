"use strict";

function removeInputFace() {
    document.getElementById("foto_rostro").src = "";
    document.getElementById("divfotoRostro").style.display = "none";
}

function setInputFace(urlImage) {
    document.getElementById("foto_rostro").src = urlImage;
    document.getElementById("divfotoRostro").style.display = "block";
}

function createCaptureCameraButton() {
    const btnCaptureCamera = document.createElement("a");
    const btnCaptureCameraIcon = document.createElement("i");
    const btnCaptureCameraClasses = ["waves-effect", "waves-light", "btn-small"];
    const btnCaptureCameraIconClasses = ["material-icons", "left"];
    btnCaptureCamera.classList.add(...btnCaptureCameraClasses);
    btnCaptureCameraIcon.classList.add(...btnCaptureCameraIconClasses);
    btnCaptureCamera.innerText = "Capturar"
    btnCaptureCameraIcon.innerText = "camera_alt"
    btnCaptureCamera.append(btnCaptureCameraIcon)
    btnCaptureCamera.addEventListener("click", extractFaces);
    return btnCaptureCamera;
}

function createRemoveCapturedImageButton() {
    const btnRemoveCapturedImage = document.createElement("a");
    const btnRemoveCapturedImageIcon = document.createElement("i");
    const btnRemoveCapturedImageClasses = ["waves-effect", "waves-light", "red", "btn-small"];
    const btnRemoveCapturedImageIconClasses = ["material-icons", "left"];
    btnRemoveCapturedImage.classList.add(...btnRemoveCapturedImageClasses);
    btnRemoveCapturedImageIcon.classList.add(...btnRemoveCapturedImageIconClasses);
    btnRemoveCapturedImage.innerText = "Eliminar"
    btnRemoveCapturedImageIcon.innerText = "cancel"
    btnRemoveCapturedImage.append(btnRemoveCapturedImageIcon)
    btnRemoveCapturedImage.addEventListener("click", removeInputFace);
    return btnRemoveCapturedImage;
}

function initializeCameraControls() {
    const cameraControls = document.getElementById("cameraControls");
    cameraControls.append(createCaptureCameraButton());
    cameraControls.append(createRemoveCapturedImageButton());
    removeInputFace();
}