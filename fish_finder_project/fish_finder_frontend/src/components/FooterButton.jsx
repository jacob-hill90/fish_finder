import { Button } from 'primereact/button';
import {
    MDBCol,
    MDBRow,
} from 'mdb-react-ui-kit';
function FooterButton({ link, git, name }) {
    return (
        <div>
            <div className="button-demo text-center ">
                <MDBRow >
                    <MDBCol className="d-flex justify-content-end align-items-end me-1" >
                        <p className="">
                            {name}
                        </p>
                    </MDBCol>
                    <MDBCol className="d-flex justify-content-start ms-1" >
                        <MDBRow >
                            <MDBCol className="d-flex justify-content-end me-1" >
                                <a href={link}>
                                    <div className="template">
                                        <Button className="linkedin p-0" aria-label="Google">
                                            <i className="pi pi-linkedin px-2"></i>
                                            <span className="px-3">Linkedin</span>
                                        </Button>
                                    </div>
                                </a>
                            </MDBCol>
                            <MDBCol className="d-flex justify-content-start ms-1" >
                                <a href={git}>
                                    <div className="template">
                                        <Button className="github p-0" aria-label="GitHub">
                                            <i className="pi pi-github px-2"></i>
                                            <span className="px-3">GitHub</span>
                                        </Button>
                                    </div>
                                </a>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </div>
        </div>
    )
}

export default FooterButton