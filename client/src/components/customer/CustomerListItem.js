import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import { deleteExperience } from '../../actions/profileActions';

import Customer from "./Customer";

class CustomerListItem extends Component {
  // onDeleteClick(id) {
  // 	this.props.deleteExperience(id);
  // }

  render() {
    const header = (
      <li className="list-group-item border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
        <div className={"row"}>
          <div className="col-4 font-weight-bold">Customer</div>
          <div className="col-4 font-weight-bold">Phone</div>
          <div className="col-2 font-weight-bold">Gender</div>
          <div className="col-1"></div>
          <div className="col-1"></div>
        </div>
      </li>
    );

    const customers = this.props.customers.map((customer) => (
      <Customer customer={customer} key={customer._id} />
    ));

    return (
      <div>
        <div className="row">
          <div className="col-md-10">
            <h4 className="mb-4">Customers</h4>
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

// TailorProfileItem.propTypes = {
//   deleteExperience: PropTypes.func.isRequired
// };

// export default connect(null, { deleteExperience })(TailorProfileItem);
export default CustomerListItem;
