import React, { Component } from "react";

//jQuery libraries

import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

class UserDataTable extends Component {
  // State array variable to save and show data
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    //initialize datatable
    $(document).ready(function () {
      var table = $("#usersTable").DataTable({
        searching: true,
        ordering: true,
        paging: true,
        info: true,
        // lengthMenu: [
        //     [10, 25, 50, -1],
        //     [10, 25, 50, 'All'],
        // ],
        orderClasses: false,
        // processing: true,
        serverSide: true,
        bDestroy: true,
        ajax: "http://192.168.0.92:8000/api/users/index",
        deferRender: true,
        columns: [
          { data: "id", name: "id" },
          { data: "name", name: "name" },
          { data: "email", name: "email" },
          {
            data: "created_at",
            name: "created_at",
            render: function (data) {
              return data;
            },
          },
          {
            data: "action",
            name: "action",
            orderable: false,
            searchable: false,
          },
        ],
      });
    });
  }
  render() {
    //Datatable HTML
    return (
      <div className="MainDiv">
        <div className="jumbotron text-center">
          <h3>LaraTutorials.com</h3>
        </div>

        <div className="container">
          <table className="table table-hover table-bordered" id="usersTable">
            <thead>
              <tr>
                <th> #ID </th>
                <th> Name </th>
                <th> Email </th>
                <th>Created at</th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default UserDataTable;
