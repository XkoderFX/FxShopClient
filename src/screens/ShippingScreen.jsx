import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import FromContainer from "../components/FormContainer";

const ShippingScreen = ({ history }) => {
    const { shippingAddress } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [country, setCountry] = useState(shippingAddress.country);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push("/payment");
    };

    return (
        <FromContainer>
            <CheckoutSteps step1 step2 />
            <h1 style={{ padding: "0" }}>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <i className="fas fa-map-marked-alt"></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="text"
                            placeholder="Enter address"
                            value={address}
                            required
                            onChange={({ target }) => setAddress(target.value)}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <i className="fas fa-city"></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="text"
                            placeholder="Enter city"
                            value={city}
                            required
                            onChange={({ target }) => setCity(target.value)}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <i className="fas fa-mail-bulk"></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="text"
                            placeholder="Enter postal code"
                            value={postalCode}
                            required
                            onChange={({ target }) =>
                                setPostalCode(target.value)
                            }
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <i className="fas fa-globe-asia"></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="text"
                            placeholder="Enter country"
                            value={country}
                            required
                            onChange={({ target }) => setCountry(target.value)}
                        />
                    </InputGroup>
                </Form.Group>

                <Button variant="dark" type="submit">
                    Continue
                </Button>
            </Form>
        </FromContainer>
    );
};

export default ShippingScreen;
