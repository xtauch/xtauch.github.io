import React from 'react';
import SubmitButton from "../components/SubmitButton";
import LogoutButton from "../components/LogoutButton";
import UploadButton from "../components/UploadButton";
import UserStore from "../stores/UserStore";
import { Redirect } from 'react-router';
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import {Col, Container, Row, Image, FormText} from "react-bootstrap";
import DeleteAccountButton from "../components/DeleteAccountButton";

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            deleteButtonDisabled: true,
            buttonDisabled: false // To prevent spam
        }
    }

    componentDidMount() { // When component loaded check if user is logged in
        this.isLoggedIn()
    }

    isLoggedIn() {
        fetch('http://localhost:3000/isLoggedIn', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json()) // Transform the data into json
            .then(function(result){
                if (result && result.success) { // Deal with the result of the request
                    UserStore.loading = false
                    UserStore.isLoggedIn = true
                    UserStore.username = result.username
                    if (UserStore.username === "admin") {
                        this.setState({
                            deleteButtonDisabled: false
                        })
                    } else {
                        this.setState({
                            deleteButtonDisabled: true
                        })
                    }
                    this.getAllPosts()
                }
                else {
                    UserStore.loading = false
                    UserStore.isLoggedIn = false
                }
            }.bind(this))
            .catch(function(error) {
                UserStore.loading = false
                UserStore.isLoggedIn = false
            })
    }

    setSelectedResult(result) {
        UserStore.selectedPost = result
    }

    deletePost(id) {
        fetch('http://localhost:3000/deletePost', {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id : id,
                userId : UserStore.userId,
            })
        }).then(function(result){
            if (result) {
                this.getAllPosts()
                return result.json()
            }
        }.bind(this))
            .catch(function(error) {

            })
    }

    getAllPosts() {
        fetch('http://localhost:3000/getAllPosts', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(function(result){
                if (result && result.status === 200) {
                    return result.json()
                }
            })
            .then(function(result){
                UserStore.listOfPosts = []
                let deleteButtonClass;
                if (this.state.deleteButtonDisabled === false) {
                    deleteButtonClass = "visible"
                } else {
                    deleteButtonClass = "invisible"
                }
                for (let i = 0; i < result.listOfResult.length; i++) {
                    UserStore.listOfPosts.push(
                        <Container key={result.listOfResult[i].id}>
                            <div className="postsContainer">
                                <Row>
                                    <Col className={"h6"}>
                                        <FormText>{result.listOfResult[i].username} - </FormText>
                                        <FormText className={"h10"}>{result.listOfResult[i].postdate.slice(0, 10)}</FormText>
                                    </Col>
                                </Row>

                                <FormText>{result.listOfResult[i].titre}</FormText>

                                    <Row className={"my-0"}>
                                        <Col>
                                            <Image fluid alt="Gif" src = {Buffer.from(result.listOfResult[i].image).toString()}/>
                                        </Col>
                                    </Row>

                                <Link to="/comment">
                                    <SubmitButton
                                        text={"Comments"}
                                        disabled={false}
                                        onClick={ () => this.setSelectedResult(result.listOfResult[i]) }
                                    />
                                </Link>
                                <SubmitButton
                                    text={'Delete'}
                                    className={deleteButtonClass}
                                    disabled={this.state.deleteButtonDisabled}
                                    onClick={ () => this.deletePost(result.listOfResult[i].id) }
                                />
                            </div>
                        </Container>
                    )
                }
            }.bind(this))
            .catch(function(error) {
            })
    }

    render() {
        if (UserStore.isLoggedIn === false) {
            return <Redirect to={"/"} />
        } else {

            return (
                <div className="app">
                    <div>
                        <header className="mainHeader">
                            <UploadButton/>
                            <DeleteAccountButton/>
                            <LogoutButton disabled={false}/>
                        </header>

                        <div className="postsContainerBox">
                            {UserStore.listOfPosts}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default observer(Home);
