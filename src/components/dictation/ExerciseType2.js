import React, { useState, useRef } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import LettersBox from "./LettersBox"
import { useNavigate } from "react-router-dom"

import "../../css/exercice/dictation/exercice.css"

export default function ExerciseType2({
  word,
  additionalLetters,
  nextExercise,
}) {
  let navigate = useNavigate()
  const myLetters = word + additionalLetters
  const letters = myLetters.split("").reduce((acc, char, index) => {
    const id = `letter-${index + 1}`
    acc[id] = {
      id,
      content: char,
    }
    return acc
  }, {})
  const letterIds = Object.keys(letters)
  const lettersBoxOrder = ["letterBox-1", "letterBox-2"]

  // Fonction de mélange (Fisher-Yates Shuffle)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)) // Index aléatoire entre 0 et i
      ;[array[i], array[j]] = [array[j], array[i]] // Échange des éléments
    }
    return array
  }

  const shuffledLetterIds = shuffleArray([...letterIds]) // Copie du tableau pour préserver l'original
  const initialLettersBox = {
    "letterBox-1": {
      id: "letterBox-1",
      title: "Lettres proposées",
      letterIds: shuffledLetterIds,
    },
    "letterBox-2": {
      id: "letterBox-2",
      title: "Réponse",
      letterIds: [],
    },
  }
  const [lettersBox, setLettersBox] = useState(initialLettersBox)

  const [status, setStatus] = useState("working") //working || ok || nope

  const newTarget = () => {
    if (status === "working") {
      return (
        <input
          className="buttonExercise"
          type="button"
          value="Valider"
          onClick={handleClickValider}
        />
      )
    } else if (status === "nope") {
      return (
        <>
          <img
            className="imgExercise"
            src="/asset/picture/icons/faux.png"
            alt="erreur"
          />
          <input
            className="buttonExercise"
            type="button"
            value="recommencer"
            onClick={handleClickRecommencer}
          />
        </>
      )
    } else {
      return (
        <>
          <img
            className="imgExercise"
            src="/asset/picture/icons/vrai.png"
            alt="bonne réponse"
          />
          <input
            className="buttonExercise"
            type="button"
            value="recommencer"
            onClick={handleClickRecommencer}
          />
          <input
            className="buttonExercise"
            type="button"
            value={nextExercise === 0 ? "Terminer" : "Suivant"}
            onClick={handleClickNext}
          />
        </>
      )
    }
  }

  const handleDrop = (item, targetBoxId, targetIndex) => {
    setLettersBox((prevDatas) => {
      const sourceBoxId = Object.keys(prevDatas).find((boxId) =>
        prevDatas[boxId].letterIds.includes(item.id),
      )
      const newSourceBoxIds = prevDatas[sourceBoxId].letterIds.filter(
        (letterId) => letterId !== item.id,
      )
      //si déplacement intra lettersBox
      if (sourceBoxId === targetBoxId) {
        const nextSourceBoxIds = [
          // Éléments avant le point d’insertion :
          ...newSourceBoxIds.slice(0, targetIndex),
          // Nouvel élément :
          item.id,
          // Éléments après le point d’insertion :
          ...newSourceBoxIds.slice(targetIndex),
        ]

        return {
          ...prevDatas,
          [sourceBoxId]: {
            ...prevDatas[sourceBoxId],
            letterIds: nextSourceBoxIds,
          },
        }
      } else {
        //déplacement inter lettersBox
        const newTargetBoxIds = prevDatas[targetBoxId].letterIds
        const nextTargetBoxIds = [
          // Éléments avant le point d’insertion :
          ...newTargetBoxIds.slice(0, targetIndex),
          // Nouvel élément :
          item.id,
          // Éléments après le point d’insertion :
          ...newTargetBoxIds.slice(targetIndex),
        ]

        return {
          ...prevDatas,
          [sourceBoxId]: {
            ...prevDatas[sourceBoxId],
            letterIds: newSourceBoxIds,
          },
          [targetBoxId]: {
            ...prevDatas[targetBoxId],
            letterIds: nextTargetBoxIds,
          },
        }
      }
    })
  }

  const handleClickValider = () => {
    const studentAnswer = lettersBox["letterBox-2"].letterIds
      .map((lId) => {
        return letters[lId].content
      })
      .toString()
      .replace(/,/g, "")

    if (studentAnswer === word) {
      setStatus("ok")
    } else {
      setStatus("nope")
    }
  }
  const handleClickRecommencer = () => {
    console.log("Recommencer")
    setLettersBox(() => {
      setStatus("working")
      return initialLettersBox
    })
  }

  const handleClickNext = () => {
    let redirection = "/"
    if (nextExercise !== 0) {
      redirection = "/dictation/:exercise" + nextExercise
    }
    navigate(redirection)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="exercise">
        <h3>Ecris le mot à apprendre à l'aide des lettres proposées</h3>
        {lettersBoxOrder.map((letterBoxId) => {
          const letterBox = lettersBox[letterBoxId]
          const myLetters = letterBox.letterIds.map(
            (letterId) => letters[letterId],
          )
          return (
            <LettersBox
              key={letterBox.id}
              letterBox={letterBox}
              letters={myLetters}
              onDrop={handleDrop}
              status={status}
            />
          )
        })}
        <div className="exerciseNav">
        {newTarget()}
        </div>
        
      </div>
    </DndProvider>
  )
}
