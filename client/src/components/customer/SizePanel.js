import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCustomers } from "../../actions/customerActions";

class SizePanel extends Component {
  render() {
    const customer = this.props.customer;
    const upper = customer.upper;
    const lower = customer.lower;

    return (
      <div className="row">
        <div className="card mt-2 mb-4">
          <div className="card-header font-weight-bold">Upper Body</div>
          <div className="row card-body">
            <div className="col-2 mb-4">Neck : {upper.neck}</div>
            <div className="col-2 mb-4">Shoulder : {upper.shoulder}</div>
            <div className="col-2 mb-4">Full Arm : {upper.fullarm}</div>
            <div className="col-2 mb-4">Half Arm : {upper.halfarm}</div>
            <div className="col-2 mb-4">Sleeve : {upper.sleeve}</div>
            <div className="col-2 mb-4">Wrist : {upper.wrist}</div>
            <div className="col-2 mb-4">Elbow : {upper.elbow}</div>
            <div className="col-2 mb-4">Chest : {upper.chest}</div>
            <div className="col-2 mb-4">Hip : {upper.hip}</div>
            <div className="col-2 mb-4">Body : {upper.body}</div>
          </div>
          <div className="card-header font-weight-bold">Lower Body</div>
          <div className="row card-body">
            <div className="col-2 mb-4">Thigh : {lower.thigh}</div>
            <div className="col-2 mb-4">Knee : {lower.knee}</div>
            <div className="col-2 mb-4">Seat : {lower.seat}</div>
            <div className="col-2 mb-4">Leg Half : {lower.leg_half}</div>
            <div className="col-2 mb-4">Leg Full : {lower.leg_full}</div>
            <div className="col-2 mb-4">Ankle : {lower.ankle}</div>
          </div>
        </div>
      </div>
    );
  }
}

SizePanel.propTypes = {
  getCustomers: PropTypes.func.isRequired,
  cust: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cust: state.cust,
});

export default connect(mapStateToProps, { getCustomers })(SizePanel);
