import React from 'react';
import { Chip } from 'primereact/chip';
import { MDBNavbarItem } from 'mdb-react-ui-kit';
import UserDrop from './UserDrop';


function UserAvatar({user, setOpen, open, handleClick}){


    return(
        <MDBNavbarItem>
            <Chip label={user.username} image={user.profile_picture} onClick={() => setOpen(!open)} className="p-button ml-2 mr-2" />
            {open && <UserDrop handleClick={handleClick} />}
        </MDBNavbarItem>
    )
}
export default UserAvatar