import "../../App.css"
import Exercise from "../../components/dictation/Exercise"
import ExerciseType1 from "../../components/dictation/ExerciseType1"
import ExerciseType2 from "../../components/dictation/ExerciseType2"
import { useParams } from "react-router"
import React, { useState } from "react"
import initialDatas from "../../config/dictation/words/bonjourDatas"
import TitleExercise from "../../components/dictation/TitleExercise"

function App() {
  const datas = initialDatas
  const [onValidate, setValidate] = useState(() => () => {})
    const [onRetry, setRetry] = useState(() => () => {})
    const [onNext, setNext] = useState(() => () => {})
    const [status, setStatus] = useState("working") //working || ok || nope
  let { exercise } = useParams()
  
  if (exercise) {
    let nextExercise

    if (parseInt(exercise) === Object.keys(datas.exercises).length) {
      nextExercise = 0
    } else {
      nextExercise = parseInt(exercise) + 1
    }
    
    const titleExercise = {
      title: "Apprendre un mot",
      subtitle: "étape " + exercise + "/" + Object.keys(datas.exercises).length,
    }
    

    const componentName = datas.exercises["exercise-" + exercise].component
    
    let component
    if (componentName === "ExerciseType1") {
      component = (
        <Exercise
          onValidate={onValidate}
          onRetry={onRetry}
          onNext={onNext}
          nextExercise={nextExercise}
          status={status}
        >
          <ExerciseType1
            word={datas.word}
            nextExercise={nextExercise}
            setValidate={setValidate}
            setRetry={setRetry}
            setNext={setNext}
            status={status}
            setStatus={setStatus}
          />
        </Exercise>
      )
    }
    if (componentName === "ExerciseType2") {
      component = (
        <ExerciseType2
          word={datas.word}
          additionalLetters={
            datas.exercises["exercise-" + exercise].additionalLetters
          }
          nextExercise={nextExercise}
        />
      )
    }
    return (
      <div className="App">
        <TitleExercise text={titleExercise} soundSrc={datas.audioSrc} />
        {component}
      </div>
    )
  } else {
    console.log("chemin 2")
    return <div className="App">coucou</div>
  }
}

export default App
