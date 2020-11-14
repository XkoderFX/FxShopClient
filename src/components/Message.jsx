import React from "react";
import { Alert } from "react-bootstrap";

const Message = (props) => {
    return (
        <Alert style={{ margin: "10px" }} variant={props.variant || "danger"}>
            {props.message}
        </Alert>
    );
};

export default Message;
