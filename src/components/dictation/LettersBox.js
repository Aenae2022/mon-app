import React, { useState, useRef, useEffect } from "react"
import { useDrop } from "react-dnd"
import Letter from "./Letter"
import "../../css/exercice/dictation/letterBox.css"

function LettersBox({ letterBox, letters, onDrop }) {
  const containerRef = useRef(null) // Initialisation de la référence pour le conteneur
  const [targetIndex, setTargetIndex] = useState(null)

  const calculateTargetIndex = (offset) => {
    if (!containerRef.current) return 0

    // Dimensions du conteneur
    const containerRect = containerRef.current.getBoundingClientRect()

    // Prendre en compte l'échelle actuelle
    const scaleX = containerRect.width / containerRef.current.offsetWidth

    // Ajuster l'offset pour le scaling (si présent)
    const adjustedXOffset = (offset.x - containerRect.left) / scaleX

    // Parcourt les lettres pour trouver l'index cible
    const children = Array.from(containerRef.current.children)
    for (let i = 0; i < children.length; i++) {
      const letterRect = children[i].getBoundingClientRect()
      if (
        adjustedXOffset <
        letterRect.left + letterRect.width / 2 - containerRect.left
      ) {
        return i
      }
    }
    return children.length // Si aucune correspondance, retourne à la fin
  }
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "LETTER",
    hover: (item, monitor) => {
      if (!containerRef.current) return // Valide si le conteneur est attaché

      const offset = monitor.getClientOffset()
      if (!offset) return // Vérifie que l'offset est défini
      // Utilise `requestAnimationFrame` pour attendre que le DOM se stabilise
      requestAnimationFrame(() => {
        const index = calculateTargetIndex(offset)
        if (targetIndex !== index) {
          setTargetIndex(index)
        }
      })
    },
    drop: (item, monitor) => {
      const offsetd = monitor.getClientOffset()
      if (!offsetd) return // Vérifie que l'offset est défini
      const indexd = calculateTargetIndex(offsetd)
      onDrop(item, letterBox.id, indexd) // Passe l'index cible au parent
      setTargetIndex(null) // Réinitialise après le drop*/
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))
  return (
    <div className="lettersBox">
      <h2>{letterBox.title}</h2>
      <div
        ref={(node) => {
          drop(node)
          containerRef.current = node // Attache `ref` au conteneur
        }}
        className={`lettersContainer ${isOver ? "active" : ""} ${letterBox.title === "Réponse" ? "reponse" : ""}`}
      >
        {letters.map((letter, index) => (
          <React.Fragment key={letter.id}>
            {isOver && targetIndex === index && <div className="placeholder" />}
            <Letter letter={letter} index={index} />
          </React.Fragment>
        ))}
        {isOver && targetIndex === letters.length && (
          <div className="placeholder" />
        )}
      </div>
    </div>
  )
}

export default LettersBox
