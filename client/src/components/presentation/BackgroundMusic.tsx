import { useEffect, useState } from 'react';
import { audioEvents } from './MusicControls';

export function BackgroundMusic() {
  const [isMuted, setIsMuted] = useState(false);

  // Handle mute/unmute from MusicControls
  useEffect(() => {
    const handleToggleMute = () => {
      setIsMuted(prev => !prev);
    };
    
    document.addEventListener('audio:toggleMute', handleToggleMute);
    
    return () => {
      document.removeEventListener('audio:toggleMute', handleToggleMute);
    };
  }, []);
  
  // Simple method - just embed the audio with HTML
  return (
    <div className="fixed bottom-14 right-4 z-50 bg-black/50 p-2 rounded">
      <p className="text-white text-xs mb-1">Background Music:</p>
      <audio 
        controls
        loop
        muted={isMuted}
        autoPlay={false}
        preload="auto"
        controlsList="nodownload"
        style={{ width: '280px' }}
      >
        <source src="/audio/background-music.mp3" type="audio/mp3" />
        <source src="/audio/background-music.wav" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default BackgroundMusic;