function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const taskText = taskInput.value.trim();

    if (!taskText) {
        return;
    }

    const listItem = document.createElement("li");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.addEventListener("click", function () {
        listItem.classList.toggle("completed");
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";
    deleteButton.addEventListener("click", function () {
        listItem.remove();
    });

    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

    taskInput.value = "";
    taskInput.focus();
}

document.getElementById("taskInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

const timerDisplay = document.getElementById("timerDisplay");
const startTimerBtn = document.getElementById("startTimerBtn");
const pauseTimerBtn = document.getElementById("pauseTimerBtn");
const resetTimerBtn = document.getElementById("resetTimerBtn");
const musicToggleBtn = document.getElementById("musicToggleBtn");
const musicPanel = document.getElementById("musicPanel");
const musicTypeSelect = document.getElementById("musicType");
const spotifyPlayer = document.getElementById("spotifyPlayer");

let elapsedSeconds = 0;
let timerInterval = null;
const playlistEmbeds = {
    pleasant: {
        title: "Spotify Embed: Peaceful Piano",
        src: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?theme=0"
    },
    pop: {
        title: "Spotify Embed: Today's Top Hits",
        src: "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?theme=0"
    },
    lofi: {
        title: "Spotify Embed: lofi beats",
        src: "https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn?theme=0"
    },
    chill: {
        title: "Spotify Embed: Chill Hits",
        src: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6?theme=0"
    }
};

function formatTime(totalSeconds) {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(elapsedSeconds);
}

function startTimer() {
    if (timerInterval !== null) {
        return;
    }

    timerInterval = setInterval(function () {
        elapsedSeconds += 1;
        updateTimerDisplay();
    }, 1000);
}

function pauseTimer() {
    if (timerInterval === null) {
        return;
    }

    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer();
    elapsedSeconds = 0;
    updateTimerDisplay();
}

startTimerBtn.addEventListener("click", startTimer);
pauseTimerBtn.addEventListener("click", pauseTimer);
resetTimerBtn.addEventListener("click", resetTimer);

musicToggleBtn.addEventListener("click", function () {
    const isHidden = musicPanel.classList.toggle("hidden");

    musicToggleBtn.textContent = isHidden ? "Open Music" : "Hide Music";
    musicToggleBtn.setAttribute("aria-expanded", String(!isHidden));
});

musicTypeSelect.addEventListener("change", function () {
    const selectedPlaylist = playlistEmbeds[musicTypeSelect.value];

    if (!selectedPlaylist) {
        return;
    }

    spotifyPlayer.src = selectedPlaylist.src;
    spotifyPlayer.title = selectedPlaylist.title;
});

updateTimerDisplay();
