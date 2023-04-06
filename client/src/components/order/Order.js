import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faEdit,
  faTrash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

import { loadOrder, deleteOrder } from "../../actions/orderActions";

import NotePanel from "./NotePanel";

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

    let panelColor = "bg-white text-dark";
    let notePanelIcon = (
      <FontAwesomeIcon
        icon={faCaretDown}
        role="button"
        onClick={this.onClick}
      />
    );
    if (this.state.showNotePanel) {
      panelColor = "bg-dark text-white pt-2 pb-2";
      notePanelIcon = (
        <FontAwesomeIcon
          icon={faCaretUp}
          role="button"
          onClick={this.onClick}
        />
      );
    }

    console.log(this.props.order);

    const formatDate = (date, days) => {
      var d = new Date(date);
      d.setDate(d.getDate() + days);

      var month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    };

    const orderDate = formatDate(order.orderDate, 0);
    const deliveryDate = formatDate(order.orderDate, order.deliveryDays);

    let statusBadge = "";
    if (order.orderStatus === "New Order") {
      statusBadge = "badge badge-pill badge-danger";
    } else if (order.orderStatus === "Inprogress") {
      statusBadge = "badge badge-pill badge-warning";
    } else if (order.orderStatus === "Completed") {
      statusBadge = "badge badge-pill badge-success";
    }

    const now = new Date();
    let dueDateStatusIcon = null;
    const diff = new Date(deliveryDate).getDate() - now.getDate();
    if (diff <= 2 && diff >= 0) {
      dueDateStatusIcon = (
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          onClick={this.deleteOrder}
          color="orange"
        />
      );
    } else if (diff < 0) {
      dueDateStatusIcon = (
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          onClick={this.deleteOrder}
          color="red"
        />
      );
    }

    return (
      <li
        className="list-group-item border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
        key={order._id}
      >
        <div className={"row " + panelColor}>
          <div className="col-2">{order.customer}</div>
          <div className="col-2">{order.dressType}</div>
          <div className="col-1">{order.cost}</div>
          <div className="col-2">{orderDate}</div>
          <div className="col-2">{deliveryDate}</div>
          <div className="col-1">
            <span className={statusBadge}>{order.orderStatus}</span>
          </div>
          <div className="col-2 row">
            <div className="col-3">{notePanelIcon}</div>
            <Link to="/edit-order" className="col-3">
              <FontAwesomeIcon
                icon={faEdit}
                role="button"
                onClick={this.loadOrder}
              />
            </Link>
            <div className="col-3">
              <FontAwesomeIcon
                icon={faTrash}
                role="button"
                onClick={this.deleteOrder}
              />
            </div>
            <div className="col-3">{dueDateStatusIcon}</div>
          </div>
        </div>
        {this.state.showNotePanel ? <NotePanel note={order.note} /> : null}
      </li>
    );
  }
}

Order.propTypes = {
  loadOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { loadOrder, deleteOrder })(Order);
