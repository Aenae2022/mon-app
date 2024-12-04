export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)) // Index aléatoire entre 0 et i
    ;[array[i], array[j]] = [array[j], array[i]] // Échange des éléments
  }
  return array
}

//supprime les espaces superflus dans un string
export function cleanString(str) {
  return str
    .trim() // Supprime les espaces au début et à la fin
    .replace(/\s+/g, " ") // Remplace les multiples espaces par un seul
}
