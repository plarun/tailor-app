import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAsc, faSortDesc } from "@fortawesome/free-solid-svg-icons";

import DeliveredOrder from "./DeliveredOrder";

class DeliveredOrderItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      orderList: [],
      filterColumn: "Filter",
      sort: {},
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    this.setState({ orderList: this.props.orders });
  }

  onSetFilter(filter) {
    this.setState({ filterColumn: filter });
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
      <div className="dropdown show">
        <button
          className="btn btn-primary dropdown-toggle"
          id="filterStatus"
          data-toggle="dropdown"
        >
          <span className="font-weight-bold">
            {this.state.filterColumn.charAt(0).toUpperCase() +
              this.state.filterColumn.slice(1)}{" "}
          </span>
        </button>
        <div className="dropdown-menu">
          <button
            className="dropdown-item"
            onClick={this.onSetFilter.bind(this, "customer")}
          >
            Customer
          </button>
          <button
            className="dropdown-item"
            onClick={this.onSetFilter.bind(this, "tailor")}
          >
            Tailor
          </button>
          <button
            className="dropdown-item"
            onClick={this.onSetFilter.bind(this, "dress")}
          >
            Dress
          </button>
        </div>
      </div>
    );

    const header = (
      <li className="list-group-item border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
        <div className={"row"}>
          <div
            className="col-1 font-weight-bold my-auto"
            onClick={this.applySort.bind(this, "orderId")}
            role="button"
          >
            Order#
            {this.state.sort.hasOwnProperty("orderId") ? (
              this.state.sort.orderId ? (
                <FontAwesomeIcon icon={faSortAsc} className="ml-2" />
              ) : (
                <FontAwesomeIcon icon={faSortDesc} className="ml-2" />
              )
            ) : null}
          </div>
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
            onClick={this.applySort.bind(this, "tailor")}
            role="button"
          >
            Tailor
            {this.state.sort.hasOwnProperty("tailor") ? (
              this.state.sort.tailor ? (
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
          <div
            className="col-2 font-weight-bold my-auto"
            onClick={this.applyDateSort.bind(this, "deliveredDate")}
            role="button"
          >
            Delivered On
            {this.state.sort.hasOwnProperty("deliveredDate") ? (
              this.state.sort.deliveredDate ? (
                <FontAwesomeIcon icon={faSortAsc} className="ml-2" />
              ) : (
                <FontAwesomeIcon icon={faSortDesc} className="ml-2" />
              )
            ) : null}
          </div>
        </div>
      </li>
    );

    const orders = this.state.orderList
      .filter((order) => {
        if (this.state.filterColumn === "Filter") {
          return true;
        }
        if (this.state.filterColumn === "customer") {
          return (
            this.state.query === "" ||
            order.customer
              .toLowerCase()
              .startsWith(this.state.query.toLowerCase())
          );
        } else if (this.state.filterColumn === "tailor") {
          return (
            this.state.query === "" ||
            order.user.toLowerCase().startsWith(this.state.query.toLowerCase())
          );
        } else if (this.state.filterColumn === "dress") {
          return (
            this.state.query === "" ||
            order.dressType
              .toLowerCase()
              .startsWith(this.state.query.toLowerCase())
          );
        }
        return false;
      })
      .map((order) => (
        <DeliveredOrder
          order={order}
          key={order._id}
          refreshCallback={this.props.refreshCallback}
        />
      ));

    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <h4 className="mb-4">Delivered Orders</h4>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder={"Search " + this.state.filterColumn}
              value={this.state.query}
              onChange={this.onChange}
              name="query"
            />
          </div>
          <div className="col-md-2">
            <div className="col-2 font-weight-bold">{filter}</div>
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

export default DeliveredOrderItem;
