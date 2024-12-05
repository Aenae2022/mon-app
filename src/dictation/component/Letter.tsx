import React from "react"
import { useDrag } from "react-dnd"

function Letter({ letter }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "LETTER",
    item: { id: letter.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`letter ${isDragging ? "dragging" : ""}`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      {letter.content}
    </div>
  )
}

export default Letter
