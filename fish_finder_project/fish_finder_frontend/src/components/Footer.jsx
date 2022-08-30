import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBIcon
} from 'mdb-react-ui-kit';
import { Button } from 'primereact/button';


function Footer() {

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
                                <p id="fishSmarter">
                                    Fishtories is a collaborative project designed by members of Code Platoon's Romeo Cohort. We built this site to serve as a showcase of our collective problem solving and design skills, as such the fishing data displayed is for demonstration purposes only. All of our team members are US military veterans or veteran spouses. If you have questions about this project or would like to collaborate on future projects, feel free to connect with us on Linkedin.
                                </p>
                            </MDBCol>
                            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Build Team</h6>
                                <b><p>
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
                                    </p></b>
                            </MDBCol>

                            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                                <p>
                                    <a href='https://www.linkedin.com/in/jacob-hill90/' className='text-reset'>
                                        <i className="pi pi-linkedin" style={{ 'fontSize': '1em' }}></i>
                                    </a>
                                </p>
                                <p>
                                    <a href='https://www.linkedin.com/in/mike-lambert-349646220/' className='text-reset'>
                                        <i className="pi pi-linkedin" style={{ 'fontSize': '1em' }}></i>
                                    </a>
                                </p>
                                <p>
                                    <a href='https://www.linkedin.com/in/nathan-d-leathers/' className='text-reset'>
                                        <i className="pi pi-linkedin" style={{ 'fontSize': '1em' }}></i>
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        <i className="pi pi-linkedin" style={{ 'fontSize': '1em' }}></i>
                                    </a>
                                </p>
                                <p>
                                    <a href='https://www.linkedin.com/in/daniel-reither-swe/' className='text-reset'>
                                        <i className="pi pi-linkedin" style={{ 'fontSize': '1em' }}></i>
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
