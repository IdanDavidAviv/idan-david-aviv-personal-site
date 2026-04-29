import React, { useRef, useState } from 'react'
import { Play, Pause, Square, Volume2, VolumeX } from 'lucide-react'

interface VirgoVideoPlayerProps {
    src: string;
    className?: string;
}

export function VirgoVideoPlayer({ src, className = "" }: VirgoVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true) // Initialize muted
    const [progress, setProgress] = useState(0)

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const stopVideo = () => {
        if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
            setIsPlaying(false)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime
            const duration = videoRef.current.duration
            if (duration > 0) {
                setProgress((current / duration) * 100)
            }
        }
    }
    
    const handleEnded = () => {
        setIsPlaying(false)
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            setProgress(0);
        }
    }

    return (
        <div className={`relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(204,0,255,0.15)] bg-[#0d0d0d] group ${className}`}>
            {/* Video Element */}
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                playsInline
                loop={false}
                muted={isMuted}
            />

            {/* Floating HUD Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Play/Pause */}
                <button 
                    onClick={togglePlay}
                    className="text-white hover:text-[#00f0ff] transition-colors focus:outline-none flex items-center justify-center w-8 h-8"
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                </button>

                {/* Stop */}
                <button 
                    onClick={stopVideo}
                    className="text-white hover:text-[#ff3333] transition-colors focus:outline-none flex items-center justify-center w-8 h-8"
                    aria-label="Stop"
                >
                    <Square size={16} className="fill-current" />
                </button>

                {/* Progress Bar (Visual Only) */}
                <div className="w-24 md:w-32 h-1.5 bg-white/20 rounded-full overflow-hidden flex items-center">
                    <div 
                        className="h-full bg-gradient-to-r from-[#00f0ff] via-blue-500 to-[#cc00ff] transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Mute/Unmute */}
                <button 
                    onClick={toggleMute}
                    className="text-white hover:text-[#cc00ff] transition-colors focus:outline-none flex items-center justify-center w-8 h-8"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
            </div>
        </div>
    )
}
