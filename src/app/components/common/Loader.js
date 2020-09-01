import React from "react";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from "prop-types";
import "./css/Loader.css";

const Loader = ({ isLoading }) => {
  return isLoading ? (
    <div className="loading">
      <Spinner animation="grow" variant="dark" />
    </div>
  ) : (
    <></>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isLoading: state.loader.isLoading,
  };
}
export default connect(mapStateToProps)(Loader);
