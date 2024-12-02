import React, { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

import "../../css/exercice/exercice.css"

export default function ExerciseType3({
  word,
  nextExercise,
  setValidate,
  setRetry,
  setNext,
  setStatus,
}) {
  const inputRef = useRef() // Permet de référencer l'input text
  let navigate = useNavigate()
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
      {/* Icône de lecture */}
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
      />{" "}
      {/* Icône de lecture */}
    </button>
  )
  const componentInput = (
    <input
      type="text"
      className="inputText"
      ref={inputRef} // Associe le ref à cet input
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  )
  React.useEffect(() => {
    setValidate(() => () => {
      const userInput = inputRef.current.value
      // Fonction pour épurer la chaîne saisie
      const cleanString = (str) => {
        return str
          .trim() // Supprime les espaces au début et à la fin
          .replace(/\s+/g, " ") // Remplace les multiples espaces par un seul
      }

      const cleanedInput = cleanString(userInput) // Nettoie la chaîne

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

    setNext(() => () => {
      let redirection = "/"
      if (nextExercise !== 0) {
        redirection = "/dictation/" + nextExercise
      }
      navigate(redirection)
    })
  }, [setValidate, setRetry, setNext])
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
