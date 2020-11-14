import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FromContainer from "../components/FormContainer";

const PaymentScreen = ({ history }) => {
    const { shippingAddress } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    if (!shippingAddress) {
        history.push("/shipping");
    }

    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [country, setCountry] = useState(shippingAddress.country);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push("/placeorder");
    };

    return (
        <FromContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1 style={{ padding: "0" }}>Payment</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            custom
                            type="radio"
                            label="PayPal or Credit Card"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"  
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>

                        <Form.Check
                            custom
                            type="radio"
                            label="Stripe"
                            id="Stripe"
                            name="paymentMethod"
                            value="Stripe"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <Button variant="dark" type="submit">
                    Continue
                </Button>
            </Form>
        </FromContainer>
    );
};

export default PaymentScreen;
