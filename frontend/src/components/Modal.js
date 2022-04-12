import React from "react";
import "./Modal.css";

function Modal(props) {
    const { className, modalRef } = props;

    return(
        <div ref={modalRef} className={`${className} modal`}>
            <p>Meu modal!</p>
        </div>
    )
}

export default Modal;