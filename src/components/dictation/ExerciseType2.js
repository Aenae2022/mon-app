import React, { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import LettersBox from "./LettersBox"
import { useNavigate } from "react-router-dom"
import { shuffleArray } from "../../config/utilitaires"
import "../../css/exercice/dictation/exercice.css"

export default function ExerciseType2({
  word,
  additionalLetters,
  setValidate,
  setRetry,
  setStatus,
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
  const shuffledLetterIds = shuffleArray([...letterIds])
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
          ...newSourceBoxIds.slice(0, targetIndex),
          item.id,
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
          ...newTargetBoxIds.slice(0, targetIndex),
          item.id,
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

  React.useEffect(() => {
    setValidate(() => () => {
      const studentAnswer = lettersBox["letterBox-2"].letterIds
        .map((lId) => letters[lId].content)
        .join("")
      if (studentAnswer === word) {
        setStatus("ok")
      } else {
        setStatus("nope")
      }
    })
    setRetry(() => () => {
      setLettersBox(() => {
        setStatus("working")
        return initialLettersBox
      })
    })
  }, [setValidate, setRetry, lettersBox])

  return (
    <DndProvider backend={HTML5Backend}>
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
          />
        )
      })}
    </DndProvider>
  )
}
