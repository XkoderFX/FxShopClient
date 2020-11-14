import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword.trim()}`);
        } else {
            history.push("/");
        }
    };

    return (
        <Form inline onSubmit={submitHandler}>
            <Form.Control
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                name="q"
                placeholder="Search Products..."
                className="mr-sm-2"
            ></Form.Control>
            <Button type="submit" variant="outline-success" className="p-2">
                Search
            </Button>
        </Form>
    );
};

export default SearchBox;
