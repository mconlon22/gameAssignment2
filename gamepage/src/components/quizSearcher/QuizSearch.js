import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Subjects from './Subjects'
import { withRouter } from "react-router-dom";

class Quiz extends React.Component {
    state={
        subject:null
    }
    chooseSubject=(subjectName)=>{
        console.log(subjectName)
        this.props.history.push("/ChooseQuiz");
        window.localStorage.setItem('subject',subjectName)
        this.setState({subject:subjectName})
    }
    render() {
      return (
        <Grid container spacing={3}>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={8}>
        <Typography variant="h1" component="h2">Choose Subject</Typography>
        <List >
        {Subjects.map((subject) =>
          subject.usage === "Primary" ? (
            <ListItem
            key={subject.name}
            color="blue"
              button
              onClick={() => this.chooseSubject(subject.name)}

            >
              <ListItemText primary={subject.name} />
            </ListItem>
          ) : subject.usage === "Working" ? 
          <ListItem
              key={subject.name}
              onClick={() => this.chooseSubject(subject.name)}

              button
            >
              <ListItemText primary={subject.name} />
            </ListItem> :null
        )}
      </List>
      </Grid>
      <Grid item xs={2}>
        </Grid>

      </Grid>

      );
    }
  }
  export default withRouter(Quiz)