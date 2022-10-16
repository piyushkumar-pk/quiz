import Head from "next/head";
import { useEffect, useState } from "react";
import QuizData from "../public/data/quiz.json";

export default function App() {
    const [userAnswer, setUserAnswer] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([]);
    const [answer, setAnswer] = useState("");
    const [id, setId] = useState("");
    const [quizEnd, setQuizEnd] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [startAssess, setStartAssess] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [nextButton, setNextButton] = useState(false);
    const [answerType, setAnswerType] = useState("");

    useEffect(() => {
        currentQuizQuestion();
        if (selectedAnswer && nextButton) {
            for (var i = 0; i < selectedAnswer.length; i++) {
                if (selectedAnswer[i].id === id) {
                    setUserAnswer(selectedAnswer[i].answer)
                    setDisabled(false);
                }
            }
        }
    }, [currentIndex, id]);


    const currentQuizQuestion = () => {
        setQuestion(QuizData[currentIndex].question);
        if (QuizData[currentIndex].type === "options" || QuizData[currentIndex].type === "image-options") {
            setOptions(QuizData[currentIndex].options);
        }
        setAnswer(QuizData[currentIndex].answer);
        setId(QuizData[currentIndex].id);
        setAnswerType(QuizData[currentIndex].type);
        setDisabled(true);
    };

    const nextQuizQuestion = () => {
        setCurrentIndex(currentIndex + 1);
        setUserAnswer(null);
    }


    const prevQuizQuestion = () => {
        setCurrentIndex(currentIndex - 1);
        setUserAnswer(null);
        setNextButton(true);
    }

    const checkAnswer = (as) => {
        if (selectedAnswer.length === 0) {
            if (as.toLowerCase() === answer.toLowerCase()) {
                setSelectedAnswer([...selectedAnswer, {
                    question: question,
                    answer: as,
                    correct: answer,
                    score: 1,
                    id: id,
                    type: answerType
                }]);
            } else if (as.toLowerCase() != answer.toLowerCase()) {
                setSelectedAnswer([...selectedAnswer, {
                    question: question,
                    answer: as,
                    correct: answer,
                    score: 0,
                    id: id,
                    type: answerType
                }]);
            }
        };

        for (var i = 0; i < selectedAnswer.length; i++) {
            if (selectedAnswer[i].question != question) {
                if (as.toLowerCase() === answer.toLowerCase()) {
                    setSelectedAnswer([...selectedAnswer, {
                        question: question,
                        answer: as,
                        correct: answer,
                        score: 1,
                        id: id,
                        type: answerType
                    }]);
                } else if (as.toLowerCase() != answer.toLowerCase()) {
                    setSelectedAnswer([...selectedAnswer, {
                        question: question,
                        answer: as,
                        correct: answer,
                        score: 0,
                        id: id,
                        type: answerType
                    }]);
                }
            } else if (selectedAnswer[i].question === question) {
                setSelectedAnswer(selectedAnswer.splice(i, 1));
                if (as.toLowerCase() === answer.toLowerCase()) {
                    setSelectedAnswer([...selectedAnswer, {
                        question: question,
                        answer: as,
                        correct: answer,
                        score: 1,
                        id: id,
                        type: answerType
                    }]);
                } else if (as.toLowerCase() != answer.toLowerCase()) {
                    setSelectedAnswer([...selectedAnswer, {
                        question: question,
                        answer: as,
                        correct: answer,
                        score: 0,
                        id: id,
                        type: answerType
                    }]);
                }
            }
        }
        setUserAnswer(as)
        setDisabled(false);
    };

    const finishHandler = () => {
        if (currentIndex === QuizData.length - 1) {
            setQuizEnd(true);
        }
    }

    const calculateScore = () => {
        var score = 0;
        for (var i = 0; i < selectedAnswer.length; i++) {
            score += Number(selectedAnswer[i].score)
        }
        return <span>{score}</span>
    };

    const correctImage = (s, image) => {
        var url = "";
        var name = "";
        for (var i = 0; i < QuizData.length; i++) {
            if (QuizData[i].id === s.id) {
                for (var j = 0; j < QuizData[i].options.length; j++) {
                    if (image === QuizData[i].options[j].id) {
                        url = QuizData[i].options[j].url;
                        name = QuizData[i].options[j].name;
                    }
                }
            }
        }
        return <img src={url} alt={name} style={{ width: "150px", padding: "5px" }} />
    }

    return (<>
        <Head>
            <title>Quiz</title>
        </Head>
        <div className="container mt-5">
            {
                startAssess ? (
                    quizEnd ? <div className="row" style={{ marginTop: "10%" }}>
                        <div className="col-lg-3 col-md-3 col-sm-12 col-12"></div>
                        <div className="card col-lg-6 col-md-8 col-sm-12 col-12 text-center" >
                            <h1 className="h4" style={{ paddingTop: "20%" }}>Congratulations !! You have completed the assessment</h1>
                            <p className="h5 mt-5" style={{ paddingBottom: "20%" }}>Your Score is {
                                calculateScore()
                            } / {QuizData.length}</p>
                        </div>

                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-12 col-12"></div>
                            <div className="col-lg-6 col-md-8 col-sm-12 col-12" >
                                {
                                    selectedAnswer && selectedAnswer.sort(function (a, b) { return a.id - b.id }).map((s, i) => (
                                        <div className="card mt-4 mb-3 " style={{ padding: '20px' }} key={i}>
                                            <h5>Q.{i + 1}.  {s.question}</h5>
                                            <p className="mt-3" style={{ margin: 0, color: s.score === 0 ? "red" : "green" }}>Your answer :-{s.type === "image-options" ? correctImage(s, s.answer) : s.answer}{s.score === 0 ? <span> X </span> : <span> ✓ </span>}</p>
                                            <p>Correct answer :- {s.type === "image-options" ? correctImage(s, s.correct) : s.correct}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                        : <div className="row">
                            <div className="col-lg-3 col-md-3 col-12"></div>
                            <div className="col-lg-6 col-md-8 col-sm-12 col-12 ">
                                <div className="card">
                                    <div className="card-header">
                                        <span>{`Question ${currentIndex + 1} of ${QuizData.length}`}</span>
                                        <br />
                                        <br />
                                        <p>
                                            <span style={{ margin: '10px' }}>{currentIndex + 1} .</span>  {question}
                                        </p>
                                    </div>
                                    <div className="card-body">
                                        {
                                            answerType && answerType === "options" ? <>
                                                {
                                                    options.map((o, i) => (
                                                        <div key={i}>
                                                            <span className="" style={{ margin: "10px" }}>{i + 1}.</span> <p className={userAnswer === o ? "btn btn-success" : "btn btn-outline-success"} onClick={(e) => checkAnswer(o)}>{o}</p>
                                                        </div>
                                                    ))
                                                }
                                            </> : ""}
                                        {
                                            answerType && answerType === "input" ?
                                                <>
                                                    <div>
                                                        <label>Please write your answer</label>
                                                        <br />
                                                        <input type={"text"} className="form-control mt-3" onChange={(e) => checkAnswer(e.target.value)} placeholder="Write your answer here.." />
                                                    </div>
                                                </> : ""
                                        }
                                        {
                                            answerType && answerType === "image-options" ?
                                                <>
                                                    <div>
                                                        <label>Please select the correct image</label>
                                                        <br />
                                                        {
                                                            options.map((o, i) => (
                                                                <div key={i}>
                                                                    <span className="" style={{ margin: "10px" }}>{i + 1}.</span> <p className={userAnswer === o.id ? "btn btn-success" : "btn btn-outline-success"} onClick={(e) => checkAnswer(o.id)}><img src={o.url} alt={o.name} style={{ width: "150px" }} /></p>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                </> : ""
                                        }
                                    </div>
                                    <div className="card-body text-center" >
                                        {
                                            currentIndex > 0 && currentIndex < QuizData.length &&
                                            <button
                                                className="btn btn-primary "
                                                onClick={prevQuizQuestion}
                                                style={{ width: "30%" }}
                                            >Prev</button>
                                        }

                                        {
                                            currentIndex < QuizData.length - 1 &&
                                            <button
                                                disabled={disabled}
                                                className="btn btn-primary ml-5"
                                                onClick={nextQuizQuestion}
                                                style={{ width: "30%", marginLeft: '10px' }}
                                            >Next</button>
                                        }
                                        {
                                            currentIndex === QuizData.length - 1 &&

                                            <button className="btn-success btn"
                                                disabled={disabled}
                                                onClick={finishHandler}
                                                style={{ width: "30%", marginLeft: '10px' }}
                                            >
                                                Finish Quiz
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                )
                    :
                    <div>
                        <h2>Participate in  little Assessment.</h2>
                        <button className="btn btn-primary mt-5" onClick={() => setStartAssess(true)}>Take Assessment</button>
                    </div>
            }
        </div>
    </>)
}