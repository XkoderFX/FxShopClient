import pagination, { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import React from "react";

const Paginate = ({ pages, page, isAdmin = false, keyword }) => {
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((n) => (
                    <LinkContainer
                        key={n + 1}
                        to={
                            !isAdmin
                                ? keyword
                                    ? `/search/${keyword}/page/${n + 1}`
                                    : `/page/${n + 1}`
                                : `/admin/productList/${n + 1}`
                        }
                    >
                        <Pagination.Item active={n + 1 === page}>
                            {n + 1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    );
};

export default Paginate;
