import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

import { loadCustomer } from "../../actions/customerActions";

import SizePanel from "./SizePanel";

class Customer extends Component {
  // onDeleteClick(id) {
  // 	this.props.deleteExperience(id);
  // }

  constructor() {
    super();
    this.state = {
      showSizePanel: false,
      errors: {},
    };
    this.onClick = this.onClick.bind(this);
    this.loadcurrentcustomer = this.loadcurrentcustomer.bind(this);
  }

  onClick(e) {
    let visibility = this.state.showSizePanel;
    this.setState({ showSizePanel: !visibility });
  }

  loadcurrentcustomer(e) {
    console.log("loading curr customer");
    this.props.loadCustomer(this.props.customer);
    // this.props.history('/edit-customer')
  }

  render() {
    const customer = this.props.customer;

    let panelColor = "bg-white text-dark";
    let sizePanelIcon = (
      <FontAwesomeIcon
        icon={faCaretDown}
        role="button"
        onClick={this.onClick}
      />
    );
    if (this.state.showSizePanel) {
      panelColor = "bg-dark text-white pt-2 pb-2";
      sizePanelIcon = (
        <FontAwesomeIcon
          icon={faCaretUp}
          role="button"
          onClick={this.onClick}
        />
      );
    }

    return (
      <li
        className="list-group-item border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
        key={customer._id}
      >
        <div className={"row " + panelColor}>
          <div className="col-4">{customer.name}</div>
          <div className="col-4">{customer.phone}</div>
          <div className="col-2">{customer.gender}</div>
          <div className="col-2 row">
            <div className="col-6">{sizePanelIcon}</div>
            <Link to="/edit-customer" className="col-6">
              <FontAwesomeIcon
                icon={faEdit}
                role="button"
                onClick={this.loadcurrentcustomer}
              />
            </Link>
          </div>
        </div>
        {this.state.showSizePanel ? <SizePanel customer={customer} /> : null}
      </li>
    );
  }
}

Customer.propTypes = {
  loadCustomer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { loadCustomer })(Customer);
