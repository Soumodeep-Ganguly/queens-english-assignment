import React,{ useState } from "react";

const Question = ({ count, question, getQuestion, answer, setAnswer, Toast }) => {
    const [viewResult, setViewResult] = useState(false)

    const checkAnswers = () => {
        if(answer.trim() === ""){
            Toast.fire({
                icon: 'error',
                title: "Provide an answer"
            })
        }else{
            if(!viewResult){
                setViewResult(true);
            }else{
                nextQuestion()
            }
        }
    }

    const nextQuestion = () => {
        if(viewResult){
            setViewResult(false);
            getQuestion();
        }else{
            checkAnswers();
        }
    }

    return(
        <div>
            <div>
                {(question !== null)?
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8">
                            <div className="mt-5">{count + ". " +question[0].question}</div>
                            <div className="mt-3">
                                <input type="text" className="form-control" value={answer} onChange={(e) => setAnswer(e.target.value)}/>
                            </div>
                            {viewResult && <div className="mt-3">
                                {(question[0].answer.toLowerCase().replace(/[^a-zA-Z ]/g, "") === answer.toLowerCase())? 
                                    <span className="text-success">Correct Answer</span>
                                :
                                    <span className="text-danger">InCorrect Answer</span>
                                }
                            </div>}
                        </div>
                    </div>
                :null}
            </div>
            {(question !== null) ? 
                <div className="mt-4 row justify-content-center">
                    <div className="col-4 col-md-2">
                        <button className="btn btn-primary" onClick={() => checkAnswers()}>Submit</button>
                    </div>
                    <div className="col-6 col-md-2">
                        <button className="btn btn-secondary" onClick={() => nextQuestion()}>Next Question</button>
                    </div>
                </div>
            :null}
        </div>
    )
}

export default Question;