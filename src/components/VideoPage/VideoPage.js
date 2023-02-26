import React, {useState, useRef} from 'react'
import reaching from '../../reaching2/sui.mp4'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // play icon
import PauseIcon from '@mui/icons-material/Pause'; // Pause Icon
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import './videopage.css'
const VideoPage = () => {
  const [isPlay, setIsPlay] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const containerRef = useRef(null);
  const videoRef = useRef();
  const theaterRef = useRef();
  const fullScreenRef = useRef();
  const miniPlayerRef = useRef();
  const volumeRef = useRef();
  const sliderRef = useRef();
  const playPauseHandler = () => {
    setIsPlay(!isPlay)
    togglePlay();
  }

  function togglePlay() {
    if (isPlay === true) {
      console.log("pressed");
      containerRef.current.classList.remove("paused");
      videoRef.current.play();
    } else {
      videoRef.current.pause();
      console.log("pause");
      containerRef.current.classList.add("paused");
    }
  }
  const handleVideoOnClick = () => {
    setIsPlay(!isPlay);
    togglePlay();
  }
  document.addEventListener('keydown', (e) => {
    
    switch (e.key.toLowerCase()) {
      case "f":
        toggleFullScreenMode();
        break;
      case 't':
        toggleTheater();
        break;
      case 'i':
        toggleMiniPlayerMode();
        break;
    }
  })
  

  // view modes
  
  //theater mode
  const handleTheaterOnClick = () => {
    toggleTheater();
  }
  function toggleTheater() {
    containerRef.current.classList.toggle("theater");
  }
  const handleFullScreenMode = () => {
    setIsFullScreen(!isFullScreen)
    toggleFullScreenMode();
  }
  function toggleFullScreenMode() {
    
    if (isFullScreen === true) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
  const handleMiniPlayerMode = () => {
    toggleMiniPlayerMode();
  }
  function toggleMiniPlayerMode() {
    if (containerRef.current.classList.contains("mini-player")) {
      document.current.exitPictureInPicture();
      containerRef.current.classList.remove("mini-player");
    } else {
      containerRef.current.classList.add("mini-player");
      videoRef.current.requestPictureInPicture();
    }
  }
  document.addEventListener("fullscreenchange",() => {
    containerRef.current.classList.toggle("full-screen", document.fullscreenElement);
  })

  // volume slider 
  
  const handleVolumeOnClick = () => {
    toggleVolumeMuteUnmute();
  }

  function toggleVolumeMuteUnmute() {
    videoRef.current.muted = !videoRef.current.muted;
  }

  const handleOnVolumeChange = () => {

  }
  const handleOnInputSlider = (e) => {
    videoRef.current.volume = e.target.value;
    videoRef.current.muted = e.target.value === 0;
  }
  return (
    <section   className="video-page-section">
      <h2>
        Working on it
      </h2>
        <div ref = {containerRef} className="video-container pause" data-volume-level="low">
          <div className="video-controls-container">
            <div className="timeline-controls"></div>
            <div className="controls">

              <button onClick = {playPauseHandler} className="play-pause-btn">
                <PlayArrowIcon className = "play-icon"/>
                <PauseIcon className='pause-icon'/>
              </button>
              <div className="volume-container">
                <button className="mute-btn">
                    <VolumeUpIcon onClick = {handleVolumeOnClick} ref = {volumeRef} className = "volume-high-icon" />
                </button>
                <input onInput={handleOnInputSlider} ref = {sliderRef} className = "volume-slider" type="range" min = {0} max = {1} step="any"/>
              </div>
              <button onClick={handleMiniPlayerMode} ref = {miniPlayerRef} className="mini-player-btn">
                  <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"/>
                  </svg>
              </button>
              <button onClick={handleTheaterOnClick} ref = {theaterRef} className="theater-btn">
                  <svg className="tall" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"/>
                  </svg>
                  <svg className="wide" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"/>
                  </svg> 
              </button>
              <button onClick = {handleFullScreenMode} ref = {fullScreenRef}  className="full-screen-btn">
                  <svg className="open" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                  </svg>
                  <svg className="close" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                  </svg>
              </button>
            </div>
          </div>
          <video autoPlay onVolumeChange={handleOnVolumeChange} ref = {videoRef} onClick = {handleVideoOnClick}  className = "course-video-player" src={reaching} controlsList="nodownload"></video>
        </div>
    </section>
  )
}

export default VideoPage