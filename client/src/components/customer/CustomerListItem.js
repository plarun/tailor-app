import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import { deleteExperience } from '../../actions/profileActions';

import Customer from "./Customer";

class CustomerListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const header = (
      <li className="list-group-item border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
        <div className={"row"}>
          <div className="col-4 font-weight-bold my-auto">Customer</div>
          <div className="col-4 font-weight-bold my-auto">Phone</div>
          <div className="col-2 font-weight-bold my-auto">Gender</div>
          <div className="col-1"></div>
          <div className="col-1"></div>
        </div>
      </li>
    );

    const customers = this.props.customers
      .filter(
        (customer) =>
          this.state.query === "" ||
          customer.name.toLowerCase().startsWith(this.state.query.toLowerCase())
      )
      .map((customer) => <Customer customer={customer} key={customer._id} />);

    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <h4 className="mb-4">Customers</h4>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              class="form-control"
              placeholder="Search Customer"
              value={this.state.query}
              onChange={this.onChange}
              name="query"
            />
          </div>
          <div className="col-md-2">
            <Link to="/create-customers">
              <div className="btn btn-outline-primary">
                <FontAwesomeIcon icon={faPlus} />
                <span> Customer</span>
              </div>
            </Link>
          </div>
        </div>

        <ul className="list-group mb-0">
          {header}
          {customers}
        </ul>
      </div>
    );
  }
}

export default CustomerListItem;
