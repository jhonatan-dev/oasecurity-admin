"use strict";

let gumStream;
let rec;
let input;
let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext;
const secondsOfAudio = 5;

async function getMediaStreamFromUser() {
  try {
    return await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
  } catch (error) {
    throw new Error("Error on getMediaStreamFromUser: ", error);
  }
}

async function startRecording() {

  removeAnalysisButton();
  disableRecordButton(true);

  const stream = await getMediaStreamFromUser();
  audioContext = new AudioContext({
    latencyHint: "interactive",
    sampleRate: 16000,
  });
  gumStream = stream;
  input = audioContext.createMediaStreamSource(stream);
  rec = new Recorder(input, { numChannels: 1 });
  rec.record();

  let recordingTime = secondsOfAudio;
  const intervalId = setInterval(() => {
    recordingTime = recordingTime - 1;
    setAudioSecondsHtml(recordingTime);
    if (recordingTime <= 0) {
      clearInterval(intervalId);
    }
  }, 1000);
  setTimeout(() => {
    stopRecording();
  }, (secondsOfAudio + 1) * 1000);
}

function stopRecording() {
  rec.stop();
  gumStream.getAudioTracks()[0].stop();
  insertAnalysisButton();
}

function exportRecording() {
  rec.exportWAV(enviarAzure);
}

(function ($) {
  $(function () {
    initializeAudioControl(secondsOfAudio);
  });
})(jQuery);
