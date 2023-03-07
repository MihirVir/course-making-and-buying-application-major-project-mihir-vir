import React, {useState, useRef} from 'react'
import reaching from '../../reaching2/sui.mp4'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // play icon
import PauseIcon from '@mui/icons-material/Pause'; // Pause Icon
import './videopage.css'
const VideoPage = () => {
  const [isPlay, setIsPlay] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef();
  const theaterRef = useRef();
  const fullScreenRef = useRef();
  const currentTimeRef = useRef();
  const playBackBtnRef = useRef(); 
  const totalTimeRef = useRef();
  const muteBtn = useRef();
  const [curr, setCurr] = useState("");
  const sliderRef = useRef();
  const timelineContainer = useRef();
  const playPauseHandler = () => {
    setIsPlay(!isPlay)
    togglePlay();
  }
  const handleKeyDown = (e) => {
    try {
      if (e.charChode === 39 || e.charCode === "j") {
        skip(5);
      }
    } catch (err) {
      console.log(err);
    }
  }

  
  function togglePlay() {
    if (isPlay === true) {
      containerRef.current.classList.remove("paused");
      videoRef.current.play();
    } else {
      videoRef.current.pause();
      containerRef.current.classList.add("paused");
    }
  }
  const handleVideoOnClick = () => {
    setIsPlay(!isPlay);
    togglePlay();
  }
  // new commit
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
  document.addEventListener("fullscreenchange",() => {
    containerRef.current.classList.toggle("full-screen", document.fullscreenElement);
  })

  // duration
  const handleDurationLoad = () => {
    totalTimeRef.current.innerText = formatDuration(videoRef.current.duration) 
  }
  
  const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2
  });
  function formatDuration(time) {
      const secnds = Math.floor(time % 60);
      const minutes = Math.floor(time / 60) % 60;
      const hours = Math.floor(time / 3600);
      if (hours === 0) {
        return `${minutes}:${leadingZeroFormatter.format(secnds)}`
      } else {
        return `${hours}:${leadingZeroFormatter.format(minutes)}: ${leadingZeroFormatter.format(secnds)}`
      }
  }

  const handleTimeUpdate = () => {
    currentTimeRef.current.textContent = formatDuration(videoRef.current.currentTime);
    const percent = videoRef.current.currentTime / videoRef.current.duration;
    timelineContainer.current.style.setProperty("--progress-position", percent);
  }

  function skip(timeInSeconds) {
    videoRef.current.currentTime += timeInSeconds;
  }

  function prevSkip(timeInSeconds) {
    videoRef.current.currentTime -= timeInSeconds;
  }
  // volume slider 
  // we now have muteBtn ref and volume slider Ref

  const handleMuteBtnClick = () => {
    toggleVolumeMuteUnmute()
  }

  function toggleVolumeMuteUnmute() {
    videoRef.current.muted = !videoRef.current.muted;
  }

  const handleOnVolumeChange = () => {
    sliderRef.current.value = videoRef.current.volume;
    let volumeLvl
    if (videoRef.current.muted || videoRef.current.volume === 0) {
        sliderRef.current.value = 0;
        volumeLvl = "off"
    } else if (videoRef.current.volume >= .5) {
      volumeLvl = "high"
    } else {
      volumeLvl = "low"
    }
    containerRef.current.dataset.volumeLevel = volumeLvl; 
  }
  const handleOnInputSlider = (e) => {
    videoRef.current.volume = e.target.value;
    videoRef.current.muted = e.target.value === 0;
  }

  const handleContext = (e) => {
    e.preventDefault();
  }
  const handleDoubleClick = () => {
    skip(5);
  }
  const handlePrevDoubleClick = () => {
    prevSkip(5);
  }

  // playback
  const changePlayBackSpeed = () => {
    let newSpeed = videoRef.current.playbackRate + .25;
    if (newSpeed > 2) {
      newSpeed = .25;
    }
    videoRef.current.playbackRate = newSpeed;
    playBackBtnRef.current.textContent = `${newSpeed}x`;
  }
  // Timeline 
  let wasPaused;

  function toggleScrubbing(e) {
    const rect = timelineContainer.current.getBoundingClientRect();
    const percentage = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;
    setIsScrubbing((e.buttons & 1) === true);
    containerRef.current.classList.toggle("scrubbing");
    if (isScrubbing) {
      wasPaused = videoRef.current.paused;
      videoRef.current.pause();
      togglePlay();
    } else {
      videoRef.current.currentTime = percentage * videoRef.current.duration;
      setIsScrubbing(!isScrubbing)
      if (!wasPaused) videoRef.current.play();
    }
    
    console.log();
    handleTimeUpdate(e);
  }
  const handleMouseMove = (e) => {
    const rect = timelineContainer.current.getBoundingClientRect();
    const percent = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;
    
    timelineContainer.current.style.setProperty("--preview-position", percent);

    if (isScrubbing) {
      e.preventDefault()
      timelineContainer.current.style.setProperty("--preview-position", percent);
    }

  }
  const handleScrubbing = (e) => {
    toggleScrubbing(e);
  }
  document.addEventListener("mouseup", (e) => {
    if (isScrubbing) {
      toggleScrubbing(e);
    }
  })
  document.addEventListener("mousemove", (e) => {
    if (isScrubbing) {
      handleTimeUpdate(e);
    }
  })
  return (
    <section className="video-page-section" onContextMenu={handleContext} onKeyDown={handleKeyDown}>
      <h2>
        Working on it
      </h2>
        <div ref = {containerRef} className="video-container pause" data-volume-level="high">
          <div className="video-controls-container">
            <div onMouseMove={handleMouseMove} ref = {timelineContainer} onMouseDown={handleScrubbing} className="timeline-controls">
              <div className="timeline">
                <div className="thumb-indicator"></div>
              </div>
            </div>
            <div className="controls">

              <button onClick = {playPauseHandler} className="play-pause-btn">
                <PlayArrowIcon className = "play-icon"/>
                <PauseIcon className='pause-icon'/>
              </button>
              <div className="volume-container">
                <button onClick = {handleMuteBtnClick} className="mute-btn" ref = {muteBtn}>
                    <svg className="volume-high-icon" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                    </svg>
                    <svg  className="volume-low-icon" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" />
                    </svg>
                    <svg className="volume-muted-icon" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
                    </svg> 
              
                </button>
                <input onInput={handleOnInputSlider} ref = {sliderRef} className = "volume-slider" type="range" min = {0} max = {1} step="any"/>
              </div>
              <div className="duration-container">
                <div ref = {currentTimeRef} className="current-time">
                  0:00
                </div>
                /
                <div ref = {totalTimeRef}  className="total-time">
                  10:00
                </div>
              </div>
              <button tooltip = "playback speed" onClick = {changePlayBackSpeed} ref = {playBackBtnRef} style={{fontSize: ".9rem",minWidth: "40px", backgroundColor: "white", color: "black", paddingLeft: "15px", textAlign: "center", paddingRight: "15px", height: "32px", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center"}} className="speed-btn wide-btn">
                1x
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
          <video onTimeUpdate={handleTimeUpdate} onLoadedData={handleDurationLoad} autoPlay onVolumeChange={handleOnVolumeChange} ref = {videoRef} onClick = {handleVideoOnClick}  className = "course-video-player" src={reaching} controlsList="nodownload"></video>

          <div onClick={handleVideoOnClick} onDoubleClick = {handleDoubleClick} className="absolute-right-div-for-double-click"></div>
          <div onClick = {handleVideoOnClick} onDoubleClick = {handlePrevDoubleClick} className="absolute-left-div-for-double-click"></div>
        </div>
        <div className="docs-section">
          <h2>Video Docs</h2>
          <ol>
            <li>right section of video player double tap skips 5 seconds </li>
            <li>left sections rewinds 5 seconds </li>
            <li>single tap pauses / plays the video</li>
            <li>volume on click mutes and unmutes</li>
          </ol>
        </div>
    </section>
  )
}

export default VideoPage