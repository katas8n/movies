import React from 'react';
import PT from 'prop-types'

import Input from '../Input/Input';
import Button from '../Button/Button';
import Navbar from '../Navbar/Navbar';

import './Toolbar.scss';

const Toolbar = ({search,chanegeInputValue ,searchMovies , className ,isFetching}) => {
    const onKeyDownHendler = e => {
        if(e.key !== 'Enter' || !search) return;
        
        searchMovies();
    }

    const toolbarClasses = ['toolbar'];

    if(className){
        toolbarClasses.push(className)
    }

    return (
        <div className={toolbarClasses.join(' ')}>
            <div className="toolbar__wrapper">
                <div className="toolbar__tools">
                    <Input
                    onKeyDown={onKeyDownHendler}
                    name='search'
                    label="I'm searching..." 
                    chanegeInputValue={chanegeInputValue}
                    value={search}
                    className='toolbar__input'
                    />

                    <Button 
                         className='button--orange'
                         isDisabled={isFetching || !search}
                         onClick={searchMovies}
                    >
                        {isFetching ? 'Searching...' : 'Search'}
                    </Button>
                </div>
            <Navbar/>
            </div>
        </div>
    );
};
Toolbar.PT= {
    isFetching:PT.bool.isRequired,
    search : PT.string.isRequired ,
    chanegeInputValue: PT.func.isRequired,
    className : PT.string
}

export default Toolbar;
