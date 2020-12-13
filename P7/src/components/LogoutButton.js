import React from 'react';
import UserStore from "../stores/UserStore";
import {Button} from "react-bootstrap";

class LogoutButton extends React.Component {

    doLogout() {
        fetch('http://localhost:3000/logout', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(result){
                if (result && result.success) { // Deal with the result of the request
                    UserStore.isLoggedIn = false
                    UserStore.username = ''
                }
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    render() {
        return (
            <div className="inputField">
                <Button variant="light"
                    className={this.props.class}
                    disabled={this.props.disabled}
                    onClick={ () => this.doLogout() }>
                    Log out
                </Button>
            </div>
        )
    }
}

export default LogoutButton;
