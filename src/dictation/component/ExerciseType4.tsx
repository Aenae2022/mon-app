import React, { useEffect, useRef } from "react"

import "../css/exercice.css"
import { cleanString } from "../../core/utils/utilitaires.tsx"

export default function ExerciseType4({
  word,
  setValidate,
  setRetry,
  setStatus,
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setValidate(() => () => {
      const userInput = inputRef.current?inputRef.current.value:'';
      const cleanedInput = cleanString(userInput)

      if (cleanedInput === word) {
        setStatus("ok")
      } else {
        setStatus("nope")
      }
    })

    setRetry(() => () => {
      if(inputRef.current) inputRef.current.value = ""
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
