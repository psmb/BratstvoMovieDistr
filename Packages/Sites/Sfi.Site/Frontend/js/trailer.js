var trailer;

function onYouTubePlayerAPIReady () {
	trailer = new YT.Player('trailer', {
		videoId: 'G1SwbXrq8AM',
		events: {
			onReady: onPlayerReady,
			onStateChange: onPlayerStateChange
		},
		playerVars: {
			controls: 1,
			loop: 1,
			playlist: 'G1SwbXrq8AM',
			showinfo: 0,
			modestbranding: 1,
			disablekb: 1,
			rel: 0
		}
	});
}

function onPlayerReady (e) {
	e.target.mute();
	e.target.playVideo();
}
function onPlayerStateChange (e) {
	if (e.data === YT.PlayerState.ENDED) {
		e.target.mute();
		$("#trailer-play").show();
	}
}

$(function () {
	$("#trailer-play").click(function (e) {
		e.preventDefault();
		trailer.seekTo(0);
		trailer.unMute();
		trailer.playVideo();
		$(this).hide();
	});
});
