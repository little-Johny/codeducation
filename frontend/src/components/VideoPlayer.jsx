import { Pause, Play } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function VideoPlayer({ lesson }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);

    const formatTime = (timeInsec) => {
        if (isNaN(timeInsec)) return "0:00";
        const minutes = Math.floor(timeInsec / 60);
        const seconds = Math.floor(timeInsec % 60);
        return `${minutes}:${String(seconds).padStart(2, "0")}`;
    };

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.volume = volume;
            video.playbackRate = playbackRate;
        }
    }, [volume, playbackRate]);

    const togglePlay = () => {
        const video = videoRef.current;
        if (video) {
            if (isPlaying) {
                video.pause();
            } else {
                video.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(videoRef.current.duration);
    };

    const handleSeek = (e) => {
        const video = videoRef.current;
        const newTime = (e.target.value / 100) * duration;
        video.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value / 100;
        setVolume(newVolume);
        videoRef.current.volume = newVolume;
    };

    const toggleFullscreen = () => {
        const video = videoRef.current;
        if (video.requestFullscreen) {
            video.requestFullscreen();
        }
    };

    const changeSpeed = (rate) => {
        setPlaybackRate(rate);
        videoRef.current.playbackRate = rate;
    };

    return (
        <div className="video-player bg-black rounded-lg overflow-hidden">
            <video
                ref={videoRef}
                src={lesson.videoUrl}
                className="w-full h-auto"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
            <div className="controls bg-gray-800 p-4 flex items-center gap-4 text-white">
                <button onClick={togglePlay} className="btn btn-xs btn-ghost">
                    {isPlaying ? <Pause size={15} fill="white" /> : <Play size={15} fill="white" />}
                </button>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={(currentTime / duration) * 100 || 0}
                    onChange={handleSeek}
                    className="flex-1"
                />
                <span className="text-xs flex">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume * 100}
                    onChange={handleVolumeChange}
                    className="w-20"
                />
                <select
                    value={playbackRate}
                    onChange={(e) => changeSpeed(parseFloat(e.target.value))}
                    className=" select-xs select-ghost outline-1 text-white rounded-sm p-1"
                >
                    <option value="0.5">0.5x</option>
                    <option value="1">1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                </select>
                <button onClick={toggleFullscreen} className="btn btn-xs btn-ghost">
                    ⛶
                </button>
            </div>
        </div>
    );
}
