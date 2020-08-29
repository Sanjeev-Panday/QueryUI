import React from "react";
import Connection from "./Connection";
import ConnectionForm from "./ConnectionForm";
import { connect } from "react-redux";
import * as connectionActions from "../../../redux/actions/connectionActions";
import * as keyspaceActions from "../../../redux/actions/keyspaceActions";
import * as errorActions from "../../../redux/actions/errorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connectToHost, disconnectFromHost } from "../../../api/apiCalls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
class ManageConnections extends React.Component {
  state = {
    show: false,
    connection: {
      connectionName: "",
      host: "",
      port: "",
      datacenter: "",
      keyspaces: [],
      isConncted: false,
    },
  };
  handleDelete = (name) => {
    localStorage.removeItem(name);
    this.refreshConnections();
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
  handleConnect = async (index) => {
    const con = this.props.connections[index];
    this.props.actions.showSpinner();
    try {
      const res = await connectToHost(con);
      this.props.actions.openConnection({ ...con });
      const keyspaces = res.data;
      this.props.actions.loadKeyspaces(keyspaces);
    } catch (err) {
      let msg = err.response ? err.response.data.innerErrors : {};
      const keys = msg ? Object.keys(msg) : null;
      msg =
        keys && msg[keys[0]]
          ? msg[keys[0]]
          : {
              name: "Error",
              message: "Please check the connection parameters and try again",
            };
      this.props.errors.showErrorMessage({
        heading: msg.name,
        msg: msg.message,
      });
      this.props.actions.loadKeyspaces([]);
      this.props.keyspaces.loadTables([]);
    } finally {
      this.props.actions.hideSpinner();
    }
  };
  componentDidMount() {
    this.refreshConnections();
  }
  refreshConnections = () => {
    const keys = Object.keys(localStorage);
    const response = [];
    keys.forEach((elem) => {
      const obj = JSON.parse(localStorage.getItem(elem));
      obj.connectionName = elem;
      response.push(obj);
    });
    this.props.actions.loadConnections(response);
  };
  handleChange = ({ target }) => {
    let newState = { ...this.state.connection, [target.name]: target.value };
    this.setState({
      ...this.state,
      connection: newState,
    });
  };
  // Create Model to capture connection details
  handleAddConneciton = (event) => {
    event.preventDefault();
    this.setState({ ...this.state, show: true });
  };
  // Handle the Connect event to connect to the DB
  // This also dispatches actions to redux store
  handleAddConnect = (event) => {
    event.preventDefault();
    localStorage.setItem(
      this.state.connection.connectionName,
      JSON.stringify({ ...this.state.connection })
    );

    this.props.actions.addConnection({
      ...this.state.connection,
    });
    this.setState({ ...this.state, show: false });
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
              handleDelete={this.handleDelete}
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
          onHide={() => this.setState({ ...this.state, show: false })}
          show={this.state.show}
          connection={this.state.connection}
          onChange={this.handleChange}
          onSave={this.handleAddConnect}
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
    errors: bindActionCreators(errorActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageConnections);
