import React from 'react';
import { MDBContainer, MDBRow, MDBCol} from 'mdb-react-ui-kit';

function FishDBFish({fish_pic, name, latin_name, fish_record, fish_docs}) {



    return (
        <div className="fish-db-fish">
            <MDBContainer breakpoint="md">
                <MDBRow>
                    <MDBCol className="md-6 gx-5 mb-4">
                    <div className="container justify-content-center text-center bg-image shadow-2-strong rounded-5" >
                        <img src={fish_pic} class="img-fluid" />
                    </div>
                    </MDBCol>
                    <MDBCol className="md-6 gx-5 mb-4">
                        <h4 className="text-center"><strong>{name}</strong></h4>
                        <p className="text-center"><strong><em>{latin_name}</em></strong></p>
                        <h6 className="text-center"><strong>Current Record:</strong></h6>
                        <h5 className="text-center"><strong>{fish_record}</strong></h5>
                        
                        <div>
                        {fish_docs ? fish_docs.split('<br>').map( (line, i) => <div key={'x'+i}>{line}</div> ): null}
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default FishDBFish