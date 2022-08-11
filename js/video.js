let player;
const playerContainer = document.querySelector('.video');
const playerWrapper = document.querySelector('.video__wrapper');

const playBtn = document.querySelector('.video__start');
const pauseTemplate = document.querySelector('#video-pause');
const playTemplate = document.querySelector('#video-play');

const playback = document.querySelector('.video__playback');
const playbackSlider = document.querySelector('.video__playback-slider');
const playbackButton = document.querySelector('.video__playback-button');
const splash = document.querySelector('.video__splash');

const volumeIcon = document.querySelector('.video__volume-icon');
const volumeSwitcher = document.querySelector('.video__volume-switcher');
const volumeSwitcherRange = document.querySelector('.video__volume-switcher-range');
const volumeBtn = document.querySelector('.video__volume-switcher-button');



function eventsInit() {
  playBtn.addEventListener('click', (event)=> {
    event.preventDefault();
    
    if (playerContainer.classList.contains('video--active')) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  })
  
  playback.addEventListener('click', function(event) {
    event.stopPropagation();
    const bar = event.currentTarget;
    console.log(bar);
    const clickedPosition = event.offsetX;
    const barWidth = parseInt(document.defaultView.getComputedStyle(bar).width);
    
    const buttonPositionPercent = (clickedPosition / barWidth) * 100;
    const playbackPositionSec = (player.getDuration() / 100) * buttonPositionPercent;
    
    playbackSlider.style.width = `${buttonPositionPercent}%`;
    playbackButton.style.left = `${buttonPositionPercent}%`;
    player.seekTo(playbackPositionSec);
  }, true)
  
  splash.addEventListener('click', function() {
    player.playVideo();
  })
  
  volumeIcon.addEventListener('click', function() {
    const volume = player.getVolume();
    if (volumeIcon.classList.contains('video__volume-icon--muted')) {
      volumeIcon.classList.remove('video__volume-icon--muted');
      player.unMute();
      const returnedVolume = getVolumeSwitcherPercent(volume);
      volumeSwitcherRange.style.width = `${returnedVolume}%`;
      volumeBtn.style.left = `${returnedVolume}%`;
    } else {
      volumeIcon.classList.add('video__volume-icon--muted');
      player.mute();
      volumeSwitcherRange.style.width = 0;
      volumeBtn.style.left = 0;
    }
  })
  
  volumeSwitcher.addEventListener('click', function(event) {
    const switcher = event.currentTarget;
    const clickedPosition = event.offsetX;
    const barWidth = parseInt(document.defaultView.getComputedStyle(switcher).width);
    
    const buttonPositionPercent = (clickedPosition / barWidth) * 100;
    volumeSwitcherRange.style.width = `${buttonPositionPercent}%`;
    volumeBtn.style.left = `${buttonPositionPercent}%`;
    player.setVolume(buttonPositionPercent);
  })
  
  
  function getVolumeSwitcherPercent(volume) {
    const switcherWidth = parseInt(document.defaultView.getComputedStyle(volumeSwitcher).width);
    return (volume / 100) * switcherWidth;
  }
}


function onPlayerReady() {
  const durationSec = player.getDuration();
  let interval;
  
  function getTimePercent(currentTimeSec) {
    let timePercent = `${(currentTimeSec / durationSec) * 100}%`;
    return timePercent;
  };
  
  if (typeof interval !== undefined) {
    clearInterval(interval);
  }
  
  interval = setInterval(() => {
    const currentTimeSec = player.getCurrentTime();
    playbackSlider.style.width = getTimePercent(currentTimeSec);
    playbackButton.style.left = getTimePercent(currentTimeSec);
  }, 1000)
  
  player.setVolume(100);
  
}

function onPlayerStateChange(event) {
  // -1 (воспроизведение видео не начато)
  // 0 (воспроизведение видео завершено)
  // 1 (воспроизведение)
  // 2 (пауза)
  // 3 (буферизация)
  // 5 (видео подают реплики).
  
  switch (event.data) {
    case 0:
      playerContainer.classList.remove('video--active');
      playBtn.innerHTML = playTemplate.innerHTML;
      break;
      case 1:
        playerContainer.classList.add('video--active');
        playBtn.innerHTML = pauseTemplate.innerHTML;
        break;
        case 2:
          playerContainer.classList.remove('video--active');
      playBtn.innerHTML = playTemplate.innerHTML;
      break;
  }
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player', {
    height: `${playerWrapper.clientHeight}`,
    width: `${playerWrapper.clientWidth}`,
    videoId: '1_f3RcyYdfA',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 1,
      showinfo: 0,
      rel: 0,
      autoplay: 0
    }
  });
}

eventsInit();
