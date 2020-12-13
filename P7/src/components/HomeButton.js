import React from 'react';
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

class HomeButton extends React.Component {

    render() {
        return (
            <div className="inputField">
                <Button variant="light">
                    <Link to="/home">
                            Back
                    </Link>
                </Button>
            </div>
        )
    }
}

export default HomeButton;
