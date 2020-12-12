import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

class UploadButton extends React.Component {

    render() {
        return (
            <div className="inputField">
                <Link to="/upload">
                    <Button variant="light"
                        className={this.props.class}>
                        + Upload
                    </Button>
                </Link>
            </div>
        )
    }
}

export default UploadButton;
