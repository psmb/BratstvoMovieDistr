var trailer;

function onYouTubePlayerAPIReady () {
	trailer = new YT.Player('trailer', {
		events: {
			onReady: onPlayerReady,
			onStateChange: onPlayerStateChange
		}
	});
}

function onPlayerReady (e) {
	$("#trailer-play").show();
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
