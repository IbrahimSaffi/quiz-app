function Results(props) {
    return (
    <div className="results">
        <h1>Total Score :{props.score}</h1>
    <div className="row">
        <h2>Questions</h2>
        <h2>Correct Answers</h2>
        <h2>Your Answers</h2>
     </div>
     {props.question.map((ele,i)=>{
         return <div className="row">
         <h3>{ele.question}</h3>
         {ele.answer.map(ans=>{
            if(ans.isCorrect){
                return <h3>{ans.text}</h3>
            }
            else {
                return null
            }
         })}
        
         <h3 style={{backgroundColor:`${props.answers[i]==="Time ran out"||!props.answers[i].isCorrect?"red":"green"}`}} >{props.answers[i].text}</h3>
      </div>
     })}
    </div>)
}
export default Results