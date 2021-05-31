import './_App.scss';
import Main from './screen/main/Main';
import LoginScreen from "./screen/loginScreen/LoginScreen"
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import WatchScreen from './screen/watchScreen/WatchScreen';
import SearchScreen from './screen/searchScreen/SearchScreen';
import Subcription from './screen/subcriptionScreen/Subcription';


function App() {
  const { accessToken, loading } = useSelector(state => state.auth)
  const history = useHistory();
  useEffect(() => {
    if (loading === false && accessToken === null) {
      history.push("/login")
    }
  })
  return (
    <>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/feed/subcription" component={Subcription} />
        <Route exact path="/search/:topic" component={SearchScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/watch/:id" component={WatchScreen} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
