const initialData = {
    letters: {
      "letter-1": { id: "letter-1", content: "b" },
      "letter-2": { id: "letter-2", content: "o" },
      "letter-3": { id: "letter-3", content: "n" },
      "letter-4": { id: "letter-4", content: "j" },
      "letter-5": { id: "letter-5", content: "o" },
      "letter-6": { id: "letter-6", content: "u" },
      "letter-7": { id: "letter-7", content: "r" },
      "letter-8": { id: "letter-8", content: "s" },
    },
    lettersBox: {
      "letterBox-1": {
        id: "letterBox-1",
        title: "Lettres proposées",
        letterIds: ["letter-1", "letter-3", "letter-5", "letter-7","letter-8", "letter-6", "letter-4", "letter-2"],
      },
      "letterBox-2": {
        id: "letterBox-2",
        title: "Réponse",
        letterIds: [],
      },
      
    },
    // Pour mieux organiser nos futures colonnes
    lettersBoxOrder: ["letterBox-1", "letterBox-2"],
    answer:['b','o','n','j','o','u','r'],
  }
  
  export default initialData