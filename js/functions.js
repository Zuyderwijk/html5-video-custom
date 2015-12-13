$(function(){
    var video = document.body.getElementsByTagName('VIDEO')[0];
    var progressBar = document.body.getElementsByTagName('PROGRESS')[0];
    var scrubber = document.body.getElementsByClassName('scrubber')[0];
    var progressBarWidth = progressBar.offsetWidth;
    var markers = document.body.getElementsByClassName('markers')[0];

    function playVideo() {
        video.play();
        trackPlayProgress();
    }
    function pauseVideo() {
        video.pause();
        stopTrackingPlayProgress();
    }

    function trackPlayProgress(){
        playProgressInterval = setInterval(updatePlayProgress, 33);
    }
    function stopTrackingPlayProgress() {
        clearInterval(playProgressInterval);
    }

    function updatePlayProgress() {
        progressBar.value = ((video.currentTime / video.duration) * 100);
        scrubber.style.left = ((progressBar.value / 100) * progressBarWidth + "px");
    }

    function setPlayProgress(clickX) {
        var newValue = Math.max(0, Math.min(1, (clickX - findPosX(progressBar)) / progressBarWidth));
        video.currentTime = newValue * video.duration;
        progressBar.value = ((newValue * progressBarWidth) / 6.40);
    }

    function findPosX(obj) {
        var curleft = obj.offsetLeft;
        while(obj = obj.offsetParent) {
            curleft += obj.offsetLeft;
        }
        return curleft;
    }

    markers.addEventListener("mousedown", function(e){
        trackPlayProgress();
        setPlayProgress(e.pageX);
        scrubber.style.left = ((progressBar.value / 100) * progressBarWidth + "px");
    });

    progressBar.addEventListener("mousedown", function(e){
        trackPlayProgress();
        setPlayProgress(e.pageX);
        scrubber.style.left = ((progressBar.value / 100) * progressBarWidth + "px");
    });

    progressBar.addEventListener("mousedown", function(e){
        stopTrackingPlayProgress();

        if (video.paused) {
            videoWasPlaying = false;
        } else {
            videoWasPlaying = true;
            video.pause();
        }

        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
            if (videoWasPlaying) {
                video.play();
                trackPlayProgress();
            }
        }
    }, true);

    $( ".scrubber" ).draggable({
        axis: 'x',
        containment: ".progress-bar",
        scroll: false,
        start: function() {
            if (video.paused) {
                videoWasPlaying = false;
            } else {
                videoWasPlaying = true;
                video.pause();
            }
        },
        drag: function (e){
            setPlayProgress(e.pageX);
        },
        stop: function() {
            if (videoWasPlaying) {
                video.play();
                trackPlayProgress();
            }
        }
    });

    $('.play').click(function(){
        playVideo();
    });

    $('.pause').click(function(){
        pauseVideo();
    });
});