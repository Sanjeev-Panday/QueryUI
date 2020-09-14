import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import QueryForm from "./QueryForm";
import { executeQuery } from "../../../redux/actions/tableActions";
import {
  Button,
  Alert,
  Form,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import PropTypes from "prop-types";
const Query = ({ tableinfo, executeQuery }) => {
  const { keyspaceName, name, partitionKeys, clusteringKeys } = tableinfo;

  const [queryForm, setQueryForm] = useState({});
  const [error, setError] = useState({});
  const [limit, setLimit] = useState(300);

  useEffect(() => {
    setQueryForm({});
    setError({});
  }, [tableinfo.name]);

  const fetchAllRows = (event) => {
    event.preventDefault();
    let queryString = `select * from ${keyspaceName}.${name} limit 300;`;
    executeQuery(queryString, []);
  };
  const fetchTableRows = (event) => {
    event.preventDefault();

    let queryString = `select * from ${keyspaceName}.${name} where `;
    const where = [];
    const error = {};
    partitionKeys.forEach((elem) => {
      if (queryForm[elem.name] && queryForm[elem.name].trim() !== "") {
        queryString += elem.name + " = ? and ";
        where.push(queryForm[elem.name]);
      } else {
        error[elem.name] = `${elem.name} is required`;
      }
    });

    if (Object.keys(error).length > 0) {
      setError(error);
      return;
    }
    clusteringKeys &&
      clusteringKeys.forEach((elem) => {
        if (queryForm[elem.name] && queryForm[elem.name].trim() !== "") {
          queryString += elem.name + " = ? and ";
          where.push(queryForm[elem.name]);
        }
      });
    queryString =
      queryString.substr(0, queryString.lastIndexOf("and")).trim() +
      `limit ${limit};`;

    executeQuery(queryString, where);
  };
  const handleChange = ({ target }) => {
    setQueryForm({
      ...queryForm,
      [target.name]: target.value,
    });
  };
  const handleSelect = ({ target }) => {
    setLimit(target.value);
  };

  const isPartitionKeysPresent = partitionKeys && partitionKeys.length > 0;

  const isClusteringKeysPresent =
    tableinfo.clusteringKeys && tableinfo.clusteringKeys.length > 0;
  return isPartitionKeysPresent ? (
    <>
      <form>
        <QueryForm
          columns={partitionKeys}
          handleChange={handleChange}
          heading="Partition Keys"
          isRequired={true}
          error={error}
          queryForm={queryForm}
        />
        {isClusteringKeysPresent && (
          <QueryForm
            columns={clusteringKeys}
            handleChange={handleChange}
            heading="Clustering Keys"
            queryForm={queryForm}
          />
        )}
        <div className="control-section">
          <Form.Row className="align-items-center">
            <Col sm="auto">
              <Form.Label>No of rows</Form.Label>
            </Col>
            <Col sm="auto">
              <Form.Control
                as="select"
                custom
                name="limit"
                value={limit}
                onChange={handleSelect}
              >
                <option>10</option>
                <option>100</option>
                <option>200</option>
                <option>300</option>
              </Form.Control>
            </Col>
            <Col sm="auto">
              <Button variant="success" onClick={fetchTableRows}>
                Select
              </Button>
            </Col>
          </Form.Row>
          <OverlayTrigger
            trigger={["hover", "focus"]}
            placement="left"
            delay={{ show: 100, hide: 400 }}
            overlay={
              <Tooltip id="select-all-button-tooltip">
                Without where condition. Limit 300
              </Tooltip>
            }
          >
            <Button variant="primary " onClick={fetchAllRows}>
              Select All
            </Button>
          </OverlayTrigger>
        </div>
      </form>
    </>
  ) : (
    <div className="info">
      <Alert variant="info">
        <Alert.Heading as="h5">Query form!</Alert.Heading>
        <p>
          You will get a form to execute CQL queries after you select a table
          from <b>Tables</b> section in the left pannel
        </p>
        <hr />
        <p className="mb-0">
          To fetch list of tables please select a keyspace from the
          <b> keyspaces </b>
          section.
        </p>
      </Alert>
    </div>
  );
};

Query.propTypes = {
  tableinfo: PropTypes.object.isRequired,
  executeQuery: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    tableinfo: state.table.tableinfo,
  };
}
const mapDispatchToProps = {
  executeQuery,
};
export default connect(mapStateToProps, mapDispatchToProps)(Query);
