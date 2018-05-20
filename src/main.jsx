import React from 'react';
import PropTypes from 'prop-types';

export default class EditableLabel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        	isEditing: this.props.isEditing || false,
			text: this.props.text || "",
        };
        
        this._handleFocus = this._handleFocus.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }
    
    _handleFocus(event) {
    	if(this.state.isEditing) {
        	if(typeof this.props.onFocusOut === 'function') {
        		this.props.onFocusOut(this.state.text, event);
            }
        }
        else {
        	if(typeof this.props.onFocus === 'function') {
	        	this.props.onFocus(this.state.text, event);
            }
        }
    
    	this.setState({
        	isEditing: !this.state.isEditing,
        });
    }
	
    _handleChange() {
    	this.setState({
        	text: this.textInput.value,
        });
    }

    render() {
    	if(this.state.isEditing) {
        	return <div>
        	    <input type="text" 
                    className={this.props.inputClassName}
                    id={this.props.inputId}
                    ref={(input) => { this.textInput = input; }}
                    value={this.state.text} 
                    onChange={this._handleChange}
                    onBlur={this._handleFocus}
                    style={{ 
                    	width: this.props.inputWidth,
                        height: this.props.inputHeight,
                        fontSize: this.props.inputFontSize,
                        fontWeight: this.props.inputFontWeight,
                        borderWidth: this.props.inputBorderWidth,
               			
                    }}
                    maxLength={this.props.inputMaxLength}
                    placeholder={this.props.inputPlaceHolder}
                    tabIndex={this.props.inputTabIndex}
                    autoFocus/>
        	</div>
        }
    
        return <div>
            <label className={this.props.labelClassName}
                id={this.props.labelId}
                onClick={this._handleFocus}
                style={{
                	fontSize: this.props.labelFontSize,
                    fontWeight: this.props.labelFontWeight,
                }}>
                {this.state.text}
            </label>
        </div>;
    }
}

EditableLabel.propTypes = {
    text: PropTypes.string.isRequired,
    isEditing: PropTypes.bool,

    labelClassName: PropTypes.string,
    labelId: PropTypes.string,
    labelFontSize: PropTypes.string,
    labelFontWeight: PropTypes.string,

    inputMaxLength: PropTypes.number,
    inputPlaceHolder: PropTypes.string,
    inputTabIndex: PropTypes.number,
    inputWidth: PropTypes.string,
    inputHeight: PropTypes.string,
    inputFontSize: PropTypes.string,
    inputFontWeight: PropTypes.string,
    inputClassName: PropTypes.string,
    inputId: PropTypes.string,
    inputBorderWidth: PropTypes.string,

    onFocus: PropTypes.func,
    onFocusOut: PropTypes.func
};



