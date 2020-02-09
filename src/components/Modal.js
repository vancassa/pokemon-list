import React, { useState } from "react";

function Modal(props) {
    const { isOpen, children } = props;

    const containerStyle = {
        zIndex: 999,
        position: "absolute",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(100, 100, 100, 3)"
    };

    const modalStyle = {
        backgroundColor: "turquoise",
        padding: 50,
        margin: 50,
        borderRadius: "10px",
        border: "solid 3px green"
    };

    if (isOpen)
        return (
            <div style={containerStyle}>
                <div style={modalStyle}>{children}</div>
            </div>
        );
    else return null;
}

export default Modal;
