import "../../App.css"
import "../css/exercice.css"
import "../css/home.css"

import { useParams } from "react-router"
import { useEffect, useState } from "react"
import listWords from "../utils/listWord.tsx"
import ListWords from "../component/ListWords.tsx"
import React from "react"

function Home() {
  type WordDataType = {
    exercises: object,
    audioSrc: string,
    test: string,
  };
  let { listWordsIndex } = useParams<{ listWordsIndex?: string }>()
  const listWordsToLearn = listWordsIndex ? listWords[listWordsIndex] : []
  const [wordData, setWordData] = useState<WordDataType[]>([])

  useEffect(() => {
    const loadWordsData = async () => {
      try {
        const imports = await Promise.all(
          listWordsToLearn.map(
            (word: { src: any }) => import(`../utils/words/${word.src}.tsx`),
          ),
        )
        setWordData(imports.map((module) => module.default));
      } catch (error) {
        console.error("Erreur lors du chargement des fichiers :", error)
      }
    }

    loadWordsData()
  }, [listWordsToLearn])



  const [activity, setActivity] = useState("choose")

  let component
  if (activity === "choose") {
    component = (
      <div>
        <button className="chooseButton" onClick={handleClickTest}>
          Faire le test
        </button>
        <button className="chooseButton" onClick={handleClickExercise}>
          Apprendre les mots
        </button>
      </div>
    )
  } else if (activity === "test") {
    component = (
      <ListWords
        indexList={listWordsIndex}
        listWords={wordData}
        cibleSrc="test"
      />
    )
  } else if (activity === "exercise") {
    component = (
      <ListWords
        indexList={listWordsIndex}
        listWords={wordData}
        cibleSrc="result"
      />
    )
  }

  function handleClickTest() {
    setActivity("test")
  }
  function handleClickExercise() {
    setActivity("exercise")
  }
  return (
    <div className="exercise">
      <h2>Mots à apprendre pour le 12 décembre</h2>
      {component}
    </div>
  )
}


export default Home
