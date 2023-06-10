import React, { useState } from 'react';
import './Checkpoint.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
const Checkpoint = () => {
    const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	return (
    <div>
    <div className=' lecture'>
            lecture:Name
    </div>
    <div className='coches'>
         <ul>
          	<li> Name: IHEB </li>
         	 <li>Email :IHEB@gmail.com </li>
         	 <li> Course: hatchay</li>
         </ul>
           </div>
           <div  className='body' style={{top:80}}>
		<div className='app' style={{marginTop:10,marginRight:50}}>
			{showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text' >{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section' >
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
      
        </div>
        <div style={{marginTop:30,marginLeft:50}}>
        <Stack direction="row" spacing={2} >
  
  <Button variant="contained" color='success' sx={{width:120}} >
  confirm
  </Button>
  <Button variant="outlined" color="error"  sx={{width:120}}  >
  rejected
  </Button>
</Stack></div>
        </div>

)}

export default Checkpoint;