import React from "react";
import {
    Navbar,
    NavDropdown,
    Nav,
    Form,
    Container,
    FormControl,
    Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { LinkContainer, Link } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = ({ history, location }) => {
    const { userInfo, error, loading } = useSelector(
        (state) => state.userLogin
    );

    const dispatch = useDispatch();

    const logoutHandler = () => {
        history.push("/");
        history.go(0);
        dispatch(logout());
    };

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg">
                <LinkContainer to="/">
                    <Navbar.Brand>FxShop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Route
                        render={({ history }) => (
                            <SearchBox history={history}></SearchBox>
                        )}
                    />
                    <Nav className="ml-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link>
                                <i className="fas fa-shopping-cart"></i>
                                <span style={{ marginLeft: "10px" }}>CART</span>
                            </Nav.Link>
                        </LinkContainer>

                        {userInfo ? (
                            <NavDropdown alignRight title={userInfo.name}>
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>

                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <i className="fas fa-user"></i>
                                    <span style={{ marginLeft: "10px" }}>
                                        LOGIN
                                    </span>
                                </Nav.Link>
                            </LinkContainer>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown alignRight title="Admin">
                                <LinkContainer to="/admin/userList">
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to="/admin/productList">
                                    <NavDropdown.Item>
                                        Products
                                    </NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to="/admin/orderList">
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
};

export default Header;
