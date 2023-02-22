import "./style.css";
import { processAudio } from "./js/audio";
import animate from "./js/graphics";

//Grab audio
const input = document.getElementById("audio-up");
input.addEventListener("change", (e) => {
  processAudio(e.currentTarget.files[0]);
});
animate();
