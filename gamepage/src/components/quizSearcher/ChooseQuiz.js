import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Subjects from './Subjects'
import { withRouter } from "react-router-dom";
import axios from 'axios'
import { Button, Divider } from '@material-ui/core';
class ChooseQuiz extends React.Component {
    state={
        quizs:null,
        quizId:null
    }
    componentDidMount=()=>{
        const subject = window.localStorage.getItem('subject')
        console.log('subject')

        console.log(subject)
        axios.get('http://0.0.0.0:85/getQuizs', {
            params: {
              subject:subject
            }
          }).then((res)=>{
              console.log(res.data)
              this.setState({quizs:res.data})
          });
    }
    chooseQuiz=(QuizId)=>{
        console.log(QuizId)
        axios.get('http://0.0.0.0:85/getQuizQuestions', {
            params: {
              id:QuizId
            }
          }).then((res)=>{
              console.log(JSON.stringify(res.data))
              window.localStorage.setItem('Questions',JSON.stringify(res.data))
              this.props.history.push("/playQuiz");


          });


    }
   
    render() {
      return (
        <Grid container spacing={3}>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={8}>
        <Typography variant="h1" component="h2">{window.localStorage.getItem('subject')} Quizs</Typography>
        { this.state.quizs!=null?this.state.quizs.map((quiz)=>{
               return (
                <ListItem
                   key={quiz.id}
              onClick={() => this.chooseQuiz(quiz.id)}

              button
              >{quiz.title}
              <Button  variant="contained" color="primary" onClick={() => this.viewQuestions(quiz.id)}>View Questions</Button>
                </ListItem>)
            }):<div></div>}
        </Grid>

      <Grid item xs={2}>
        </Grid>

      </Grid>

      );
    }
  }
  export default withRouter(ChooseQuiz)