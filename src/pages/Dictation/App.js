import "../../App.css"
import Exercise from "../../components/dictation/Exercise"
import ExerciseType1 from "../../components/dictation/ExerciseType1"
import ExerciseType2 from "../../components/dictation/ExerciseType2"
import ExerciseType3 from "../../components/dictation/ExerciseType3"
import ExerciseType4 from "../../components/dictation/ExerciseType4"
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react"

import listWords from "../../config/dictation/listWord"
import TitleExercise from "../../components/dictation/TitleExercise"

function App() {
  let navigate = useNavigate()
  let { exercise } = useParams()
  let { listIndex } = useParams()
  let { wordIndex } = useParams()
  const listWordsToLearn = listWords[listIndex]
  const [status, setStatus] = useState("working") //working || ok || nope
  const [datas, setDatas] = useState([])
  const [isLoading, setIsLoading] = useState(true) // État de chargement

  const [onValidate, setValidate] = useState(() => () => {})
  const [onRetry, setRetry] = useState(() => () => {})

  useEffect(() => {
    const loadWordDatas = async () => {
      try {
        const module = await import(
          `../../config/dictation/words/${listWordsToLearn[wordIndex].src}`
        )
        setDatas(module.default)
        setIsLoading(false)
      } catch (error) {
        console.error("Erreur lors du chargement du fichier :", error)
        setIsLoading(false)
      }
    }
    loadWordDatas()
  }, [listWordsToLearn])

  if (isLoading) {
    return <div className="App">Chargement...</div>
  }
  if (datas && exercise) {
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

    function handleNext() {
      let redirection = "/dictation/list/" + infoUrl.listIndex
      if (nextExercise !== 0) {
        redirection =
          "/dictation/word/" +
          infoUrl.listIndex +
          "/" +
          infoUrl.wordIndex +
          "/" +
          nextExercise
      }
      setStatus("working")
      navigate(redirection)
    }
    const componentName = datas.exercises["exercise-" + exercise].component

    let component
    let infoUrl = { listIndex: listIndex, wordIndex: wordIndex }
    if (componentName === "ExerciseType1") {
      component = (
        <ExerciseType1
          word={datas.word}
          nextExercise={nextExercise}
          setValidate={setValidate}
          setRetry={setRetry}
          //setNext={setNext}
          status={status}
          setStatus={setStatus}
          infoUrl={infoUrl}
        />
      )
    } else if (componentName === "ExerciseType2") {
      component = (
        <ExerciseType2
          word={datas.word}
          additionalLetters={
            datas.exercises["exercise-" + exercise].additionalLetters
          }
          nextExercise={nextExercise}
          setValidate={setValidate}
          setRetry={setRetry}
          //setNext={setNext}
          status={status}
          setStatus={setStatus}
          infoUrl={infoUrl}
        />
      )
    } else if (componentName === "ExerciseType3") {
      component = (
        <ExerciseType3
          word={datas.word}
          nextExercise={nextExercise}
          setValidate={setValidate}
          setRetry={setRetry}
          //setNext={setNext}
          status={status}
          setStatus={setStatus}
          infoUrl={infoUrl}
        />
      )
    } else if (componentName === "ExerciseType4") {
      component = (
        <ExerciseType4
          word={datas.word}
          nextExercise={nextExercise}
          setValidate={setValidate}
          setRetry={setRetry}
          //setNext={setNext}
          status={status}
          setStatus={setStatus}
          infoUrl={infoUrl}
        />
      )
    }
    return (
      <div className="App">
        <TitleExercise text={titleExercise} soundSrc={datas.audioSrc} />
        <Exercise
          onValidate={onValidate}
          onRetry={onRetry}
          onNext={handleNext}
          nextExercise={nextExercise}
          status={status}
        >
          {component}
        </Exercise>
      </div>
    )
  } else {
    console.log("chemin 2")
    return <div className="App">coucou</div>
  }
}

export default App
