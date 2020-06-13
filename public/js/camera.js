"use strict";

async function getMediaStreamFromUser() {
    try {
        const md = new MobileDetect(window.navigator.userAgent);
        return await navigator.mediaDevices.getUserMedia(
            md.mobile()
                ? {
                    audio: true,
                    video: {
                        width: 320,
                        height: 320,
                        facingMode: "user"
                    }
                }
                : {
                    audio: true,
                    video: {
                        width: 608,
                        height: 608
                    }
                }
        );
    } catch (error) {
        throw new Error("Error on getMediaStreamFromUser");
    }
}

function setVideoMediaStream(videoElement = HTMLVideoElement, stream = MediaStream) {
    if ("srcObject" in videoElement) {
        videoElement.srcObject = stream;
    } else {
        videoElement.src = window.URL.createObjectURL(stream); // for older browsers
    }
}