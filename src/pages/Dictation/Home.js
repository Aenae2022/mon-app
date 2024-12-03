import "../../App.css"
import "../../css/exercice/dictation/exercice.css"
import "../../css/exercice/dictation/home.css"

import { useParams } from "react-router"
import { useEffect, useState } from "react"
import listWords from "../../config/dictation/listWord"
import ListWords from "../../components/dictation/ListWords"

function Home() {
  let { listWordsIndex } = useParams()
  const listWordsToLearn = listWords[listWordsIndex]
  const [wordData, setWordData] = useState([])

  useEffect(() => {
    const loadWordsData = async () => {
      try {
        const imports = await Promise.all(
          listWordsToLearn.map(
            (word) => import(`../../config/dictation/words/${word.src}`),
          ),
        )
        setWordData(imports.map((module) => module.default)) // Extraire les données exportées par défaut
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
