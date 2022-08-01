import Question from "./Question"
import Option from "./Option"
import { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import Results from "./Results";
function Quiz() {
    let intervalId;
    let timeoutId;
    let navigate = useNavigate()
    let questions = [
        {
            question: "In the episode titled 'Pegasus', the Galactica discovers that they are not the only Battlestar left after all. Who is the commander of the Battlestar Pegasus?",
            answer: [{ text: "Admiral Cain", isCorrect: true }, { text: "Admiral Forbes", isCorrect: false }, { text: "Commander Cain", isCorrect: false }, { text: "Commander Forbes", isCorrect: false }]
        },
        {
            question: "Who eventually kills the commander of the Pegasus?",
            answer: [{ text: "Gaius", isCorrect: false }, { text: "Gina", isCorrect: true }, { text: "Starbuck", isCorrect: false }, { text: "Apollo", isCorrect: false }]
        },
        {
            question: "What member of the Galactica crew was eventually promoted to commander and placed in command of the Pegasus?",
            answer: [{ text: "Starbuck", isCorrect: false }, { text: "Helo", isCorrect: false }, { text: "Boomer", isCorrect: false }, { text: "Apollo", isCorrect: true }]
        },
        {
            question: "In the episode 'Scar', the Galactica is repeatedly attacked by a Cylon raider. The Galactica's Viper pilots are determined to destroy this raider that they have given the nickname Scar. Which Viper pilot eventually destroys Scar?",
            answer: [{ text: "Kat", isCorrect: true }, { text: "Apollo", isCorrect: false }, { text: "Starbuck", isCorrect: false }, { text: "Boomer", isCorrect: false }]
        },
        {
            question: "Commander Adama (later promoted to Admiral) is the commander of the Galactica. What is Adama's first name?",
            answer: [{ text: "William", isCorrect: true }, { text: "Creed", isCorrect: false }, { text: "Guias", isCorrect: false }, { text: "Apollo", isCorrect: false }]
        },
        {
            question: "President Roslin decides that she needs an artifact from Caprica to help find the way to Earth. She sends Starbuck on a mission, without Adama's permission, to retrieve it from a museum. What is the name of this artifact?",
            answer: [{ text: "Sword of Apollo", isCorrect: false }, { text: "Arrow of Apollo", isCorrect: true }, { text: "Arrow of Athena", isCorrect: false }, { text: "Sword of Athena", isCorrect: false }]
        },
        {
            question: "In the episode titled 'Final Cut', we meet reporter D'Anna Biers. She is allowed access to the Galactica to shoot a documentary on the crew. What secret do we learn about her at the end of this episode?",
            answer: [{ text: "She is a murderer", isCorrect: false }, { text: "She is a Cylon", isCorrect: true }, { text: "She is trying to kill Sharon", isCorrect: false }, { text: "She set a bomb on the Galactica", isCorrect: false }]
        },
        {
            question: "At the end of season 2, most of the human population moves to the planet of New Caprica. After a year, the Cylons arrive. What gave away the humans' location?",
            answer: [{ text: "Industrial Pollution", isCorrect: false }, { text: "Nuclear Radiation", isCorrect: true }, { text: "They picked up communication signals", isCorrect: false }, { text: "A Cylon Spy", isCorrect: false }]
        },
        {
            question: "According to Number 6, how many models of humanoid Cylons are there?",
            answer: [{ text: 14, isCorrect: false }, { text: 7, isCorrect: false }, { text: 12, isCorrect: true }, { text: 6, isCorrect: false }]
        },
        {
            question: "Helo and Sharon are the parents of the first Cylon/Human hybrid. Sharon was told that the baby died shortly after she was born, but the baby was actually given to a human mother to raise. What did Sharon name her baby?",
            answer: [{ text: "Aphrodite", isCorrect: false }, { text: "Hera", isCorrect: true }, { text: "Athena", isCorrect: false }, { text: " Artemis", isCorrect: false }]
        }
    ]
    let [selected, setSelected] = useState(null)
    let [currQuestion, setQuestion] = useState(0)
    let [currWidth, setWidth] = useState(100)
    let [score,setScore] = useState(0)
    let [ansArr ,setAnsArr] = useState([])
    function updateSelected(ele, i) {
        setTimeout(() => {
            updateQuestion(ele, i)
            setSelected(null)
        }, 1000)
        setSelected(i)
    }
    function updateQuestion(ele, i) {
        let tempArr = ansArr.slice()
        console.log("here")
        setWidth(100)
        if(typeof(ele)!=="undefined"&&ele.isCorrect){
         setScore(score+1)
         tempArr.push(ele)
        }
        else if(typeof(ele)==="undefined"){
            tempArr.push("Time ran out")
        }
        else {
            tempArr.push(ele)
        }
            let nextQuestion = currQuestion + 1
            setQuestion(nextQuestion)
            setAnsArr(tempArr)
            console.log(ansArr)
            if(nextQuestion>=questions.length){
                navigate("/results")
            }
    }
    useEffect(() => {
        if(currQuestion<questions.length){
            timeoutId = setTimeout(() => {
                updateQuestion()
                setWidth(100)
            }, 5500);
            intervalId = setInterval(() => {
                setWidth((currWidth) => currWidth - 5)
            }, 250)
            return () => {
                clearInterval(intervalId)
                clearTimeout(timeoutId)
            }
        }
    }, [currQuestion])
    return (
        <div className="quiz">
            <Routes>
                <Route path="/" element={
                currQuestion<questions.length&&
                <div className="card" >
                 <h1 className="score">Score :{score}</h1>
                <Question question={questions[currQuestion].question} className="question" />
                    <div className="options">
                        {questions[currQuestion].answer.map((ele, i) =>
                            <Option
                                click={() => { updateSelected(ele, i) }}
                                color={selected === i ? (ele.isCorrect ? "green" : "red") : null} value={ele.text}
                                key={i}
                            />
                        )}
                    </div>
                    <div className="bar-container">
                        <div className="bar" style={{ width: `${currWidth}%` }}></div>
                    </div>
                </div>
                } />
                <Route path="/results" element ={<Results question ={questions} score={score} answers ={ansArr}/>} />
            </Routes>
        </div>
    )
}
export default Quiz
//useeffect willl be usefull when we have to restart timer for next question
// it will depend on quetion change