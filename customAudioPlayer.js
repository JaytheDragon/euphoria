const players = document.querySelectorAll('.audio-container__player');

players.forEach((player) => {
  /** @type {HTMLButtonElement} */
  const button = player.querySelector('button');
  /** @type {HTMLImageElement} */
  const icon = button.querySelector('img');
  /** @type {HTMLAudioElement} */
  const audio = player.querySelector('audio');

  let isPlaying = false;

  function toggle() {
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      icon.src = './ui 에셋/play.png';
    } else {
      // 현재 재생 중인 모든 오디오를 멈추기
      players.forEach((otherPlayer) => {
        const otherAudio = otherPlayer.querySelector('audio');
        const otherIcon = otherPlayer.querySelector('img');
        if (otherAudio !== audio) {
          otherAudio.pause();
          otherAudio.currentTime = 0;
          otherIcon.src = './ui 에셋/play.png';
          otherPlayer.dataset.playing = 'false';
        }
      });

      audio.volume = 1.0;
      audio.play();
      icon.src = './ui 에셋/stop.png';
    }
    isPlaying = !isPlaying;
    player.dataset.playing = isPlaying ? 'true' : 'false';
  }

  function audioEnd() {
    isPlaying = false;
    icon.src = './ui 에셋/play-circle.svg';
    player.dataset.playing = 'false';
  }

  button.addEventListener('click', toggle);
  audio.addEventListener('ended', audioEnd);
});
