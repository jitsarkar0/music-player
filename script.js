const audio = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause-btn");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${minutes}:${String(secs).padStart(2, "0")}`;
}

// Show total song duration
function updateDuration() {
    duration.textContent = formatTime(audio.duration);
}

audio.addEventListener("loadedmetadata", updateDuration);
audio.addEventListener("durationchange", updateDuration);

// Show current playback time
const progress = document.querySelector(".progress");

audio.addEventListener("timeupdate", () => {
    currentTime.textContent = formatTime(audio.currentTime);

    if (audio.duration) {
        const percentage =
            (audio.currentTime / audio.duration) * 100;

        progress.style.width = `${percentage}%`;
    }
});

// Play and pause button
playPauseBtn.addEventListener("click", async () => {
    if (audio.paused) {
        try {
            await audio.play();
        } catch (error) {
            console.error("Could not play audio:", error);
        }
    } else {
        audio.pause();
    }
});

// Change the icon automatically
audio.addEventListener("play", () => {
    playPauseBtn.src = "./icons/pause.svg";
    playPauseBtn.alt = "Pause";
});

audio.addEventListener("pause", () => {
    playPauseBtn.src = "./icons/play.svg";
    playPauseBtn.alt = "Play";
});

// Load audio metadata
audio.preload = "metadata";
audio.load();