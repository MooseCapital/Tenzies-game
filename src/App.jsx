import { useState, useEffect } from 'react'


import './App.css'
import Die from "./die.jsx";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";
// import Confetti from "react-confetti/src/Confetti.js";
function App() {

    function generateDie() {
        return {
                value: Math.floor(Math.random() * 6) + 1,
                isHeld: false,
                id: nanoid()
            }
    }

    function allNewDice() {
        const allDice = []
        for (let i = 0; i < 10; i++) {
            allDice.push(generateDie())
        }

        return allDice
    }
    const [dice, setDice] = useState(allNewDice());

    const dieElements = dice.map((Dice) => {
        return <Die value={Dice.value} isHeld={Dice.isHeld} key={Dice.id} holdDice={() => holdDice(Dice.id)} />
    })

    const [tenzies, setTenzies] = useState(false);
    useEffect(() => {
       const allHeld =  dice.every((die) => die.isHeld);
       const firstValue = dice[0].value;
       const allMatch = dice.every((die) => die.value === firstValue);
        if (allHeld && allMatch) {
            setTenzies(true);

        }
    }, [dice])

    function rollDice() {
        if (tenzies) {
            setDice(allNewDice())
            setTenzies(false)
        } else {
            setDice(prevDice => prevDice.map((item) => {
            return item.isHeld ? item : generateDie() ;
            }))
        }

    }

    function holdDice(id) {
        setDice(prevDice => {
         return  prevDice.map(item => {
                return item.id === id ? {...item, isHeld: !item.isHeld} : {...item};

            })
        })


    }

    return (
    <div id="App">
        <main>
            <h1>Tenzies</h1>
            <div className="description">Roll until all dice are the same. Click each die to
            freeze it at its current value between rolls</div>
            <div className="Die-container">
                {dieElements}


            </div>
            <button id={"roll"} onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
            {tenzies && <Confetti width="2000" height="1500" />}
        </main>
    </div>
  )
}

export default App
