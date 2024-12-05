import React, { useEffect, useRef } from "react"
import "../css/exercice.css"
import { cleanString } from "../../core/utils/utilitaires.tsx"
export default function ExerciseType1({
  word,
  setValidate,
  setRetry,
  setStatus,
}) {
  const inputRef = useRef<HTMLInputElement>(null)

 useEffect(() => {
   setValidate(() => () => {
     const userInput = inputRef.current? inputRef.current.value:''
     const cleanedInput = cleanString(userInput)
     if (cleanedInput === word) {
       setStatus("ok")
     } else {
       setStatus("nope")
     }
   })

   setRetry(() => () => {
     console.log("Réessayer déclenché depuis l'enfant !")
     if (inputRef.current) {
       inputRef.current.value = ""
     }
     setStatus("working")
   })
 }, [setValidate, setRetry, word])
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
