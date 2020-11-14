import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./bootstrap.min.css";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/paymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

const App = () => {
    return (
        <Router>
            <Route component={Header} />

            <main>
                <Container>
                    <Route
                        path="/admin/user/:id/edit"
                        component={UserEditScreen}
                    />

                    <Route
                        path="/admin/product/:id/edit"
                        component={ProductEditScreen}
                    />

                    <Route path="/admin/userList" component={UserListScreen} />
                    <Route
                        path="/admin/orderList"
                        component={OrderListScreen}
                    />
                    <Switch>
                        <Route
                            path="/admin/productList/:pageNumber"
                            component={ProductListScreen}
                        />

                        <Route
                            path="/admin/productList"
                            component={ProductListScreen}
                            exact
                        />
                    </Switch>

                    <Route
                        exact
                        path="/search/:keyword"
                        component={HomeScreen}
                    />
                    <Route path="/order/:id" component={OrderScreen} />
                    <Route path="/placeorder" component={PlaceOrderScreen} />
                    <Route path="/payment" component={PaymentScreen}></Route>
                    <Route path="/shipping" component={ShippingScreen} />
                    <Route exact path="/login" component={LoginScreen} />
                    <Route exact path="/" component={HomeScreen} />
                    <Route path="/page/:pageNumber" component={HomeScreen} />
                    <Route
                        path="/search/:keyword/page/:pageNumber"
                        component={HomeScreen}
                    />
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/profile" component={ProfileScreen} />
                </Container>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
