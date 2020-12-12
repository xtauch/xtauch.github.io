import React from 'react';
import UserStore from "../stores/UserStore";
import {Button} from "react-bootstrap";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class DeleteAccountButton extends React.Component {

    deleteAccount() {
        fetch('http://localhost:3000/deleteAccount', {
            method: 'delete',
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

    deleteConfirm() {
        confirmAlert({
            title: 'Account delete',
            message: 'Are you sure you want to delete your account ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteAccount()
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        })
    }

    render() {
        return (
            <div className="inputField">
                <Button variant="light"
                    className='btn'
                    disabled={this.props.disabled}
                    onClick={ () => this.deleteConfirm() }>
                    Delete account
                </Button>
            </div>
        )
    }
}



export default DeleteAccountButton;
