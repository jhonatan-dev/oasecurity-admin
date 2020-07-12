"use strict";

let controlesMostrados = false;

function mostradoControles() {
  return controlesMostrados;
}

function mostrarControles(valor = true) {
  controlesMostrados = valor;
}

function removeAnalysisButton() {
  const btnAnalysisButton = document.getElementById("btnAnalysisButton");
  if (btnAnalysisButton) {
    btnAnalysisButton.remove();
  }
}

function enviarAzure() {
  const btnAnalysisButton = document.getElementById("btnAnalysisButton");
  btnAnalysisButton.disabled = true;
  const facesContainer = document.getElementById("facesContainer");
  if (facesContainer.hasChildNodes()) {
    const canvas = facesContainer.firstElementChild;
    new Promise((resolve) => canvas.toBlob(resolve, "image/png")).then(
      function (blob) {
        let formData = new FormData();
        formData.append("face_id_2", blob, "face_id_2.png");
        fetch(`/login/facial`, {
          method: "POST",
          body: formData,
        })
          .then((respuesta) => {
            if (respuesta.status === 200) {
              window.location.href = "/";
            } else if (respuesta.status === 401) {
              $("#modalFacial").modal();
              $("#modalFacial").modal("open");
            } else {
              window.location.reload();
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          })
          .finally(() => {
            btnAnalysisButton.disabled = false;
          });
      }
    );
  }
}

function removeInputFace() {
  document.getElementById("facesContainer").innerHTML = "";
  document.getElementById("facesContainer").style.display = "none";
  removeAnalysisButton();
}

function createAnalysisButton() {
  const btnAnalysisButton = document.createElement("button");
  btnAnalysisButton.id = "btnAnalysisButton";
  const btnAnalysisButtonIcon = document.createElement("i");
  const btnAnalysisButtonClasses = [
    "waves-effect",
    "waves-light",
    "btn",
    "col",
    "m12",
    "s12",
  ];
  const btnAnalysisButtonIconClasses = ["material-icons", "left"];
  btnAnalysisButton.classList.add(...btnAnalysisButtonClasses);
  btnAnalysisButtonIcon.classList.add(...btnAnalysisButtonIconClasses);
  btnAnalysisButton.innerText = "Iniciar Sesión";
  btnAnalysisButtonIcon.innerText = "fingerprint";
  btnAnalysisButton.append(btnAnalysisButtonIcon);
  btnAnalysisButton.style.marginTop = "4px";
  btnAnalysisButton.addEventListener("click", enviarAzure);
  return btnAnalysisButton;
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
