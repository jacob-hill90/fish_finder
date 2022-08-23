import React from 'react';
import { MDBContainer, MDBRow, MDBCol} from 'mdb-react-ui-kit';

function FishDBFish({fish_pic, name, latin_name, fish_record, fish_docs}) {






    return (
        <div className="fish-db-fish">
            <MDBContainer breakpoint="md">
                <MDBRow>
                    <MDBCol className="md-6 gx-5 mb-4">
                    <div className="bg-image shadow-2-strong rounded-5" >
                        <img src={fish_pic} class="img-fluid" />
                    </div>
                    </MDBCol>
                    <MDBCol className="md-6 gx-5 mb-4">
                        <h4><strong>{name}</strong></h4>
                        <p><strong><em>{latin_name}</em></strong></p>
                        <h5><strong>{fish_record}</strong></h5>
                        <p>{fish_docs}</p>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default FishDBFish