import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBIcon
} from 'mdb-react-ui-kit';
import { Button } from 'primereact/button';


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

                            <MDBCol className='mb-4' size="6" >
                                <h6 className='text-uppercase fw-bold mb-4'>Build Team</h6>
                                <MDBRow >
                                    <MDBCol className="d-flex justify-content-end me-1" >
                                        <p className="">
                                            Jacob Hill
                                        </p>
                                    </MDBCol>
                                    <MDBCol className="d-flex justify-content-start ms-1" >
                                        <a href="https://www.linkedin.com/in/jacob-hill90/" className="" >
                                            <Button className="linkedin p-0" aria-label="Linkedin">
                                                <i className="pi pi-linkedin px-2"></i>
                                                <span className="px-3">Linkedin</span>
                                            </Button>
                                        </a>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow >
                                    <MDBCol className="d-flex justify-content-end me-1" >
                                        <p className="">
                                            Michael Lambert
                                        </p>
                                    </MDBCol>
                                    <MDBCol className="d-flex justify-content-start ms-1" >
                                        <a href="https://www.linkedin.com/in/mike-lambert-349646220/" className="" >
                                            <Button className="linkedin p-0" aria-label="Linkedin">
                                                <i className="pi pi-linkedin px-2"></i>
                                                <span className="px-3">Linkedin</span>
                                            </Button>
                                        </a>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow >
                                    <MDBCol className="d-flex justify-content-end me-1" >
                                        <p className="">
                                            Nathan Leathers
                                        </p>
                                    </MDBCol>
                                    <MDBCol className="d-flex justify-content-start ms-1" >
                                        <a href="https://www.linkedin.com/in/nathan-d-leathers/" className="" >
                                            <Button className="linkedin p-0" aria-label="Linkedin">
                                                <i className="pi pi-linkedin px-2"></i>
                                                <span className="px-3">Linkedin</span>
                                            </Button>
                                        </a>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow >
                                    <MDBCol className="d-flex justify-content-end me-1" >
                                        <p className="">
                                            Robert Puentes Garces
                                        </p>
                                    </MDBCol>
                                    <MDBCol className="d-flex justify-content-start ms-1" >
                                        <a href="https://www.linkedin.com/in/robert-puentes-garces-811077226/" className="" >
                                            <Button className="linkedin p-0" aria-label="Linkedin">
                                                <i className="pi pi-linkedin px-2"></i>
                                                <span className="px-3">Linkedin</span>
                                            </Button>
                                        </a>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow >
                                    <MDBCol className="d-flex justify-content-end me-1" >
                                        <p className="">
                                            Daniel Reither
                                        </p>
                                    </MDBCol>
                                    <MDBCol className="d-flex justify-content-start ms-1" >
                                        <a href="https://www.linkedin.com/in/daniel-reither-swe/" className="" >
                                            <Button className="linkedin p-0" aria-label="Linkedin">
                                                <i className="pi pi-linkedin px-2"></i>
                                                <span className="px-3">Linkedin</span>
                                            </Button>
                                        </a>
                                    </MDBCol>
                                </MDBRow>
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
