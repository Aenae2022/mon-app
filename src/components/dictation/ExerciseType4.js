import React, { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

import "../../css/exercice/exercice.css"

export default function ExerciseType4({word, nextExercise, setValidate, setRetry, setNext, setStatus}) {
  
  const inputRef = useRef(); // Permet de référencer l'input text
  let navigate = useNavigate()
  
  React.useEffect(() => {
    setValidate(() => () => {
      const userInput = inputRef.current.value;
      // Fonction pour épurer la chaîne saisie
      const cleanString = (str) => {
        return str
          .trim() // Supprime les espaces au début et à la fin
          .replace(/\s+/g, " "); // Remplace les multiples espaces par un seul
      };

      const cleanedInput = cleanString(userInput); // Nettoie la chaîne

    if (cleanedInput === word) {
      setStatus("ok")
    } else {
      setStatus("nope")
    }
    });

    setRetry(() => () => {
      console.log("Réessayer déclenché depuis l'enfant !");
      inputRef.current.value = ''
      setStatus('working')
    });

    setNext(() => () => {
      let redirection = "/"
      if (nextExercise !== 0) {
        redirection = "/dictation/" + nextExercise
      }
      navigate(redirection)
      });


  }, [setValidate, setRetry, setNext]);
  return (
    <>
        <h3>Ecris le mot à apprendre</h3>
        <div>
          <input type="text" 
          className="inputText" 
          ref={inputRef} // Associe le ref à cet input
          />
        </div>
        </>
  )
}
