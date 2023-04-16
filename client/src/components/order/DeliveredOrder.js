import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadOrder, deleteOrder } from "../../actions/orderActions";

class Order extends Component {
  constructor() {
    super();

    this.state = {
      showNotePanel: false,
      errors: {},
    };

    this.onClick = this.onClick.bind(this);
    this.loadOrder = this.loadOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
  }

  onClick(e) {
    let visibility = this.state.showNotePanel;
    this.setState({ showNotePanel: !visibility });
  }

  loadOrder(e) {
    this.props.loadOrder(this.props.order);
  }

  deleteOrder(e) {
    this.props.deleteOrder(this.props.order);
    this.props.refreshCallback();
  }

  render() {
    const order = this.props.order;

    const formatDate = (date) => {
      var d = new Date(date);
      d.setDate(d.getDate());

      var month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    };

    const orderDate = formatDate(order.orderDate);
    const deliveredDate = formatDate(order.deliveredOn);

    return (
      <li
        className="list-group-item border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
        key={order._id}
      >
        <div className={"row"}>
          <div className="col-1">{order.orderId}</div>
          <div className="col-2">{order.customer}</div>
          <div className="col-2">{order.user}</div>
          <div className="col-2">{order.dressType}</div>
          <div className="col-1">{order.cost}</div>
          <div className="col-2">{orderDate}</div>
          <div className="col-2">{deliveredDate}</div>
        </div>
      </li>
    );
  }
}

Order.propTypes = {
  loadOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { loadOrder, deleteOrder })(Order);
