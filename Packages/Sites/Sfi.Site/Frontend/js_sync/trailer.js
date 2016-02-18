var trailer;
var md = new MobileDetect(window.navigator.userAgent);

function onYouTubePlayerAPIReady() {
	trailer = new YT.Player('trailer', {
		events: {
			onReady: onPlayerReady,
			onStateChange: onPlayerStateChange
		}
	});
}
function onPlayerReady(e) {
	if (md.mobile() === null) {
		playerButton.style.display = '';
		e.target.mute();
		e.target.playVideo();
	}
}
function onPlayerStateChange(e) {
	if (e.data === YT.PlayerState.ENDED) {
		playerButton.style.display = '';
		e.target.mute();
	}
}

var playerButton = document.getElementById('trailer-play');
playerButton.addEventListener('click', function (e) {
	e.preventDefault();
	trailer.seekTo(0);
	trailer.unMute();
	trailer.playVideo();
	playerButton.style.display = 'none';
});
