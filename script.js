// Select all videos and slider radio buttons
const videos = document.querySelectorAll("video");
const radios = document.querySelectorAll("input[name='slider']");

// Pause all videos
function pauseAllVideos() {
    videos.forEach(function(video) {
        video.pause();
    });
}

// Pause other videos when one is manually played
videos.forEach(function(video) {
    video.addEventListener("play", function() {
        videos.forEach(function(otherVideo) {
            if (otherVideo !== video) {
                otherVideo.pause();
            }
        });
    });
});

// Play corresponding video when switching slides
radios.forEach(function(radio, index) {
    radio.addEventListener("change", function() {
        pauseAllVideos();
        setTimeout(function() {
            if (videos[index]) {
                videos[index].play();
            }
        }, 200);
    });
});

// Arrow key navigation
document.addEventListener("keydown", function(event) {
    let activeIndex = 0;

    radios.forEach(function(radio, index) {
        if (radio.checked) {
            activeIndex = index;
        }
    });

    if (event.key === "ArrowRight" && activeIndex < radios.length - 1) {
        radios[activeIndex + 1].checked = true;
        radios[activeIndex + 1].dispatchEvent(new Event("change"));
    } else if (event.key === "ArrowLeft" && activeIndex > 0) {
        radios[activeIndex - 1].checked = true;
        radios[activeIndex - 1].dispatchEvent(new Event("change"));
    }
});