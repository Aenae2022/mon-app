import "../../App.css"
import ExerciseType2 from "../../components/dictation/ExerciseType2"
import { useParams } from "react-router"
import React, { Component, useState } from "react"
import initialData from "../../config/datas"
import TitleExercise from "../../components/dictation/TitleExercise"

function App() {
  const [datas, setDatas] = useState(initialData)
  
  let { exercice } = useParams()
  console.log('let exercice : ' + exercice)
  if (exercice) {
    console.log('nb exercices : ' + Object.keys(datas.exercises).length)
    console.log(exercice)
    const titleExercise = {
      title: 'Apprendre un mot',
      subtitle: 'étape ' + exercice +'/'+ Object.keys(datas.exercises).length,
    }
    
    const componentName = datas.exercises['exercice-'+exercice].component;
    let component;
    if(componentName === 'ExerciseType2'){
       component = <ExerciseType2 datas={datas} setDatas={setDatas}/>;

    }
    return (
      
      <div className="App">
        <TitleExercise text={titleExercise}/>
        {component}
        
      </div>
    )
  }
  else {
    console.log('chemin 2')
    return (
      <div className="App">
        coucou
      </div>
    )
  }
}

export default App
