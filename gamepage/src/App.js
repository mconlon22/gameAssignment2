import logo from './logo.svg';
import './App.css';
import Quiz from './components/quizSearcher/QuizSearch'
import Routes from './components/Routes'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {

  const routeComponents = Routes.map(({path, component}, key) => <Route exact path={path} component={component} key={key} />);

  return (
    <div className="App">
      <Router>
     {routeComponents}
     </Router>
    </div>
  );
}

export default App;
