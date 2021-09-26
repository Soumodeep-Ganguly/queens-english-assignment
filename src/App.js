import React,{ useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import './App.css';
import Question from './components/Question';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

function App() {
  const [question, setQuestion] = useState(null)
  const [answer, setAnswer] = useState("")
  const [count, setCount] = useState(0)
  const [isStarted, setIsStarted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getQuestion = () => {
    setIsLoading(true);
    axios.get('https://jservice.io/api/random')
    .then(response => {
      setIsStarted(true);
        if(response.data.question === ""){
            getQuestion();
        }else{
            setIsLoading(false);
            setQuestion(response.data)
            setAnswer("")
            setCount(count + 1);
        }
    }).catch(err => {
        setIsLoading(false);
        Toast.fire({
            icon: 'error',
            title: "Unable To Get Question"
        })
    });
  }

  const handleStartQuiz = () => {
      getQuestion();
  }
  
  return (
    <div className="App mt-5">
      <h1>
        Trivia Game
      </h1>
      {(!isLoading && !isStarted)&&<button className="btn btn-success" onClick={() => handleStartQuiz()}>Start Test</button>}
      {(isLoading && !isStarted)&&<button className="btn btn-success" disabled><i className="fas fa-spinner fa-spin mr-1"></i> Starting Test</button>}
      <Question 
        count={count}
        setAnswer={setAnswer}
        question={question}
        answer={answer}
        getQuestion={getQuestion}
        Toast={Toast}
      />
    </div>
  );
}

export default App;
