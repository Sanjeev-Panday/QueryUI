# Cassandra Query UI

- A cross platfrom desktop applicaiton written in <strong>React</strong> to connect to <b>Cassandra DB</b> and run CQL queries using simple forms.
- Built with [Electron](https://github.com/atom/electron), [React](https://facebook.github.io/react/), [Redux](https://github.com/reactjs/redux), [React Bootstrap](https://react-bootstrap.github.io/), [bootstrap](https://getbootstrap.com/), [Redux thunk](https://github.com/reduxjs/redux-thunk)

## Features

- Simple UI to explore cassandra table to know columns, partition keys and clustering columns with data type information
- Validations to inform user on required fields before executing the query
- Data Type Error handling
- Where clause validation Error handling
- Multiple connections can be saved. 
- Added context menu to table rows
- Ability to copy and save single or all rows data in JSON file.
- Tooltip
- Option to select limit (no of rows)  while executing query.

## Change log 
#### 0.1.1-beta-2
- Added context menu to table rows
- Ability to copy and save single or all rows data in JSON file.
- Tooltip
- Option to select limit (no of rows)  while executing query.

## Few Screenshots

![](https://github.com/Sanjeev-Panday/cassandra-explorer/blob/master/screenshots/image6.png)
![](https://github.com/Sanjeev-Panday/cassandra-explorer/blob/master/screenshots/image7.png)

## How To Use
#### Package app manually from sources

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](https://www.npmjs.com/)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/Sanjeev-Panday/cassandra-explorer.git
# Go into the repository
cd cassandra-explorer
# Install dependencies and run the app
npm install
npm run dev

```
### Thanks [craco](https://github.com/gsoft-inc/craco)
- While working on this project I faced a challenge where I was not able to use electron remote in React Component. 
- [@craco/craco](https://www.npmjs.com/package/@craco/craco) npm package helped to solve this problem without using 'eject' by adding a single craco.config.js


#### License [MIT](LICENSE)
