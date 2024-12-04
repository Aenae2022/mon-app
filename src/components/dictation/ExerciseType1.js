import React, { useRef } from "react"
import "../../css/exercice/dictation/exercice.css"
import { cleanString } from "../../config/utilitaires"
export default function ExerciseType1({
  word,
  setValidate,
  setRetry,
  setStatus,
}) {
  const inputRef = useRef()

  React.useEffect(() => {
    setValidate(() => () => {
      const userInput = inputRef.current.value
      const cleanedInput = cleanString(userInput) // Nettoie la chaîne
      if (cleanedInput === word) {
        setStatus("ok")
      } else {
        setStatus("nope")
      }
    })

    setRetry(() => () => {
      inputRef.current.value = ""
      setStatus("working")
    })
  }, [setValidate, setRetry, setStatus, word])
  return (
    <>
      <h3>Recopie le mot à apprendre</h3>
      <h2 className="model">{word}</h2>
      <div>
        <input type="text" className="inputText" ref={inputRef} />
      </div>
    </>
  )
}
