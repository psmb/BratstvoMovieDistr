function onYouTubePlayerAPIReady(){trailer=new YT.Player("trailer",{events:{onReady:onPlayerReady,onStateChange:onPlayerStateChange}})}function onPlayerReady(e){null===md.mobile()&&($("#trailer-play").show(),e.target.mute(),e.target.playVideo())}function onPlayerStateChange(e){e.data===YT.PlayerState.ENDED&&(e.target.mute(),$("#trailer-play").show())}$(function(){$(".owl-carousel").owlCarousel({items:1,loop:!0,nav:!0,navText:["&#10096;","&#10097;"]}),window.sr=new scrollReveal});var trailer,md=new MobileDetect(window.navigator.userAgent);$(function(){$("#trailer-play").click(function(e){e.preventDefault(),trailer.seekTo(0),trailer.unMute(),trailer.playVideo(),$(this).hide()})});