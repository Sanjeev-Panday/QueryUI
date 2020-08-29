import React from "react";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
class Loader extends React.Component {
  render() {
    return this.props.isLoading ? (
      <div className="loading-container">
        <Spinner className="spinner" animation="border" size="lg" />
      </div>
    ) : (
      <></>
    );
  }
}
function mapStateToProps(state) {
  return {
    isLoading: state.loader.isLoading,
  };
}
export default connect(mapStateToProps)(Loader);
