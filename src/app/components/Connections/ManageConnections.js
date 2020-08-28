import React from "react";
import Connection from "./Connection";
import ConnectionForm from "./ConnectionForm";

import $ from "jquery";
import { connect } from "react-redux";
import * as connectionActions from "../../../redux/actions/connectionActions";
import * as keyspaceActions from "../../../redux/actions/keyspaceActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connectToHost, disconnectFromHost } from "../../../api/apiCalls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
class ManageConnections extends React.Component {
  state = {
    connectionName: "",
    host: "",
    port: "",
    datacenter: "",
    keyspaces: [],
    isConncted: false,
  };
  handleDisconnect = (index) => {
    const con = this.props.connections[index];
    disconnectFromHost()
      .then((res) => {
        this.props.actions.closeConnection({ ...con });
        this.props.actions.loadKeyspaces([]);
        this.props.keyspaces.loadTables([]);
      })
      .catch((err) => {});
  };
  handleConnect = (index) => {
    const con = this.props.connections[index];
    connectToHost(con)
      .then((res) => {
        this.props.actions.openConnection({ ...con });
        const keyspaces = res.data;
        this.props.actions.loadKeyspaces(keyspaces);
      })
      .catch((err) => {
        console.log("Error ", err);
        this.props.actions.loadKeyspaces([]);
        this.props.keyspaces.loadTables([]);
      });
  };
  componentDidMount() {
    const keys = Object.keys(localStorage);
    const response = [];
    keys.forEach((elem) => {
      const obj = JSON.parse(localStorage.getItem(elem));
      obj.connectionName = elem;
      response.push(obj);
    });
    this.props.actions.loadConnections(response);
    /*getAllConnections()
      .then((res) => {
        this.props.actions.loadConnections(res.data);
      })
      .catch((err) => {
        console.log(err);
      });*/
  }

  handleChange = ({ target }) => {
    this.setState({
      ...this.state,
      [target.name]: target.value,
    });
  };
  // Create Model to capture connection details
  handleAddConneciton = (event) => {
    event.preventDefault();
    const options = {
      show: true,
      focus: true,
    };
    $("exampleModalCenter").modal(options).show();
  };
  // Handle the Connect event to connect to the DB
  // This also dispatches actions to redux store
  handleAddConnect = (event) => {
    event.preventDefault();
    localStorage.setItem(
      this.state.connectionName,
      JSON.stringify({ ...this.state })
    );
    this.props.actions.addConnection({
      ...this.state,
    });
  };
  render() {
    return (
      <div id="connections">
        <h4>Connections</h4>
        {this.props.connections &&
          this.props.connections.map((elem, index) => (
            <Connection
              isConnected={elem.isConnected}
              handleConnect={this.handleConnect}
              handleDisconnect={this.handleDisconnect}
              index={index}
              key={elem.connectionName}
              connectionName={elem.connectionName}
              host={elem.host}
              port={elem.port}
              datacenter={elem.datacenter}
            />
          ))}
        <i
          onClick={this.handleAddConneciton}
          className="add-connection"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          <FontAwesomeIcon icon={faPlusCircle} />
        </i>
        <ConnectionForm
          connection={this.state}
          onChange={this.handleChange}
          onConnect={this.handleAddConnect}
        />
      </div>
    );
  }
}
ManageConnections.propTypes = {
  dispatch: PropTypes.func.isRequired,
  connections: PropTypes.array.isRequired,
};
function mapStateToProps(state, ownProps) {
  return {
    connections: state.connections,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(connectionActions, dispatch),
    keyspaces: bindActionCreators(keyspaceActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageConnections);
