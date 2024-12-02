import "../../App.css"
import ExerciseType2 from "../../components/dictation/ExerciseType2"
import { useParams } from "react-router"
import React, { Component, useState } from "react"
import initialDatas from "../../config/dictation/words/bonjourDatas"
import TitleExercise from "../../components/dictation/TitleExercise"


function App() {
  const datas = initialDatas

  let { exercise } = useParams()
  console.log("let exercice : " + exercise)

  if (exercise) {
    let nextExercise;
    
    if(parseInt(exercise) === Object.keys(datas.exercises).length){
      nextExercise = 0
    }
    else {
      nextExercise = parseInt(exercise) + 1
    }
    console.log('nextExercise : ',nextExercise)
    const titleExercise = {
      title: "Apprendre un mot",
      subtitle: "étape " + exercise + "/" + Object.keys(datas.exercises).length,
    }

    const componentName = datas.exercises["exercise-" + exercise].component
    let component
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
        <TitleExercise text={titleExercise} />
        {component}
      </div>
    )
  } 
  else {
    console.log("chemin 2")
    return <div className="App">coucou</div>
  }
}

export default App
