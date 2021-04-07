import React ,{lazy} from 'react';
import Quiz from './quizSearcher/QuizSearch'
import ChooseQuiz from './quizSearcher/ChooseQuiz'


const Routes =[
 {
    path: '/',
    sidebarName: 'Quiz',
    component: Quiz
  },

  {
    path: '/ChooseQuiz',
    sidebarName: 'Quiz',
    component: ChooseQuiz
  },
  
  
]

export default Routes;