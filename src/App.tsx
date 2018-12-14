import React, { Component } from "react";
import AllCoinsList from "./Components/AllCoins/AllCoinsList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route } from "react-router";
import Callback from "./Commons/Callback";
import Auth from "./Libs/Auth";
import Nav from "./Layout/Nav";
import AuthContext from "./Commons/AuthContext";

interface IState {
  auth?: Auth;
  tokenRenewalComplete: boolean;
}
class App extends Component<any> {
  state = {
    tokenRenewalComplete: false
  } as IState;
  constructor(props: any) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history),
      tokenRenewalComplete: false
    } as IState;
  }

  render() {
    const { auth } = this.state;
    const { Provider, Consumer } = AuthContext;
    return (
      // <div className="container">
      //   <header className="App-header">All Coins List</header>
      //   <AllCoinsList />
      // </div>

      <Provider value={auth}>
        <Nav auth={auth} />
        <div className="body">
          <Route path="/" exact render={props => <AllCoinsList {...props} />} />
          <Route path="/callback" render={props => <Callback auth={auth} {...props} />} />
          {/* <PrivateRoute path="/profile" component={Profile} />
          <Route path="/public" component={Public} />
          <PrivateRoute path="/private" component={Private} />
          <PrivateRoute path="/courses" component={Courses} scopes={["read:courses"]} /> */}
        </div>
      </Provider>
    );
  }
}

export default App;
