import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { observer } from "mobx-react";
import './App.css';
import Home from "./scenes/Home";
import LoginForm from "./scenes/LoginForm";
import UploadForm from "./scenes/UploadForm";
import CommentForm from "./scenes/CommentForm";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

    constructor(props) {
        super(props)
    }

    render()  {
        return  (
            <BrowserRouter>
                <Route exact path="/home" component={Home} />
                <Route path="/upload" component={UploadForm} />
                <Route path="/" component={LoginForm} />
                <Route path="/comment" component={CommentForm} />
            </BrowserRouter>
        )
    }
}

export default observer(App); // So the App listen to changes
