import axios from "axios";
import { url } from "../commons/config";

export const connectToHost = (connection) => {
  return axios.post(url + "/connect", {
    connection: {
      name: connection.connectionName,
      host: connection.host,
      port: connection.port,
      datacenter: connection.datacenter,
    },
  });
};

export const fetchTableList = (keyspace) =>
  axios.get(`${url}/keyspace-info/${keyspace}`);

export const fetchTableMetaData = (keyspace, name) =>
  axios.get(`${url}/tableinfo/${keyspace}/${name}`);

export const getAllConnections = () => axios.get(`${url}/connections`);

export const disconnectFromHost = () => axios.post(url + "/shutdown");
