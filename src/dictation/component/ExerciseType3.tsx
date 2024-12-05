import React, { useState, useRef, useEffect } from "react"

import "../css/exercice.css"
import { cleanString } from "../../core/utils/utilitaires.tsx"

export default function ExerciseType3({
  word,
  setValidate,
  setRetry,
  setStatus,
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isWriting, setIsWriting] = useState(false)
  const handleClick = () => {
    setIsWriting(!isWriting)
  }
  const [text, setText] = useState("")
  const componentOeil = (
    <button
      onClick={handleClick}
      style={{ background: "none", border: "none", cursor: "pointer" }}
    >
      <img
        className="soundButton"
        src="/asset/picture/icons/oeilBouton.png"
        alt="oeil"
      />{" "}
    </button>
  )
  const componentModel = <h2 className="model">{word}</h2>
  const componentCrayon = (
    <button
      onClick={handleClick}
      style={{ background: "none", border: "none", cursor: "pointer" }}
    >
      <img
        className="soundButton"
        src="/asset/picture/icons/modifier.png"
        alt="crayon"
      />
    </button>
  )
  const componentInput = (
    <input
      type="text"
      className="inputText"
      ref={inputRef}
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  )
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
      if(inputRef.current){
        inputRef.current.value = ""
      }
      setStatus("working")
    })
  }, [setValidate, setRetry])
  return (
    <>
      <h3>Ecris le mot à apprendre</h3>
      <h4>
        Clique sur le crayon pour écrire, clique sur l'oeil pour voir le mot
      </h4>
      <div>{isWriting ? componentOeil : componentModel}</div>
      <div>{isWriting ? componentInput : componentCrayon}</div>
    </>
  )
}