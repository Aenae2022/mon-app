import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import "../../css/exercice/dictation/exercice.css"
import "../../css/exercice/dictation/listWords.css"
import SoundButton from "./SoundButton"
import { cleanString, shuffleArray } from "../../config/utilitaires"



export default function ListWords({ listWords , cibleSrc, indexList}) {
    let navigate = useNavigate()
    const [indiceWord, setIndiceWord]=useState(0)
  const shuffledListWords = shuffleArray([...listWords])
  
  const [wordsDatas, setWordsDatas] = useState(shuffledListWords)
  const inputRef = useRef()
  const [status, setStatus] = useState('working')
  const [cible, setCible] = useState(cibleSrc)
  const nextWord = (indiceWord + 1 < wordsDatas.length)?true:false;
  
  const newTarget = () => {
    if (status === "working") {
      return (
        <input
          className="buttonExercise"
          type="button"
          value="Valider"
          onClick={handleClickValidate}
        />
      )
    } else  {

        if(nextWord){
            return (
                <>
                  <img
                    className="imgExercise"
                    src={status === 'nope'?"/asset/picture/icons/faux.png":"/asset/picture/icons/vrai.png"}
                    alt="résultat"
                  />
                  <br />
                  <input
                    className="buttonExercise"
                    type="button"
                    value="suivant"
                    onClick={handleClickNext}
                  />
                  <input
                    className="buttonExercise"
                    type="button"
                    value="stop"
                    onClick={handleClickStop}
                  />
                </>
              )
        }
        else {
            return (
                <>
                  <img
                    className="imgExercise"
                    src={status === 'nope'?"/asset/picture/icons/faux.png":"/asset/picture/icons/vrai.png"}
                    alt="résultat"
                  />
                  <br />
                  <input
                    className="buttonExercise"
                    type="button"
                    value="fin"
                    onClick={handleClickStop}
                  />
                </>
              )
        }
      
    } 
  }

  function handleClickValidate(){
    const userInput = inputRef.current.value;
    const cleanedInput = cleanString(userInput); // Nettoie la chaîne

    if (cleanedInput === wordsDatas[indiceWord].word) {
      setStatus(()=>{
        setWordsDatas((prevWordsDatas) => {
            // Créez une copie de l'ancien tableau
            const updatedWordsDatas = [...prevWordsDatas];
            
            // Créez une copie de l'objet word que vous voulez mettre à jour
            const updatedWord = { ...updatedWordsDatas[indiceWord] };
            
            // Mettez à jour la propriété test de l'objet word
            updatedWord.test = 'ok';
            
            // Remplacez l'objet dans le tableau copié
            updatedWordsDatas[indiceWord] = updatedWord;
            
            // Retournez le tableau mis à jour
            return updatedWordsDatas;
          });

        return "ok"})
    } else {
      setStatus(()=>{
        setWordsDatas((prevWordsDatas) => {
            // Créez une copie de l'ancien tableau
            const updatedWordsDatas = [...prevWordsDatas];
            
            // Créez une copie de l'objet word que vous voulez mettre à jour
            const updatedWord = { ...updatedWordsDatas[indiceWord] };
            
            // Mettez à jour la propriété test de l'objet word
            updatedWord.test = 'nope';
            
            // Remplacez l'objet dans le tableau copié
            updatedWordsDatas[indiceWord] = updatedWord;
            
            // Retournez le tableau mis à jour
            return updatedWordsDatas;
          });
        return "nope"})
    }

  }

  function handleClickNext(){
    setIndiceWord(()=>{
        const nextIndice=indiceWord+1
        inputRef.current.value=''
        setStatus('working')
        return nextIndice
    });

  }

  function handleClickStop(){
    setCible('result')
  }

  function handleClickApprendre(w){
    const wordIndex = listWords.findIndex((obj) => obj.word === w.word);
    const redirectionWord = '/dictation/word/'+indexList+'/'+wordIndex+'/1';
    navigate(redirectionWord)
  }

  if(cible === 'test')
  {
    return (
        <>
            <h3>
                Ecris <SoundButton soundSrc={wordsDatas[indiceWord].audioSrc} />
            </h3>
            <div>
                <input
                type="text"
                className="inputText"
                ref={inputRef} // Associe le ref à cet input
                />
            </div>
            <div className="exerciseNav">{newTarget()}</div>
        </>
      )
  }
  else {
    return (<>
    
    <ul>{wordsDatas.map((w, i)=>{
        let myClassName='';
        let myContent = null;
        
        if(w.test !== 'ok'){
            if(w.test === 'nope') {
                myClassName='notLearn'
            }
            myContent =(<input
                className="chooseButton"
                type="button"
                value="Apprendre"
                onClick={()=> handleClickApprendre(w)}
              />)
        }
        else {
            myClassName='learn'
        }

        
        
        return (
        <li key={w.word} className={`wordInList ${myClassName}`}>{w.word} {myContent}</li>
    )})}





    </ul></>)
  }
  
}
