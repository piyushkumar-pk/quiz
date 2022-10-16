import Head from "next/head";
import { useEffect, useState } from "react";
import QuizData from "../public/data/quiz.json";

export default function App() {
    const [userAnswer, setUserAnswer] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([]);
    const [answer, setAnswer] = useState("");
    const [quizEnd, setQuizEnd] = useState(false);
    const [userScore, setUserScore] = useState(0);
    const [disabled, setDisabled] = useState(true);
    const [startAssess, setStartAssess] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState([]);

    useEffect(() => {
        currentQuizQuestion();
    }, [currentIndex])

    const currentQuizQuestion = () => {
        setQuestion(QuizData[currentIndex].question);
        setOptions(QuizData[currentIndex].options);
        setAnswer(QuizData[currentIndex].answer);
        setDisabled(true);
    };

    const nextQuizQuestion = () => {
        setCurrentIndex(currentIndex + 1);
        setUserAnswer(null);
    }

    const prevQuizQuestion = () => {
        setUserAnswer(null);
        setCurrentIndex(currentIndex - 1);
        for (var i =0; i < selectedAnswer.length ;  i ++) {
            if(selectedAnswer[i].question === question ){
                console.log(selectedAnswer[i],question,userAnswer,'SED')
                setUserAnswer(selectedAnswer[i].answer)
            }
        }
    }

    const checkAnswer = (as) => {
        if (selectedAnswer.length === 0) {
            if (as === answer) {
                setSelectedAnswer([...selectedAnswer, {
                    question: question,
                    answer: as,
                    correct: answer,
                    score: 1
                }]);
            } else if (as != answer) {
                setSelectedAnswer([...selectedAnswer, {
                    question: question,
                    answer: as,
                    correct: answer,
                    score: 0
                }]);
            }
        };

        for (var i = 0; i < selectedAnswer.length; i++) {
            if (selectedAnswer[i].question != question) {
                if (as === answer) {
                    setSelectedAnswer([...selectedAnswer, {
                        question: question,
                        answer: as,
                        correct: answer,
                        score: 1
                    }]);
                } else if (as != answer) {
                    setSelectedAnswer([...selectedAnswer, {
                        question: question,
                        answer: as,
                        correct: answer,
                        score: 0
                    }]);
                }
            } else if (selectedAnswer[i].question === question) {
                setSelectedAnswer(selectedAnswer.splice(i, 1));
                if (as === answer) {
                    setSelectedAnswer([...selectedAnswer, {
                        question: question,
                        answer: as,
                        correct: answer,
                        score: 1
                    }]);
                } else if (as != answer) {
                    setSelectedAnswer([...selectedAnswer, {
                        question: question,
                        answer: as,
                        correct: answer,
                        score: 0
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

    return (<>
        <Head>
            <title>Quiz</title>
        </Head>
        {console.log(selectedAnswer, "SE")}
        <div className="container mt-5">
            {
                startAssess ? <>
                    {
                        quizEnd ?
                            <div className="row" style={{ marginTop: "10%" }}>
                                <div className="col-lg-3 col-md-3 col-sm-12 col-12"></div>
                                <div className="card col-lg-6 col-md-8 col-sm-12 col-12 text-center" >
                                    <h1 className="h4" style={{ paddingTop: "20%" }}>Congratulations !! You have completed the assessment</h1>
                                    <p className="h5 mt-5" style={{ paddingBottom: "20%" }}>Your Score is {userScore} / {QuizData.length}</p>
                                </div>

                                <div className="row">
                                    <div className="col-lg-3 col-md-3 col-sm-12 col-12"></div>
                                    <div className="col-lg-6 col-md-8 col-sm-12 col-12">
                                        <div className="">
                                            {
                                                QuizData.map((q, i) => (
                                                    <div className="card mb-3 mt-3" style={{ padding: '15px' }} key={i}>
                                                        <h5>{i + 1}. {q.question}</h5>
                                                        <p>Answer: {q.answer}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="row">
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
                                                options.map((o, i) => (
                                                    <div key={o}>
                                                        <span className="" style={{ margin: "10px" }}>{i + 1}.</span> <p className={userAnswer === o ? "btn btn-success" : "btn btn-outline-success"} onClick={(e) => checkAnswer(o)}>{o}</p>
                                                    </div>
                                                ))
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
                                                <div>
                                                    <button className="btn-success btn"
                                                        disabled={disabled}
                                                        onClick={finishHandler}
                                                        style={{ width: "30%", marginLeft: '10px' }}
                                                    >
                                                        Finish Quiz
                                                    </button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </> : <div>
                    <h2>Participate in Assessment</h2>
                    <button className="btn btn-primary mt-5" onClick={() => setStartAssess(true)}>Take Assessment</button>
                </div>


            }

        </div>
    </>
    )
};