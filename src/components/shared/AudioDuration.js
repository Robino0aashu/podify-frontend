import React, { useEffect, useState } from 'react';

const AudioDuration = ({ audioUrl }) => {
  const [duration, setDuration] = useState('0:00');

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.addEventListener('loadedmetadata', () => {
      const minutes = Math.floor(audio.duration / 60);
      const seconds = Math.floor(audio.duration % 60);
      const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      setDuration(formattedDuration); // Set duration in 'minute:second' format
    });

    return () => {
      audio.removeEventListener('loadedmetadata', () => {});
      audio.pause();
    };
  }, [audioUrl]);

  return <p>{duration}</p>;
};

export default AudioDuration;
