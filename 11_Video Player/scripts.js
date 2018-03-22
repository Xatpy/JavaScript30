const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreenButton = player.querySelector('.player__fullscreen');

function togglePlay() {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
	updateButton();
}

function updateButton() {
	const icon = this.paused ? "⏯": "⏸";
	toggle.textContent = icon;
};

function skip() {
	console.log(this.dataset.skip);
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	video[this.name] = this.value;
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;	
}

function toggleFullscreen() {
	video.webkitEnterFullScreen();
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullscreenButton.addEventListener('click', toggleFullscreen);

window.onload = function() {
  togglePlay();
	updateButton();
};


