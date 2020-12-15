import React from 'react';
import PT from 'prop-types';
import {v1 as uuid} from 'uuid';

import './Input.scss';

//class
const Input = ({type = 'text' , name ,label , placeholder , value , onBlur ,chanegeInputValue ,className , onKeyDown}) => {
    const uniqueid = uuid();    

    const labelClasses = ['input-wrapper__label']

    if(value){
        labelClasses.push('input-wrapper__label--top')
    }

    const inputClasses = ['input-wrapper__input']

    if(className){
        inputClasses.push(className)
    }
    return(
        <div className="input-wrapper">
            <label htmlFor={uniqueid} className={labelClasses.join(' ')}>
                {label}
            </label>
                <input 
                    autoComplete='off'
                    className={inputClasses.join(' ')}
                    type={type} 
                    name={name}
                    placeholder={placeholder}
                    value={value} onChange={chanegeInputValue}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}>
                </input>
         </div>    
    )
}

Input.PT = {
    className: PT.string,
    type : PT.oneOf(['text','number','password' ,'e-mail']) ,
     name : PT.string ,
     placeholder : PT.string,
     value : PT.string.isRequired ,
     onChange : PT.func.isRequired,
     onBlur : PT.func,
     onKeyDown: PT.func
}

export default Input;
