import React from "react";

function Modal(props) {
    const { isOpen, close } = props;

    const containerStyle = {
        zIndex: 999,
        backgroundColor: "yellow",
        position: "absolute",
        top: 0,
        left: 0,
        margin: 100,
        width: "80vw",
        height: "80vh"
    };

    if (isOpen)
        return (
            <div style={containerStyle}>
                <div>Hello world</div>
                <button onClick={close}>Close modal</button>
            </div>
        );
    else return null;
}

export default Modal;
