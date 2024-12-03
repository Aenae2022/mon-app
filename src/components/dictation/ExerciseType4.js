import React, { useRef } from "react"
import { cleanString } from "../../config/utilitaires"
import "../../css/exercice/dictation/exercice.css"

export default function ExerciseType4({
  word,
  setValidate,
  setRetry,
  setStatus,
}) {
  const inputRef = useRef()

  React.useEffect(() => {
    setValidate(() => () => {
      const userInput = inputRef.current.value
      const cleanedInput = cleanString(userInput)

      if (cleanedInput === word) {
        setStatus("ok")
      } else {
        setStatus("nope")
      }
    })

    setRetry(() => () => {
      console.log("Réessayer déclenché depuis l'enfant !")
      inputRef.current.value = ""
      setStatus("working")
    })
  }, [setValidate, setRetry])
  return (
    <>
      <h3>Ecris le mot à apprendre</h3>
      <div>
        <input type="text" className="inputText" ref={inputRef} />
      </div>
    </>
  )
}
