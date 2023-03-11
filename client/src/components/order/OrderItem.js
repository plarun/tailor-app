import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import { deleteExperience } from '../../actions/profileActions';

import Order from "./Order";

class OrderItem extends Component {
  render() {
    const header = (
      <li className="list-group-item border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
        <div className={"row"}>
          <div className="col-2 font-weight-bold">Customer</div>
          <div className="col-2 font-weight-bold">Dress</div>
          <div className="col-2 font-weight-bold">Ordered On</div>
          <div className="col-2 font-weight-bold">Due On</div>
          <div className="col-2 font-weight-bold">Status</div>
          <div className="col-2"></div>
        </div>
      </li>
    );

    const orders = this.props.orders.map((order) => (
      <Order
        order={order}
        key={order._id}
        refreshCallback={this.props.refreshCallback}
      />
    ));

    return (
      <div>
        <div className="row">
          <div className="col-md-10">
            <h4 className="mb-4">Orders</h4>
          </div>
          <div className="col-md-2">
            <Link to="/add-order">
              <div className="btn btn-outline-primary">
                <FontAwesomeIcon icon={faPlus} />
                <span> Order</span>
              </div>
            </Link>
          </div>
        </div>

        <ul className="list-group mb-0">
          {header}
          {orders}
        </ul>
      </div>
    );
  }
}

// TailorProfileItem.propTypes = {
//   deleteExperience: PropTypes.func.isRequired
// };

// export default connect(null, { deleteExperience })(TailorProfileItem);
export default OrderItem;
