import logo from './logo.svg';
import React from "react";
import ReactDOM from 'react-dom';
import { LoginForm } from "./LoginForm";

// Bootstrap
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Row, Col } from "react-bootstrap";

// Custom CSS
import './App.css';

import * as Realm from "realm-web";
// Add your App ID
const app = new Realm.App({id: "myiot-sxwcb"});

// Gets a valid Realm user access token to authenticate requests
async function getValidAccessToken() {
  // Guarantee that there's a logged in user with a valid access token
  if (!app.currentUser) {
    console.log("Error: No CurrentUser!");
  } else {
    // An already logged in user's access token might be stale. To guarantee that the token is
    // valid, we refresh the user's custom data which also refreshes their access token.
    await app.currentUser.refreshCustomData();
  }
  return app.currentUser.accessToken;
}

function App(props) {
  // Keep the logged in Realm user in local state. This lets the app re-render
  // whenever the current user changes (e.g. logs in or logs out).
  const [user, setUser] = React.useState(app.currentUser);

  // Conditional Rendering ->> https://reactjs.org/docs/conditional-rendering.html

  return (
    <div className="App">
       <h1 id="headerTitle">Login</h1>
        <LoginForm app={app} setUser={setUser} />
        
    
    </div>
  );
}

export default App;