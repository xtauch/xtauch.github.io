import React from 'react';
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import HomeButton from "../components/HomeButton";
import UserStore from "../stores/UserStore";
import {Image} from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Redirect} from "react-router";
let that; //Conserve Context

class UploadForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            returnHomePage: false,
            buttonDisabled: false // To prevent spam
        }
    }

    componentDidMount() { // When component loaded check if user is logged in
        this.isLoggedIn()
        that = this
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
                }
                else {
                    UserStore.loading = false
                    UserStore.isLoggedIn = false
                }
            })
            .catch(function(error) {
                UserStore.loading = false
                UserStore.isLoggedIn = false
            })
    }

    setInputValue(property, val) {
        this.setState({
            [property]: val
        })
    }

    selectImage(inputFile) {
        let reader = new FileReader()
        reader.readAsDataURL(inputFile.target.files[0])
        reader.onloadend = function(){
            this.setState({
                image: reader.result.toString()
            })
        }.bind(this)
    }

    submitForm() {
        fetch('http://localhost:3000/saveImage', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: UserStore.username,
                image: this.state.image,
                titre: this.state.titre
            })
        }).then((result) => {
            UserStore.uploading = false
            if (result.status === 200) {
                toast('Votre Gif a été publié !', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else {
                toast('Une erreur est survenue.', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
            setTimeout(this.redirectHomePage, 2000)
        })
    }

    redirectHomePage() {
        that.setState({
            returnHomePage: true
        })
    }

    render() {
        if (UserStore.isLoggedIn === false) {
            return <Redirect to={"/"} />
        } else if (this.state.returnHomePage === true) {
            return <Redirect to={"/home"} />
        } else {
        return (
            <div className="app">
                <header className="mainHeader">
                    <HomeButton/>
                    <SubmitButton
                        text={'Submit Gif'}
                        disabled={false}
                        onClick={ () => this.submitForm() }
                    />
                </header>

                <div>
                    <Image
                        className="ImageCenter"
                        src = {this.state.image}
                    />

                    <input
                        type={'file'}
                        className="ImageCenter"
                        accept={'image/*'}
                        disabled={false}
                        onChange={ (val) => this.selectImage(val) }
                    />

                    <InputField
                        type='text'
                        className="ImageCenter"
                        placeholder='Titre'
                        value={this.state.titre ? this.state.titre : ''}
                        onChange={ (val) => this.setInputValue('titre', val) }
                    />
                </div>

                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

            </div>

        )}
    }
}



export default UploadForm;
