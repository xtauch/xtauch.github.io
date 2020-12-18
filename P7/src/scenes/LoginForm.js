import React from 'react';
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import UserStore from "../stores/UserStore";
import { Redirect } from 'react-router';
import {observer} from "mobx-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row, Image} from "react-bootstrap";

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
            buttonDisabled: false
        })
    }

    doLogin() {
        // Si Username ou Password non renseigné alors on ne fait rien
        if (!this.state.username || !this.state.password) {
            return
        }

        this.setState({
            buttonDisabled: true
        })

       fetch('http://localhost:3000/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            }).then(function(result){
                   if (result && result.status === 200) {
                       return result.json()
                   }
            }).then(function(result){
                UserStore.isLoggedIn = true
                UserStore.username = result.username
                this.resetForm()
            }.bind(this))
                .catch(function(error) {
                    this.resetForm()
                    alert("L'utilisateur et le mot de passe ne correspondent à aucun utilisateur dans la base de donnée")
                }.bind(this))

    }

    doSignUp() {
        if (!this.state.username || !this.state.password) {
            return
        }

        this.setState({
            buttonDisabled: true
        })

        fetch('http://localhost:3000/signup', {
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
            .then(function(result){
                if (result && result.status === 200) {
                    return result.json()
                }
            }).then(function(result){
            UserStore.isLoggedIn = true
            UserStore.username = result.username
            this.resetForm()
        }.bind(this))
            .catch(function(error) {
                this.resetForm()
                alert(error)
            }.bind(this))
    }

    render() {
        if(UserStore.isLoggedIn === true) {
            return <Redirect to={"/home"} />
        } else {
        return (
            <Container fluid className={"bg-dark h-100"}>
                <Row className={"my-0"}>
                    <Col className={"col-4"}>
                    </Col>
                    <Col className={"col-4"}>
                        <Image src={require('../img/icon-left-font-monochrome-white.png')} fluid/>
                    </Col>
                    <Col className={"col-4"}>
                    </Col>
                </Row>

                <Row>
                    <Col className={"col-4"}>
                    </Col>
                    <Col className={"col-4"} >
                        <InputField
                            type='text'
                            className={"input"}
                            placeholder='Username'
                            value={this.state.username ? this.state.username : ''}
                            onChange={ (val) => this.setInputValue('username', val) }
                        />

                        <InputField
                            type='password'
                            className={"input"}
                            placeholder='Password'
                            value={this.state.password ? this.state.password : ''}
                            onChange={ (val) => this.setInputValue('password', val) }
                        />
                    </Col>
                    <Col className={"col-4"}>
                    </Col>
                </Row>

                <Row>
                    <Col className={"col-4"}>
                    </Col>
                    <Col className={"col-4"}>
                        <SubmitButton
                            text='Login'
                            disabled={this.state.buttonDisabled}
                            onClick={ () => this.doLogin()}
                        />

                        <SubmitButton
                            text='Sign In'
                            disabled={this.state.buttonDisabled}
                            onClick={ () => this.doSignUp()}
                        />

                    </Col>
                    <Col className={"col-4"}>
                    </Col>
                </Row>
            </Container>
            )
        }
    }
}



export default observer(LoginForm);
