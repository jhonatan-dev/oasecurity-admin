let divSendAudio = document.getElementById("divSendAudio");
let smallSeconds = document.getElementById("smallSeconds");

function enviarAzure(blob) {
  const btnAnalysisButton = document.getElementById("btnAnalysisButton");
  btnAnalysisButton.disabled = true;
  let formData = new FormData();
  formData.append("audio_data", blob, `${new Date().toISOString()}.wav`);
  fetch(`/login/voz`, {
    method: "POST",
    body: formData,
  })
    .then((respuesta) => {
      if (respuesta.status === 200) {
        window.location.href = "/";
      } else if (respuesta.status === 401) {
        $("#modalVoz").modal();
        $("#modalVoz").modal("open");
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

function createRecordButton() {
  const btnRecordButton = document.createElement("a");
  btnRecordButton.id = "btnRecordButton";
  const btnRecordButtonIcon = document.createElement("i");
  const btnRecordButtonClasses = [
    "waves-effect",
    "waves-light",
    "btn",
    "blue",
    "col",
    "m12",
    "s12",
  ];
  const btnRecordButtonIconClasses = ["material-icons", "left"];
  btnRecordButton.classList.add(...btnRecordButtonClasses);
  btnRecordButtonIcon.classList.add(...btnRecordButtonIconClasses);
  btnRecordButton.innerText = "Empezar grabar";
  btnRecordButtonIcon.innerText = "record_voice_over";
  btnRecordButton.append(btnRecordButtonIcon);
  btnRecordButton.addEventListener("click", startRecording);
  return btnRecordButton;
}

function createAnalysisButton() {
  const btnAnalysisButton = document.createElement("a");
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
  btnAnalysisButton.addEventListener("click", exportRecording);
  return btnAnalysisButton;
}

function removeAnalysisButton() {
  let analysisButton = document.getElementById("btnAnalysisButton");
  if (analysisButton) {
    analysisButton.remove();
  }
}

function setAudioSecondsHtml(recordingTime) {
  smallSeconds.innerText =
    Number(recordingTime) > 9 ? `${recordingTime}` : `0${recordingTime}`;
}

function insertAnalysisButton() {
  divSendAudio.append(createAnalysisButton());
}

function initializeAudioControl(recordingTime) {
  setAudioSecondsHtml(recordingTime);
  divSendAudio.append(createRecordButton());
}
