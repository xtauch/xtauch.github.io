import React from 'react';
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import UserStore from "./stores/UserStore";

class LoginForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            buttonDisabled: false // To prevent spam
        }
    }

    setInputValue(property, val) {
        val = val.trim()
        if (val.length > 12) {
            return
        }
        this.setState({
            [property]: val
        })
    }

    resetForm() {
        this.setState({
            username: '',
            password: '',
            buttonDisabled: 'false'
        })
    }

    doLogin() {

        if (!this.state.username || !this.state.password) {
            return
        }

        this.setState({
            buttonDisabled: true
        })

       fetch('/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })
                .then((resp) => resp.json()) // Transform the data into json
                .then(function(result){
                    if (result && result.success) {
                        UserStore.isLoggedIn = true
                        UserStore.username = result.username
                    }
                })
                .catch(function(error) {
                    //this.resetForm()
                    alert(error.msg)
                })

    }

    doSignIn() {
        if (!this.state.username || !this.state.password) {
            return
        }

        this.setState({
            buttonDisabled: true
        })

        fetch('http://localhost:3000/api/auth/signup', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(result){
                if (result && result.success) {
                    UserStore.isLoggedIn = true
                    UserStore.username = result.username
                }
            })
            .catch(function(error) {
                //this.resetForm()
                alert(error.msg)
            })
    }

    render() {
        return (
            <div className="loginForm">
                Log in
                <InputField
                    type='text'
                    placeholder='Username'
                    value={this.state.username ? this.state.username : ''}
                    onChange={ (val) => this.setInputValue('username', val) }
                />

                <InputField
                    type='password'
                    placeholder='Password'
                    value={this.state.password ? this.state.password : ''}
                    onChange={ (val) => this.setInputValue('password', val) }
                />

                <SubmitButton
                    text='Login'
                    disabled={this.state.buttonDisabled}
                    onClick={ () => this.doLogin()}
                />

                <SubmitButton
                    text='Sign In'
                    disabled={this.state.buttonDisabled}
                    onClick={ () => this.doSignIn()}
                />

            </div>
        )
    }
}



export default LoginForm;
