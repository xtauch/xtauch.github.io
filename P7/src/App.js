import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { observer } from "mobx-react";
import UserStore from "./stores/UserStore";
import './App.css';
import Home from "./scenes/Home";
import LoginForm from "./scenes/LoginForm";
import UploadForm from "./scenes/UploadForm";
import CommentForm from "./scenes/CommentForm";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            image: '',
            titre: '',
            buttonDisabled: false // To prevent spam
        }
    }


    /*
    render() {

        if (UserStore.loading) {
            return (
                <div className="app">
                    <div className="container">
                        Loading, please wait..
                    </div>
                </div>
            )
        }
    */

    render()  {
        return  (
            <BrowserRouter>
                <Route exact path="/home" component={Home} />
                <Route path="/upload" component={UploadForm} />
                <Route path="/login" component={LoginForm} />
                <Route path="/comment" component={CommentForm} />
            </BrowserRouter>
        )
    }
}

export default observer(App); // So the App listen to changes
