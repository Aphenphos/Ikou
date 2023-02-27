import { updateFunc } from "../main";
import { getAverage } from "./utils";

const audioContext = new window.AudioContext();
const audioAnalyser = audioContext.createAnalyser();
audioAnalyser.fftSize = 256;
const HTMLAudio = document.querySelector("audio");
let dataPoints;

export function processAudio(source) {
  HTMLAudio.src = URL.createObjectURL(source);
  audioContext.resume();
  HTMLAudio.play();

  const media = audioContext.createMediaElementSource(HTMLAudio);
  media.connect(audioAnalyser);
  audioAnalyser.connect(audioContext.destination);

  const bufferLength = audioAnalyser.frequencyBinCount;
  dataPoints = new Uint8Array(bufferLength);
}

export default function parseAudio() {
  requestAnimationFrame(parseAudio);
  audioAnalyser.getByteFrequencyData(dataPoints);
  updateFunc(dataPoints);
}
