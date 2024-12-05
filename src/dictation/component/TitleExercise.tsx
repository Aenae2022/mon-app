import React from "react"
import SoundButton from "./SoundButton.tsx"

function TitleExercise({ text, soundSrc }) {
  return (
    <div className="titleExercise">
      <div>
        <h1>{text.title}</h1>
        <h2>{text.subtitle}</h2>
      </div>
      <div className="soundBox">
        <SoundButton soundSrc={soundSrc} />
      </div>
    </div>
  )
}

export default TitleExercise
