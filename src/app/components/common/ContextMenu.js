import React from "react";
import { connect } from "react-redux";
import { remote } from "electron";
import {
  saveSelectedRow,
  saveAllRows,
  copySelectedRow,
  copyAllRows,
  showUpdateForm,
  showDeleteConfirmation,
} from "../../../redux/actions/tableActions";
const { Menu } = remote;

class ContextMenu extends React.Component {
  constructor(props) {
    super(props);
    this.createContextMenu();
  }

  componentDidUpdate(prevProps) {
    this.showMenu();
  }
  createContextMenu = () => {
    const saveSelectedRow = () => {
      this.props.saveSelectedRow();
    };

    const saveAllRows = () => {
      this.props.saveAllRows();
    };

    const copySelectedRow = () => {
      this.props.copySelectedRow();
    };
    const copyAllRowsItem = () => {
      this.props.copyAllRows();
    };

    const updateSelectedRowItem = () => {
      this.props.showUpdateForm();
    };
    const deleteSelectedRowItem = () => {
      this.props.showDeleteConfirmation();
    };

    const displayFormToCreateNewRow = () => {};
    const tableContextMenuTemplate = [
      {
        label: "Create",
        click() {
          displayFormToCreateNewRow();
        },
      },
    ];
    const rowContextMenuTemplate = [
      {
        label: "CQL",
        submenu: [
          {
            label: "Insert",
            click() {
              displayFormToCreateNewRow();
            },
          },
          {
            label: "Update",
            click() {
              updateSelectedRowItem();
            },
          },
          {
            label: "Delete",
            click() {
              deleteSelectedRowItem();
            },
          },
        ],
      },
      {
        type: "separator",
      },
      {
        label: "Copy",

        click() {
          copySelectedRow();
        },
      },

      {
        label: "Copy All",
        click() {
          copyAllRowsItem();
        },
      },
      {
        type: "separator",
      },
      {
        label: "Save",

        click() {
          saveSelectedRow();
        },
      },
      {
        label: "Save All",

        click() {
          saveAllRows();
        },
      },
    ];

    this.rowMenu = Menu.buildFromTemplate(rowContextMenuTemplate);
    this.tableMenu = Menu.buildFromTemplate(tableContextMenuTemplate);
  };

  showMenu = () => {
    this.props.menuType === "row"
      ? this.rowMenu.popup()
      : this.tableMenu.popup();
  };
  render() {
    return null;
  }
}
function mapStateToProps(state) {
  return {
    clickedRow: state.table.clickedRow,
    toggleMenu: state.table.toggleMenu,
    menuType: state.table.menuType,
  };
}
const mapDispatchToProps = {
  saveAllRows,
  saveSelectedRow,
  copySelectedRow,
  copyAllRows,
  showUpdateForm,
  showDeleteConfirmation,
};
export default connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
