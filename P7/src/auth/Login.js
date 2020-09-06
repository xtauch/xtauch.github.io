import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email : "",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        const { email, password } = this.state
    }



}