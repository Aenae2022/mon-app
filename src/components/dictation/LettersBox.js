import React, { useState, useRef } from "react"
import { useDrop } from "react-dnd"
import Letter from "./Letter"
import "../../css/exercice/dictation/letterBox.css"

function LettersBox({ letterBox, letters, onDrop }) {
  const containerRef = useRef(null)
  const [targetIndex, setTargetIndex] = useState(null)

  const calculateTargetIndex = (offset) => {
    if (!containerRef.current) return 0
    const containerRect = containerRef.current.getBoundingClientRect()
    const scaleX = containerRect.width / containerRef.current.offsetWidth
    const adjustedXOffset = (offset.x - containerRect.left) / scaleX
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
    return children.length
  }
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "LETTER",
    hover: (item, monitor) => {
      if (!containerRef.current) return
      const offset = monitor.getClientOffset()
      if (!offset) return
      requestAnimationFrame(() => {
        const index = calculateTargetIndex(offset)
        if (targetIndex !== index) {
          setTargetIndex(index)
        }
      })
    },
    drop: (item, monitor) => {
      const offsetd = monitor.getClientOffset()
      if (!offsetd) return
      const indexd = calculateTargetIndex(offsetd)
      onDrop(item, letterBox.id, indexd)
      setTargetIndex(null)
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
          containerRef.current = node
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
