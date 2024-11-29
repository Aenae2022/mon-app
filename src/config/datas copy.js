const initialData = {
    letters: {
      "letter-1": { id: "letter-1", content: "b" },
      "letter-2": { id: "letter-2", content: "o" },
      "letter-3": { id: "letter-3", content: "n" },
      "letter-4": { id: "letter-4", content: "j" },
    },
    lettersBox: {
      "letterBox-1": {
        id: "letterBox-1",
        title: "Lettres proposées",
        letterIds: ["letter-1", "letter-2", "letter-3", "letter-4"],
      },
      "letterBox-2": {
        id: "letterBox-2",
        title: "Réponse",
        letterIds: [],
      },
      
    },
    // Pour mieux organiser nos futures colonnes
    lettersBoxOrder: ["letterBox-1", "letterBox-2"],
  }
  
  export default initialData