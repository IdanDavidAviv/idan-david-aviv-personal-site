import { useState, useRef, useEffect, useMemo } from 'react'
import Section from '@/components/ui/Section'
import GlassCard from '@/components/ui/GlassCard'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw } from 'lucide-react'

// Define the type for the timestamp data
type WordTimestamp = {
  part: string;
  start: number;
  end: number;
}

/**
 * About Section - Narrative and summary with interactive audio.
 */
export default function About() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioData, setAudioData] = useState<WordTimestamp[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch('/assets/audio/about.json')
      .then(res => res.json())
      .then(data => setAudioData(data))
      .catch(console.error);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime * 1000); // convert to ms
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  // Pre-process audio data into paragraphs based on the '\n\n' delimiter preserved by Edge TTS
  const paragraphs = useMemo(() => {
    if (!audioData.length) return [];
    const paras: WordTimestamp[][] = [];
    let currentPara: WordTimestamp[] = [];
    
    audioData.forEach(word => {
      if (word.part.endsWith('\n\n')) {
        currentPara.push({ ...word, part: word.part.trim() });
        paras.push(currentPara);
        currentPara = [];
      } else {
        currentPara.push(word);
      }
    });
    if (currentPara.length > 0) paras.push(currentPara);
    return paras;
  }, [audioData]);

  // Highlight logic
  const getWordStatus = (start: number, end: number) => {
    if (!isPlaying && currentTime === 0) return 'default'; // not started
    if (currentTime >= start && currentTime <= end) return 'active'; // currently spoken
    if (currentTime > end) return 'past'; // already spoken
    return 'future'; // yet to be spoken
  };

  return (
    <Section id="about">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-6 mb-12">
          <h2 className="text-3xl font-bold text-gradient m-0">About</h2>
          
          {audioData.length > 0 && (
            <div className="flex items-center gap-3">
              <button 
                onClick={togglePlay} 
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] focus:outline-none focus:ring-1 focus:ring-white/20"
                aria-label={isPlaying ? "Pause narrative" : "Play narrative"}
              >
                {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
              </button>
              <div className="text-xs font-mono text-white/40 uppercase tracking-widest">
                {isPlaying ? 'Narrating...' : 'Listen to my story'}
              </div>
            </div>
          )}
        </div>

        <audio 
          ref={audioRef}
          src="/assets/audio/about.mp3"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />

        <GlassCard className="max-w-3xl leading-relaxed text-lg relative">
          {audioData.length > 0 && (
            <button 
              onClick={handleRestart} 
              disabled={currentTime === 0}
              className={`absolute top-2 right-2 p-2 transition-all duration-300 focus:outline-none ${
                currentTime > 0 
                  ? 'text-white/60 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] cursor-pointer' 
                  : 'text-white/20 cursor-default'
              }`}
              aria-label="Restart narrative"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          )}

          {paragraphs.length > 0 ? (
            paragraphs.map((para, i) => (
              <p key={i} className={i === 2 ? "text-base italic" : ""}>
                {para.map((word, j) => {
                  const status = getWordStatus(word.start, word.end);
                  
                  let colorClass = "text-white/80"; // default
                  if (status === 'active') colorClass = "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]";
                  else if (status === 'past') colorClass = "text-white/90";
                  else if (status === 'future') colorClass = "text-white/30";

                  return (
                    <span 
                      key={j} 
                      className={`transition-colors duration-150 ease-out ${colorClass}`}
                    >
                      {word.part}
                    </span>
                  )
                })}
              </p>
            ))
          ) : (
            // Fallback content while loading json
            <>
              <p className="text-white/80">Hi, I&apos;m Idan. I&apos;m driven by a genuine curiosity about the fundamental nature of things - whether that&apos;s a complex AI architecture, the neuroscience of the human brain, the human experience, or just any interesting conversation. I love learning and sharing my knowledge and experiences.</p>
              <p className="text-white/80">I have a deep love for complexity, and an even bigger love for untangling it. Whether I&apos;m working on a system architecture or helping someone navigate challenges, I love finding the elegant solution to every situation.</p>
              <p className="text-base text-white/60 italic">
                I really believe in meeting people exactly where they are. If something you see here sparks a thought, or if you just want to chat about a weird idea, I&apos;d love to connect. I make an effort to ensure every interaction is a good one, so please don&apos;t hesitate to reach out.
              </p>
            </>
          )}
        </GlassCard>
      </motion.div>
    </Section>
  )
}
