import React from "react";
import Connection from "./Connection";
import ConnectionForm from "./ConnectionForm";
import { connect } from "react-redux";
import * as dbActions from "../../../redux/actions/dbActions";
import * as errorActions from "../../../redux/actions/errorActions";
import * as tableActions from "../../../redux/actions/tableActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./Connection.css";
class ManageConnections extends React.Component {
  state = {
    show: false,
    connection: {
      connectionName: "",
      host: "",
      port: "",
      datacenter: "",
      keyspaces: [],
      isConnected: false,
    },
  };

  handleDelete = (name) => {
    localStorage.removeItem(name);
    this.refreshConnections();
  };

  handleDisconnect = (index) => {
    const con = this.props.connections[index];
    this.props.actions.disconnectFromDB(con);
    this.props.tableActions.resetTableData();
  };

  handleConnect = (index) => {
    const con = this.props.connections[index];
    this.props.actions.connectToDB(con);
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
  actions: PropTypes.object.isRequired,
  tableActions: PropTypes.object.isRequired,
  connections: PropTypes.array.isRequired,
};
function mapStateToProps(state, ownProps) {
  return {
    connections: state.db.connections,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(dbActions, dispatch),
    errors: bindActionCreators(errorActions, dispatch),
    tableActions: bindActionCreators(tableActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageConnections);
