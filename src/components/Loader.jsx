import React from "react";
import { Container, Spinner } from "react-bootstrap";

const Loader = () => {
    return (
        <Container
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Spinner
                style={{ margin: "10px" }}
                animation="border"
                variant="primary"
            />
        </Container>
    );
};

export default Loader;
