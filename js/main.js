const playBtn = document.querySelector(".play"),
    skipForward = document.querySelector(".skip-forward"),
    skipBack = document.querySelector(".skip-back"),

    progressBarContainer = document.querySelector('.progress'),
    progressBar = document.querySelector('.progress-bar'),
    progressHead = document.querySelector('.progress-head'),

    currentTimeHtml = document.querySelector(".current-time"),
    durationHtml = document.querySelector(".duration"),

    playIcon = document.querySelector('.fa-play'),
    img = document.querySelector('.img'),
    title = document.querySelector(".audio-title"),
    singer = document.querySelector(".audio-singer");

const tracks = [
    {
        name: "City Boys",
        artist: "Burna Boy",
        cover: "https://th.bing.com/th/id/R.a5b0e2be6729e5233b76f7f91adcb9d2?rik=GuJLYb%2fEsuAnbw&pid=ImgRaw&r=0",
        source: "https://assets.mixkit.co/music/download/mixkit-tech-house-vibes-130.mp3",
    },
    {
        name: "Charm",
        artist: "Rema",
        cover: "https://i.scdn.co/image/ab6761610000e5eb3048665f9b62f24979bb22b0",
        source: "https://assets.mixkit.co/music/download/mixkit-hip-hop-02-738.mp3",
    },
    {
        name: "Bank Of America",
        artist: "Seyi Vibez",
        cover: "https://th.bing.com/th/id/OIP.GrSMFUopmNBMH_OX0VlcdgHaHa?rs=1&pid=ImgDetMain",
        source: "https://assets.mixkit.co/music/download/mixkit-dreaming-big-31.mp3",
    },
];

let audio = null,
    barWidth = null,
    duration = null,
    currentTime = null,
    isTimerPlaying = false,
    currentTrackIndex = 0,
    currentTrack = tracks[0];

audio = new Audio();
audio.src = currentTrack.source;
img.src = currentTrack.cover;
title.innerText = currentTrack.name;
singer.innerText = currentTrack.artist;

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        isTimerPlaying = true;
    } else {
        audio.pause();
        isTimerPlaying = false;
    }
});

progressBarContainer.addEventListener('click', (x) => {
    let maxDuration = audio.duration;
    let position = x.pageX - progressBarContainer.offsetLeft;
    let percentage = (100 * position) / progressBarContainer.offsetWidth;
    if (percentage > 100) percentage = 100;
    if (percentage < 0) percentage = 0;
    barWidth = percentage + "%";

    audio.currentTime = (maxDuration * percentage) / 100;
    progressBar.style.width = `${barWidth}%`;
    progressHead.style.setProperty("left", `${barWidth}%`);
    img.src = currentTrack.cover;
});

skipForward.addEventListener('click', () => {
    if (currentTrackIndex < tracks.length - 1) {
        currentTrackIndex++;
    } else {
        currentTrackIndex = 0;
    }

    currentTrack = tracks[currentTrackIndex];

    audio.src = currentTrack.source;
    img.src = currentTrack.cover;
    title.innerText = currentTrack.name;
    singer.innerText = currentTrack.artist;

    barWidth = 0;
    progressBar.style.width = `${barWidth}%`;
    progressHead.style.setProperty("left", `${barWidth}%`);
    currentTimeHtml.innerText = `0:00`;
    durationHtml.innerText = `0:00`;

    audio.currentTime = 0;
    audio.src = currentTrack.source;

    setTimeout(() => {
        if (isTimerPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, 300);
});

skipBack.addEventListener('click', () => {
    if (currentTrackIndex > 0) {
        currentTrackIndex--;
    } else {
        this.currentTrackIndex = this.tracks.length - 1;
    }
    currentTrack = tracks[currentTrackIndex];

    audio.src = currentTrack.source;
    img.src = currentTrack.cover;
    title.innerText = currentTrack.name;
    singer.innerText = currentTrack.artist;

    barWidth = 0;
    progressBar.style.width = `${barWidth}%`;
    progressHead.style.setProperty("left", `${barWidth}%`);
    currentTimeHtml.innerText = `0:00`;
    durationHtml.innerText = `0:00`;

    audio.currentTime = 0;
    audio.src = currentTrack.source;

    setTimeout(() => {
        if (isTimerPlaying) {
            audio.play();
        } else {
            audio.pause();
        }
    }, 300);
});

audio.ontimeupdate = function () {
    if (audio.duration) {
        barWidth = (100 / audio.duration) * audio.currentTime;

        let duringMinute = Math.floor(audio.duration / 60);
        let duringSecond = Math.floor(audio.duration - duringMinute * 60);
        let currentMinute = Math.floor(audio.currentTime / 60);
        let currentSecond = Math.floor(audio.currentTime - currentMinute * 60);

        if (duringMinute < 10) duringMinute = "0" + duringMinute;
        if (duringSecond < 10) duringSecond = "0" + duringSecond;
        if (currentMinute < 10) currentMinute = "0" + currentMinute;
        if (currentSecond < 10) currentSecond = "0" + currentSecond;

        duration = duringMinute + ":" + duringSecond;
        currentTime = currentMinute + ":" + currentSecond;

        progressBar.style.width = `${barWidth}%`;
        progressHead.style.setProperty("left", `${barWidth}%`)
        currentTimeHtml.innerText = `${currentTime}`;
        durationHtml.innerText = `${duration}`;

        if (isTimerPlaying) {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        } else {
            playIcon.classList.add('fa-play');
            playIcon.classList.remove('fa-pause');
        }
    }
};

audio.onended = function () { };

TweenMax.from('.img', 4, { rotation: "+=360", transformOrigin: "50% 50%", ease: Linear.easeNone, repeat: -1 });
gsap.from("body, h1, .audio-img, .audio-title, .audio-singer, .audio-btns", {
    opacity: 0,
    duration: 2,
    delay: 1.5,
    y: 25,
    ease: "expo.out",
    stagger: 0.2,
});
