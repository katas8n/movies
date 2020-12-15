import React from 'react';
import PT from 'prop-types';

import Toolbar from '../Toolbar/Toolbar';
import Loader from '../Loader/Loader';
import Backdrop from '../Backdrop/Backdrop';
import Footer from '../Footer/Footer';

import './Layout.scss';

const Layout = ({ children , search ,chanegeInputValue ,searchMovies ,isFetching}) => (

        <div className="layout">
            <Toolbar 
            search={search}
            className='toolbar--sticky'
            chanegeInputValue={chanegeInputValue}
            searchMovies={searchMovies}
            isFetching={isFetching}
            />
            <div className="layout__content">
            {
                isFetching ?(
                    <>
                    <Backdrop/>
                    <Loader type='blue'/>
                    </> 
                )
                : children
            }

            </div>

            <Footer />
        </div>
)
Layout.PT = {
    isFetching: PT.bool.isRequired,
    search : PT.string.isRequired ,
    chanegeInputValue: PT.func.isRequired,
    children : PT.oneOf([
        PT.object,
        PT.arrayOf(PT.object)
    ]).isRequired,
    searchMovies: PT.func.isRequired
}

export default Layout;
