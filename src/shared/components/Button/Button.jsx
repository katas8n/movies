import React from 'react';
import PT, { object } from 'prop-types';

import './Button.scss';

const Button = ({
    children,
    className,
    isDisabled = false,
    type = 'button',
    onClick
}) => {
    const btnClasses = ['button']

    if(className){
        btnClasses.push(className)
    }
    return (
        <button className={btnClasses.join(' ')} 
        type = {type}
        onClick={onClick}
        disabled={isDisabled}
        >
            {children}
        </button>
    );
};
Button.PT ={
    isDisabled : PT.bool,
    className : PT.string,
    children: 
        PT.oneOf([PT.string ,
        PT.object,
        PT.arrayOf(PT.object)
    ]).isRequired,
    type : PT.oneOf(['button' , 'submit']),
    onClick : PT.func
}
export default Button;
