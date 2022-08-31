import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBIcon
} from 'mdb-react-ui-kit';
import FooterButton from './FooterButton';

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
                                <p>
                                    Fishtories is a collaborative project designed by members of Code Platoon’s Romeo Cohort. We built this site to serve as a showcase of our collective problem solving and design skills, as such the fishing data displayed is for demonstration purposes only. All of our team members are US military veterans or veteran spouses. If you have questions about this project or would like to collaborate on future projects, feel free to connect with us on Linkedin.
                                </p>
                            </MDBCol>
                            <MDBCol className='mb-4' size="6" >
                                <h6 className='text-uppercase fw-bold mb-4'>Build Team</h6>
                                <FooterButton link={'https://www.linkedin.com/in/jacob-hill90/'} git={'https://github.com/jacob-hill90'} name={'Jacob Hill'} />
                                <FooterButton link={'https://www.linkedin.com/in/mike-lambert-349646220/'} git={'https://github.com/saltydog1980'} name={'Mike Lambert'} />
                                <FooterButton link={'https://www.linkedin.com/in/nathan-d-leathers/'} git={'https://github.com/nathan-d-leathers'} name={'Nathan Leathers'} />
                                <FooterButton link={'https://www.linkedin.com/in/robert-puentes-garces-811077226/'} git={'https://github.com/robertuptc'} name={'Robert Puentes Garces'} />
                                <FooterButton link={'https://www.linkedin.com/in/daniel-reither-swe/'} git={'https://github.com/dritter44'} name={'Daniel Reither'} />
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