import React, { useState} from 'react';
import { Chip } from 'primereact/chip';
import { MDBNavbarItem } from 'mdb-react-ui-kit';
import default_picture from '../assets/default_picture.png'
import UserModal from './UserModal';


function UserAvatar({user, handleClick}){

    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    
    const source = `/static/media/${user.profile_picture}`

    return(
        <MDBNavbarItem className="me-4">
            <Chip label={user.username} image={user.profile_picture ? source : default_picture} onClick={toggleShow} className="p-button ml-2 mr-2" />
            {basicModal && <UserModal handleClick={handleClick} basicModal={basicModal} setBasicModal={setBasicModal} user={user} /> }
        </MDBNavbarItem>
    )
}
export default UserAvatar
