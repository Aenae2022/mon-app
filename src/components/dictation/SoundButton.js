import React from "react";

export default function SoundButton({ soundSrc }) {
  const playSound = () => {
    const audio = new Audio(soundSrc); // Charge le son
    audio.play(); // Joue le son
  };

  return (
    <button onClick={playSound} style={{ background: "none", border: "none", cursor: "pointer" }}>
      <img className="soundButton" src="/asset/picture/icons/speaker.png" alt="speaker"/> {/* Icône de lecture */}
    </button>
  );
}