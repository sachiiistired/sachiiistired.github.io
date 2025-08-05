const blurOverlay = document.getElementById('blur-overlay');
const audioPlayer = document.getElementById('audio-player');

blurOverlay.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play().catch(error => {
            console.log('Playback was prevented by the browser.');
        });
    }
    blurOverlay.classList.add('opacity-0');
    setTimeout(() => {
        blurOverlay.style.display = 'none';
    }, 500);
}, { once: true });


// --- Discord Copy ---
const discordButton = document.getElementById('discord-button');
const copyNotification = document.getElementById('copy-notification');
const discordUsername = 'sachii.is.tired';

discordButton.addEventListener('click', () => {
    const textArea = document.createElement('textarea');
    textArea.value = discordUsername;
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        copyNotification.classList.remove('opacity-0');
        setTimeout(() => {
            copyNotification.classList.add('opacity-0');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    document.body.removeChild(textArea);
});

const playPauseBtn = document.getElementById('play-pause-btn');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const totalDurationEl = document.getElementById('total-duration');
const volumeBar = document.getElementById('volume-bar');
const volumeHighIcon = document.getElementById('volume-high');
const volumeLowIcon = document.getElementById('volume-low');
const volumeMutedIcon = document.getElementById('volume-muted');

playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
});

audioPlayer.addEventListener('play', () => {
    playIcon.classList.add('hidden');
    pauseIcon.classList.remove('hidden');
});

audioPlayer.addEventListener('pause', () => {
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
});

const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

audioPlayer.addEventListener('timeupdate', () => {
    progressBar.value = audioPlayer.currentTime;
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
});

audioPlayer.addEventListener('loadedmetadata', () => {
    totalDurationEl.textContent = formatTime(audioPlayer.duration);
    progressBar.max = audioPlayer.duration;
});

progressBar.addEventListener('input', () => {
    audioPlayer.currentTime = progressBar.value;
});

const updateVolumeUI = () => {
    const volume = audioPlayer.volume;
    requestAnimationFrame(() => {
        volumeBar.style.setProperty('--volume-progress', `${volume * 100}%`);
    });
    
    volumeHighIcon.classList.add('hidden');
    volumeLowIcon.classList.add('hidden');
    volumeMutedIcon.classList.add('hidden');

    if (volume === 0) {
        volumeMutedIcon.classList.remove('hidden');
    } else if (volume <= 0.5) {
        volumeLowIcon.classList.remove('hidden');
    } else {
        volumeHighIcon.classList.remove('hidden');
    }
};

volumeBar.addEventListener('input', () => {
    audioPlayer.volume = volumeBar.value;
    updateVolumeUI();
});

updateVolumeUI(); 