import { Spinner } from "react-bootstrap";

export function LoadSpinner(){
    return (
        <div>
            <p>Loading</p>
            <Spinner animation="border" role="status" variant="secondary">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default LoadSpinner;