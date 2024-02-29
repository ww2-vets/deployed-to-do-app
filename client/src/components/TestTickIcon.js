import { ReactSVG } from "react-svg";

// DID NOT WORK! -- read https://www.robinwieruch.de/react-svg-icon-components/

const TestTickIcon = () => {
    return (
        <div className="tick">
            <ReactSVG src="../check-mark-circle-2-svgrepo-com.svg" />
        </div>
    )
}

export default TestTickIcon;