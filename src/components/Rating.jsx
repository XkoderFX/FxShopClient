import React from "react";
import PropTypes from "prop-types";

const Star = ({ value, gt, color }) => (
    <span>
        <i
            style={{ color }}
            className={
                value >= gt
                    ? "fas fa-star"
                    : value >= gt - 0.5
                    ? "fas fa-star-half-alt"
                    : "far fa-star"
            }
        ></i>
    </span>
);

const Rating = ({ value, text, color }) => {
    return (
        <div className="rating">
            <Star value={value} gt={1} />
            <Star value={value} gt={2} />
            <Star value={value} gt={3} />
            <Star value={value} gt={4} />
            <Star value={value} gt={5} />
            <p>{text ? text : ""}</p>
        </div>
    );
};

Star.defaultProps = {
    color: "#f8e825",
};

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
};

export default Rating;
