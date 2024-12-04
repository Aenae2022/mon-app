import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"
import "../../css/exercice/dictation/exercice.css"
export default function ExerciseType1({
  word,
  nextExercise,
  setValidate,
  setRetry,
  setStatus,
  infoUrl,
}) {
  const inputRef = useRef()
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

    /*setNext(() => () => {
      let redirection = "/dictation/list/"+infoUrl.listIndex
      if (nextExercise !== 0) {
        redirection = "/dictation/word/"+infoUrl.listIndex + '/'+infoUrl.wordIndex + '/'+nextExercise
      }
      navigate(redirection)
      });*/


  }, [setValidate, setRetry]);
  return (
    <>
        <h3>Recopie le mot à apprendre</h3>
        <h2 className="model">
          {word}
        </h2>
        <div>
          <input type="text" 
          className="inputText" 
          ref={inputRef} // Associe le ref à cet input
          
          />
        </div>
        
        </>

  )
}
