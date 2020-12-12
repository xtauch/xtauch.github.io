import React from 'react';


class InputField extends React.Component {
    render() {
        return (
            <div>
               <input
                   className={this.props.className}
                   type={this.props.type}
                   accept={this.props.accept}
                   placeholder={this.props.placeholder}
                   value={this.props.value}
                   onChange={ (event) => this.props.onChange(event.target.value) }
               />
            </div>
        )
    }
}



export default InputField;
