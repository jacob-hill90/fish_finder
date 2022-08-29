import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { MDBBtn } from 'mdb-react-ui-kit';

function UserDrop({user, handleClick}){

    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);


    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }


    return(
        <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
            <CSSTransition
            in={activeMenu === 'main'}
            timeout={500}
            classNames="menu-primary"
            unmountOnExit
            onEnter={calcHeight}>
            <div className="menu flex-column align-items-center">
                <Link to={"/user_profile"} className="global-links nav_items"><strong>My Profile</strong></Link>
                <hr />
                <MDBBtn onClick={(event) => { handleClick(event) }} style={{ backgroundColor: '#62acee' }} className="text-dark" >Sign Out</MDBBtn>
            </div>
            </CSSTransition>
        </div>
    )
}

export default UserDrop