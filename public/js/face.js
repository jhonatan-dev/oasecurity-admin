const SSD_MOBILENETV1 = 'ssd_mobilenetv1'
const TINY_FACE_DETECTOR = 'tiny_face_detector'

let selectedFaceDetector = TINY_FACE_DETECTOR

// ssd_mobilenetv1 options
let minConfidence = 0.5

// tiny_face_detector options
let inputSize = 608 //128, 160, 224, 320, 416, 512, 608
let scoreThreshold = 0.5

function getFaceDetectorOptions() {
    return selectedFaceDetector === SSD_MOBILENETV1
        ? new faceapi.SsdMobilenetv1Options({ minConfidence })
        : new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
}

function getCurrentFaceDetectionNet() {
    if (selectedFaceDetector === SSD_MOBILENETV1) {
        return faceapi.nets.ssdMobilenetv1
    }
    if (selectedFaceDetector === TINY_FACE_DETECTOR) {
        return faceapi.nets.tinyFaceDetector
    }
}

function isFaceDetectionModelLoaded() {
    return !!getCurrentFaceDetectionNet().params
}

async function onPlay() {
    const videoEl = document.getElementById("inputVideo");
    if (videoEl.paused || videoEl.ended || !isFaceDetectionModelLoaded())
        return setTimeout(() => onPlay())

    const options = getFaceDetectorOptions()

    const result = await faceapi.detectSingleFace(videoEl, options)

    if (result) {
        const canvas = document.getElementById("overlay");
        const dims = faceapi.matchDimensions(canvas, videoEl, true)
        faceapi.draw.drawDetections(canvas, faceapi.resizeResults(result, dims))
    }

    setTimeout(() => onPlay())
}


function changeInputSize(size) {
    inputSize = parseInt(size)
}

async function changeFaceDetector(detector) {
    selectedFaceDetector = detector
    document.getElementById("loader").style.display = "block"
    if (!isFaceDetectionModelLoaded()) {
        await getCurrentFaceDetectionNet().loadFromUri('/assets/face_nets')
    }
    document.getElementById("loader").style.display = "none"
}

async function run() {
    // load face detection model
    await changeFaceDetector(TINY_FACE_DETECTOR)
    changeInputSize(128)

    // try to access users webcam and stream the images
    // to the video element
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} })
    const videoEl = document.getElementById("inputVideo");
    videoEl.srcObject = stream
}
