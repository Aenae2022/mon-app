

import "../../css/exercice/exercice.css"

export default function Exercise({ children, nextExercise, onValidate, onRetry, onNext, status,  }) {
  

  const newTarget = () => {
    if (status === "working") {
      return (
        <input
          className="buttonExercise"
          type="button"
          value="Valider"
          onClick={onValidate}
          
        />
      )
    } else if (status === "nope") {
      return (
        <>
          <img
            className="imgExercise"
            src="/asset/picture/icons/faux.png"
            alt="erreur"
          />
          <br />
          <input
            className="buttonExercise"
            type="button"
            value="recommencer"
            onClick={onRetry}
          />
        </>
      )
    } else {
      return (
        <>
          <img
            className="imgExercise"
            src="/asset/picture/icons/vrai.png"
            alt="bonne réponse"
          />
          <br />
          <input
            className="buttonExercise"
            type="button"
            value="recommencer"
            onClick={onRetry}
          />
          <input
            className="buttonExercise"
            type="button"
            value={nextExercise === 0 ? "Terminer" : "Suivant"}
            onClick={onNext}
          />
        </>
      )
    }
  }

  return (
    <div className="exercise">
      
      {children}
      <div className="exerciseNav">{newTarget()}</div>
    </div>
  )
}
