import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    return (
        <footer>
            <Container className="mx-auto">
                <Row>
                    <Col className="text-center py-3">
                        <p>copyright &copy; FxShop</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};
export default Footer;
