"use strict";

const UrlInterface = window.URL || window.webkitURL;
const AudioContextInterface = window.AudioContext || window.webkitAudioContext;
let currentStream;
let recorderjs;
const secondsOfAudio = 5;

const frases = [
  "houston we have had a problem",
  "my voice is my passport verify me",
  "my password is not your business",
  "my name is unknown to you",
];

function obtenerFraseAleatoriamente() {
  return frases[~~(frases.length * Math.random())];
}

async function startRecording() {
  try {
    const audioContext = new AudioContextInterface({
      latencyHint: "interactive",
      sampleRate: 16000,
    });
    const input = audioContext.createMediaStreamSource(streamMedia);

    document.getElementById("buttonStartRecording").disabled = true;
    resetRecordingContainer();

    currentStream = streamMedia;

    recorderjs = new Recorder(input, { numChannels: 1 });
    recorderjs.record();

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
  } catch (error) {
    recordButton.disabled = false;
    stopButton.disabled = true;
    pauseButton.disabled = true;
  }
}

function stopRecording() {
  recorderjs.stop();
  recorderjs.exportWAV(appendAudioElement);
  document.getElementById("buttonStartRecording").disabled = false;
  setAudioSecondsHtml(secondsOfAudio);
}

function initializeAudioControls() {
  const audioControls = document.getElementById("audioControls");
  document.getElementById(
    "phraseToRecord"
  ).innerText = obtenerFraseAleatoriamente();
  audioControls.append(createStartRecordingButton());
  setAudioSecondsHtml(secondsOfAudio);
}
