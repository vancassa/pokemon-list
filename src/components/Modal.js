import React, { useState } from "react";

function Modal(props) {
    const { isOpen, children } = props;

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

    if (isOpen) return <div style={containerStyle}>{children}</div>;
    else return null;
}

export default Modal;
