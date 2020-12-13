import React from 'react';
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import UserStore from "../stores/UserStore";
import {observer} from "mobx-react";
import {Image} from "react-bootstrap";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";

class CommentForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            comment: '',
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
                        console.log("Logged in (Admin)")
                        this.setState({
                            deleteButtonDisabled: false
                        })
                    } else {
                        console.log("Logged in (User)")
                        this.setState({
                            deleteButtonDisabled: true
                        })
                    }
                    this.getComments()
                }
                else {
                    UserStore.loading = false
                    UserStore.isLoggedIn = false
                }
            }.bind(this))
            .catch(function(error) {
                UserStore.loading = false
                UserStore.isLoggedIn = false
                console.log(error)
            })
    }

    setInputValue(property, val) {
        this.setState({
            [property]: val
        })
    }

    postComment() {
        this.setState({
            buttonDisabled: true
        })
       fetch('http://localhost:3000/postComment', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    publication_id : UserStore.selectedPost.id,
                    comment: this.state.comment
                })
            }).then(function(result){
                   if (result) {
                       this.getComments()
                       this.setState({
                           buttonDisabled: false,
                           comment : ''
                       })
                       return result.json()
                   }
            }.bind(this))
                .catch(function(error) {
                    alert(error)
                    console.log("Une erreur s'est produite, réessayez plus tard !")
                }.bind(this))
    }

    deleteComment(id) {
        fetch('http://localhost:3000/deleteComment', {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id : id,
                publication_id : UserStore.selectedPost.id,
            })
        }).then(function(result){
            if (result) {
                this.getComments()
                return result.json()
            }
        }.bind(this))
            .catch(function(error) {

            })
    }

    getComments() {
        fetch('http://localhost:3000/getComments', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                publication_id : UserStore.selectedPost.id,
            })
        })
            .then(function(result){
                if (result && result.status === 200) {
                    return result.json()
                }
            })
            .then(function(result){
                UserStore.listOfComments = []
                let deleteButtonClass;
                if (this.state.deleteButtonDisabled === false) {
                    deleteButtonClass = "visible"
                } else {
                    deleteButtonClass = "invisible"
                }
                for (let i = 0; i < result.listOfComments.length; i++) {
                    UserStore.listOfComments.push(
                        <div className="postsContainer">
                            <text>{result.listOfComments[i].username}</text>
                            <text>{result.listOfComments[i].postdate.slice(0, 10)}</text>
                            <text>{result.listOfComments[i].comment}</text>
                            <SubmitButton
                                text={'Delete'}
                                className={deleteButtonClass}
                                disabled={this.state.deleteButtonDisabled}
                                onClick={ () => this.deleteComment(result.listOfComments[i].id) }
                            />
                        </div>
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
                <div className="postsContainerBox">

                    <Image fluid src = {Buffer.from(UserStore.selectedPost.image).toString()} />

                    <InputField
                        type="textarea"
                        className="commentInput"
                        placeholder='Write comments...'
                        value={this.state.comment ? this.state.comment : ''}
                        onChange={ (val) => this.setInputValue('comment', val) }
                    />

                    <SubmitButton
                        text='Post'
                        disabled={this.state.buttonDisabled}
                        onClick={ () => this.postComment()}
                    />

                    <Link to="/home">
                        <button
                            className='btn-light'>
                            Back
                        </button>
                    </Link>

                    <div className="postsContainerBox">
                        {UserStore.listOfComments}
                    </div>

                </div>
            )
        }
    }
}

export default observer(CommentForm);
