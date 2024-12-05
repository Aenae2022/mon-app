import "../../App.css"
import Exercise from "../component/Exercise.tsx"
import ExerciseType1 from "../component/ExerciseType1.tsx"
import ExerciseType2 from "../component/ExerciseType2.tsx"
import ExerciseType3 from "../component/ExerciseType3.tsx"
import ExerciseType4 from "../component/ExerciseType4.tsx"
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react"

import listWords from "../utils/listWord.tsx"
import TitleExercise from "../component/TitleExercise.tsx"

export default function App() {
  let navigate = useNavigate()
  let { exercise } = useParams()
  let { listIndex } = useParams()
  let { wordIndex } = useParams()
  const listWordsToLearn = listIndex !== undefined ? listWords[listIndex] : undefined
  const [status, setStatus] = useState("working") //working || ok || nope
  const [datas, setDatas] = useState<{ exercises: Record<string, any>, word: string, audioSrc: string }>({ exercises: {}, word: '', audioSrc: '' })
  const [isLoading, setIsLoading] = useState(true)

  const [onValidate, setValidate] = useState(() => () => { })
  const [onRetry, setRetry] = useState(() => () => { })

  useEffect(() => {
    const loadWordDatas = async () => {
      if (listWordsToLearn && wordIndex !== undefined) {
        try {
          const module = await import(
            `../utils/words/${listWordsToLearn[wordIndex].src}`
          )
          setDatas(module.default)
          setIsLoading(false)
        } catch (error) {
          console.error("Erreur lors du chargement du fichier :", error)
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }
    loadWordDatas()
  }, [listWordsToLearn, wordIndex])

  if (isLoading) {
    return <div className="App">Chargement...</div>
  }
  if (datas && exercise) {
    let nextExercise: number

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
          setValidate={setValidate}
          setRetry={setRetry}
          setStatus={setStatus}
        />
      )
    } else if (componentName === "ExerciseType2") {
      component = (
        <ExerciseType2
          word={datas.word}
          additionalLetters={
            datas.exercises["exercise-" + exercise].additionalLetters
          }
          setValidate={setValidate}
          setRetry={setRetry}
          setStatus={setStatus}
        />
      )
    } else if (componentName === "ExerciseType3") {
      component = (
        <ExerciseType3
          word={datas.word}
          setValidate={setValidate}
          setRetry={setRetry}
          setStatus={setStatus}
        />
      )
    } else if (componentName === "ExerciseType4") {
      component = (
        <ExerciseType4
          word={datas.word}
          setValidate={setValidate}
          setRetry={setRetry}
          setStatus={setStatus}
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




