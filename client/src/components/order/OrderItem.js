import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import Order from "./Order";

class OrderItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: {
        orderStatus: "All",
      },
    };
  }

  onSetFilter(filter) {
    this.setState({ filter: { orderStatus: filter } });
  }

  render() {
    const filter = (
      <div className="dropright show">
        <a
          className="btn dropdown-toggle"
          href="#"
          role="button"
          id="filterStatus"
          data-toggle="dropdown"
        >
          <span className="font-weight-bold">Status </span>
        </a>
        <div className="dropdown-menu">
          <a
            className="dropdown-item"
            href="#"
            onClick={this.onSetFilter.bind(this, "All")}
          >
            All
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={this.onSetFilter.bind(this, "New Order")}
          >
            New Order
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={this.onSetFilter.bind(this, "Inprogress")}
          >
            Inprogress
          </a>
          <a
            className="dropdown-item"
            href="#"
            onClick={this.onSetFilter.bind(this, "Completed")}
          >
            Completed
          </a>
        </div>
      </div>
    );

    const header = (
      <li className="list-group-item border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
        <div className={"row"}>
          <div className="col-2 font-weight-bold my-auto">Customer</div>
          <div className="col-2 font-weight-bold my-auto">Dress</div>
          <div className="col-2 font-weight-bold my-auto">Ordered On</div>
          <div className="col-2 font-weight-bold my-auto">Due On</div>
          <div className="col-2 font-weight-bold">{filter}</div>
          <div className="col-2"></div>
        </div>
      </li>
    );

    const orders = this.props.orders
      .filter(
        (order) =>
          this.state.filter.orderStatus == "All" ||
          this.state.filter.orderStatus == order.orderStatus
      )
      .map((order) => (
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
