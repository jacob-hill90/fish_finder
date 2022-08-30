import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBIcon
} from 'mdb-react-ui-kit';


function Footer(){

    return (
        <div>
            <MDBFooter className='text-center text-lg-left'>
                <section className=''>
                    <MDBContainer className='text-center text-md-start mt-5' >
                        <MDBRow className='mt-3'>
                            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon icon="gem" className="me-3" />
                                Company name
                            </h6>
                            <p>
                                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit.
                            </p>
                            </MDBCol>

                            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Build Team</h6>
                            <p>
                                Jacob Hill
                            </p>
                            <p>
                                Michael Lambert
                            </p>
                            <p>
                                Nathan Leathers
                            </p>
                            <p>
                                Robert Puentes Garces
                            </p>
                            <p>
                                Daniel Reither
                            </p>
                            </MDBCol>

                            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    <i className="pi pi-linkedin" style={{'fontSize': '1em'}}></i>
                                </a>
                            </p>
                            <p>
                                <a href='https://www.linkedin.com/in/mike-lambert-349646220/' className='text-reset'>
                                    <i className="pi pi-linkedin" style={{'fontSize': '1em'}}></i>
                                </a>
                            </p>
                            <p>
                                <a href='https://www.linkedin.com/in/robert-puentes-garces-811077226/' className='text-reset'>
                                    <i className="pi pi-linkedin" style={{'fontSize': '1em'}}></i>
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    <i className="pi pi-linkedin" style={{'fontSize': '1em'}}></i>
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    <i className="pi pi-linkedin" style={{'fontSize': '1em'}}></i>
                                </a>
                            </p>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
                <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    &copy; {new Date().getFullYear()} Copyright:{' '}
                    Fishtories.
                </div>
            </MDBFooter>
        </div>
    )
}

export default Footer