import React, { useState, useRef } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import LettersBox from "./LettersBox"
import initialData from "../../config/datas"
import { useNavigate } from "react-router"
import "../../css/exercice/exercice.css"
let nextExercice = 1;
export default function ExerciseType2({datasSource}) {
  
  const [datas, setDatas] = useState(datasSource)
  const [status, setStatus] = useState("working") //working || ok || nope
  let navigate = useNavigate()
  const handleDrop = (item, targetBoxId, targetIndex) => {
    setDatas((prevDatas) => {
      const sourceBoxId = Object.keys(prevDatas.lettersBox).find((boxId) =>
        prevDatas.lettersBox[boxId].letterIds.includes(item.id),
      )

      const newSourceBoxIds = prevDatas.lettersBox[
        sourceBoxId
      ].letterIds.filter((letterId) => letterId !== item.id)

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
          lettersBox: {
            ...prevDatas.lettersBox,
            [sourceBoxId]: {
              ...prevDatas.lettersBox[sourceBoxId],
              letterIds: nextSourceBoxIds,
            },
          },
        }
      } else {
        //déplacement inter lettersBox
        const newTargetBoxIds = prevDatas.lettersBox[targetBoxId].letterIds
        const nextTargetBoxIds = [
          // Éléments avant le point d’insertion :
          ...newTargetBoxIds.slice(0, targetIndex),
          // Nouvel élément :
          item.id,
          // Éléments après le point d’insertion :
          ...newTargetBoxIds.slice(targetIndex),
        ]
        const nextDatas = {
          ...prevDatas,
          lettersBox: {
            ...prevDatas.lettersBox,
            [sourceBoxId]: {
              ...prevDatas.lettersBox[sourceBoxId],
              letterIds: newSourceBoxIds,
            },
            [targetBoxId]: {
              ...prevDatas.lettersBox[targetBoxId],
              letterIds: nextTargetBoxIds,
            },
          },
        }

        return {
          ...prevDatas,
          lettersBox: {
            ...prevDatas.lettersBox,
            [sourceBoxId]: {
              ...prevDatas.lettersBox[sourceBoxId],
              letterIds: newSourceBoxIds,
            },
            [targetBoxId]: {
              ...prevDatas.lettersBox[targetBoxId],
              letterIds: nextTargetBoxIds,
            },
          },
        }
      }
    })
  }
  const newTarget = () => {
    if (status === "working") {
      return (
        <input type="button" value="valider" onClick={handleClickValider} />
      )
    } else if (status === "nope") {
      return (
        <>
          <img src="/asset/picture/icons/faux.png" alt="erreur" />
          <input
            type="button"
            value="recommencer"
            onClick={handleClickRecommencer}
          />
        </>
      )
    } else {
      return(
      <>
        <img src="/asset/picture/icons/vrai.png" alt="bonne réponse" />
        <input type="button" value="suivant" onClick={handleClickNext} />
      </>)
    }
  }

  const handleClickValider = () => {
    console.log("Valider")
    const studentAnswer = datas.lettersBox["letterBox-2"].letterIds
      .map((lId) => {
        return datas.letters[lId].content
      })
      .toString()
    console.log(
      "réponse attendue : " +
        datas.answer +
        " de type : " +
        typeof datas.answer,
    )
    console.log(
      "réponse donnée : " +
        studentAnswer +
        " de type : " +
        typeof studentAnswer,
    )

    if (studentAnswer === datas.answer) {
      setStatus("ok")
    } else {
      setStatus("nope")
    }
  }
  const handleClickRecommencer = () => {
    console.log("Recommencer")
    setDatas(() => {
      setStatus("working")
      return initialData
    })
  }

  const handleClickNext = () => {
    const redirection = '/dictation/:exercice'+ nextExercice;
    //const redirection = "/"

    navigate(redirection)
  }

  console.log("status : " + status)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="exercise">
        {datas.lettersBoxOrder.map((letterBoxId) => {
          const letterBox = datas.lettersBox[letterBoxId]
          const letters = letterBox.letterIds.map(
            (letterId) => datas.letters[letterId],
          )
          return (
            <LettersBox
              key={letterBox.id}
              letterBox={letterBox}
              letters={letters}
              onDrop={handleDrop}
              status={status}
            />
          )
        })}
        {newTarget()}
      </div>
    </DndProvider>
  )
}
