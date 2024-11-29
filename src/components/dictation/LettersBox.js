import React, { useState, useRef, useEffect } from "react";
import { useDrop } from "react-dnd";
import Letter from "./Letter";

function LettersBox({ letterBox, letters, onDrop }) {
  const [targetIndex, setTargetIndex] = useState(null);
  const containerRef = useRef(null); // Initialisation de la référence pour le conteneur
    const lettersRef = useRef(letters);

    //maj LettersRef à chaque maj de Letters
    useEffect(() =>{
        lettersRef.current = letters;
    }, [letters]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "LETTER",
    hover: (item, monitor) => {
      if (!containerRef.current) return; // Valide si le conteneur est attaché

      const offset = monitor.getClientOffset();
      if (!offset) return; // Vérifie que l'offset est défini
      // Utilise `requestAnimationFrame` pour attendre que le DOM se stabilise
      requestAnimationFrame(() => {
      const index = calculateTargetIndex(offset, lettersRef.current, containerRef);     
      if (targetIndex !== index || index === 0 || index === letters.length) {
        setTargetIndex(index);
      }
    });
       // Met à jour l'index cible
    },
    drop: (item, monitor) => {
        const offsetd = monitor.getClientOffset();
        if (!offsetd) return; // Vérifie que l'offset est défini
        const indexd = calculateTargetIndex(offsetd, lettersRef.current, containerRef);
        onDrop(item, letterBox.id, indexd); // Passe l'index cible au parent
        setTargetIndex(null); // Réinitialise après le drop
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const calculateTargetIndex = (offset) => {
  if (!containerRef.current) return 0;

  // Dimensions du conteneur
  const containerRect = containerRef.current.getBoundingClientRect();

  // Prendre en compte l'échelle actuelle
  const scaleX = containerRect.width / containerRef.current.offsetWidth;

  // Ajuster l'offset pour le scaling (si présent)
  const adjustedXOffset = (offset.x - containerRect.left) / scaleX;

  console.log("Container Rect:", containerRect);
  console.log("Offset x:", offset.x);
  console.log("Adjusted Offset X:", adjustedXOffset);

  // Parcourt les lettres pour trouver l'index cible
  const children = Array.from(containerRef.current.children);
  for (let i = 0; i < children.length; i++) {
    const letterRect = children[i].getBoundingClientRect();
    if (adjustedXOffset < letterRect.left + letterRect.width / 2 - containerRect.left) {
      return i;
    }
  }

  return children.length; // Si aucune correspondance, retourne à la fin
};


  return (
    <div className="lettersBox">
      <h2>{letterBox.title}</h2>
      <div
        ref={(node) => {
            drop(node);
            containerRef.current = node; // Attache `ref` au conteneur
          }}
          className={`lettersContainer ${isOver ? "active" : ""}`}
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
  );
}

export default LettersBox;
