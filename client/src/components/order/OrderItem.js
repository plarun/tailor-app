import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSortAsc,
  faSortDesc,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import Order from "./Order";

class OrderItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderList: [],
      filter: {
        orderStatus: "All",
      },
      sort: {},
    };
  }

  componentDidMount() {
    this.setState({ orderList: this.props.orders });
  }

  onSetFilter(filter) {
    this.setState({ filter: { orderStatus: filter } });
  }

  applySort(name) {
    const prev = this.state.sort[name];
    this.setState({ sort: { [name]: !prev } });

    let orderSort = this.props.orders;

    // asc
    if (prev) {
      orderSort.sort((a, b) => a[name] > b[name]);
    } else {
      orderSort.sort((a, b) => a[name] < b[name]);
    }

    this.setState({ orderList: orderSort });
  }

  applyDateSort(name) {
    const prev = this.state.sort[name];

    this.setState({ sort: { [name]: !prev } });

    let orderSort = this.props.orders;

    // asc
    if (prev) {
      orderSort.sort((a, b) => new Date(a[name]) - new Date(b[name]));
    } else {
      orderSort.sort((a, b) => new Date(b[name]) - new Date(a[name]));
    }
    this.setState({ orderList: orderSort });
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
          <div
            className="col-2 font-weight-bold my-auto"
            onClick={this.applySort.bind(this, "customer")}
            role="button"
          >
            Customer
            {this.state.sort.hasOwnProperty("customer") ? (
              this.state.sort.customer ? (
                <FontAwesomeIcon icon={faSortAsc} className="ml-2" />
              ) : (
                <FontAwesomeIcon icon={faSortDesc} className="ml-2" />
              )
            ) : null}
          </div>
          <div
            className="col-2 font-weight-bold my-auto"
            onClick={this.applySort.bind(this, "dressType")}
            role="button"
          >
            Dress
            {this.state.sort.hasOwnProperty("dressType") ? (
              this.state.sort.dressType ? (
                <FontAwesomeIcon icon={faSortAsc} className="ml-2" />
              ) : (
                <FontAwesomeIcon icon={faSortDesc} className="ml-2" />
              )
            ) : null}
          </div>
          <div className="col-1 font-weight-bold my-auto">Cost</div>
          <div
            className="col-2 font-weight-bold my-auto"
            onClick={this.applyDateSort.bind(this, "orderDate")}
            role="button"
          >
            Ordered On
            {this.state.sort.hasOwnProperty("orderDate") ? (
              this.state.sort.orderDate ? (
                <FontAwesomeIcon icon={faSortAsc} className="ml-2" />
              ) : (
                <FontAwesomeIcon icon={faSortDesc} className="ml-2" />
              )
            ) : null}
          </div>
          <div className="col-2 font-weight-bold my-auto">Due On</div>
          <div className="col-2 font-weight-bold">{filter}</div>
          <div className="col-1"></div>
        </div>
      </li>
    );

    const orders = this.state.orderList
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
