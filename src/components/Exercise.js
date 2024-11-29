import React, { useState, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LettersBox from "./LettersBox";
import initialData from "../config/datas";

export default function Exercise() {
    const [datas, setDatas] = useState(initialData);
    const [result, setResult] = useState(null);
    
    const handleDrop = (item, targetBoxId, targetIndex) => {

        setDatas((prevDatas) => {

            const sourceBoxId = Object.keys(prevDatas.lettersBox).find((boxId) =>
            prevDatas.lettersBox[boxId].letterIds.includes(item.id)
            );
            
            
            const newSourceBoxIds = prevDatas.lettersBox[sourceBoxId].letterIds.filter(
                (letterId) => letterId !== item.id);
                
            //si déplacement intra lettersBox
            if(sourceBoxId === targetBoxId){
                const nextSourceBoxIds = [
                        // Éléments avant le point d’insertion :
                        ...newSourceBoxIds.slice(0, targetIndex),
                        // Nouvel élément :
                        item.id,
                        // Éléments après le point d’insertion :
                        ...newSourceBoxIds.slice(targetIndex)
                    ];
                
                return {
                    ...prevDatas,
                    lettersBox: {
                        ...prevDatas.lettersBox,
                        [sourceBoxId]: {
                            ...prevDatas.lettersBox[sourceBoxId],
                            letterIds:nextSourceBoxIds
                        },
                    }
                }
            }
            else { //déplacement inter lettersBox
                const newTargetBoxIds = prevDatas.lettersBox[targetBoxId].letterIds;
                const nextTargetBoxIds = [
                    // Éléments avant le point d’insertion :
                    ...newTargetBoxIds.slice(0, targetIndex),
                    // Nouvel élément :
                    item.id,
                    // Éléments après le point d’insertion :
                    ...newTargetBoxIds.slice(targetIndex)
                ];
                const nextDatas = {...prevDatas,
                lettersBox: {
                    ...prevDatas.lettersBox,
                    [sourceBoxId]: {
                        ...prevDatas.lettersBox[sourceBoxId],
                        letterIds: newSourceBoxIds
                    },
                    [targetBoxId]: {
                        ...prevDatas.lettersBox[targetBoxId],
                        letterIds:nextTargetBoxIds
                    },
                }}
                console.log("setDatas : ", nextDatas);
                
                return {
                    ...prevDatas,
                    lettersBox: {
                        ...prevDatas.lettersBox,
                        [sourceBoxId]: {
                            ...prevDatas.lettersBox[sourceBoxId],
                            letterIds: newSourceBoxIds
                        },
                        [targetBoxId]: {
                            ...prevDatas.lettersBox[targetBoxId],
                            letterIds:nextTargetBoxIds
                        },
                    }
                }
            }
        });

    };

    const handleClick = () => {
        console.log('toto');
        const studentAnswer = datas.lettersBox['letterBox-2'].letterIds.map(lId =>{
            return datas.letters[lId].content;
        });
        console.log('studentAnswer : ' + studentAnswer);

    }

    console.log('datas : ', datas);
   
    return (
        <DndProvider backend={HTML5Backend}>
        <div className="exercise">
            {datas.lettersBoxOrder.map((letterBoxId) => {
                const letterBox = datas.lettersBox[letterBoxId];
                const letters = letterBox.letterIds.map(
                    (letterId) => datas.letters[letterId]
                );
                console.log('letters du ' + letterBox.id, letters);
                return (
                    <LettersBox
                    key={letterBox.id}
                    letterBox={letterBox}
                    letters={letters}
                    onDrop={handleDrop}
                    />
                );
            })}
            <input type="button" value="valider" onClick={handleClick} />
        </div>
        </DndProvider>
        
    );
}
