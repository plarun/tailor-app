import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import Spinner from "../common/Spinner";

import "react-datepicker/dist/react-datepicker.css";

import { getOrdersStats } from "../../actions/statsActions";

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };

    this.setDate = this.setDate.bind(this);
  }

  componentDidMount() {
    const date = {
      statsDate: this.state.date,
      user: this.props.auth.user.id,
    };
    this.props.getOrdersStats(date);
  }

  setDate(date) {
    this.setState({ date: date });
    const dt = {
      statsDate: date,
      user: this.props.auth.user.id,
    };
    this.props.getOrdersStats(dt);
  }

  render() {
    console.log("UserDashboard", this.props);

    const { stats, loading } = this.props.stats;

    let statsView;

    if (stats === null || loading) {
      statsView = <Spinner />;
    } else {
      const orderCountBoard = (
        <div className="card mt-2 mb-4 row">
          <div className="row card-body">
            <div className="col-5 row">
              <b
                className="col-2"
                style={{
                  textAlign: "right",
                  paddingRight: 0,
                }}
              >
                {stats.ordersCount}
              </b>
              <span className="col-10">New Orders</span>
            </div>
            <div className="col-5 row">
              <b
                className="col-2"
                style={{ textAlign: "right", paddingRight: 0 }}
              >
                {stats.deliveredCount}
              </b>
              <span className="col-10">Orders Delivered</span>
            </div>
            <div className="col-2">
              <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={this.state.date}
                onSelect={(date) => this.setDate(date)}
              />
            </div>
          </div>
        </div>
      );

      const stateCountBoard = (
        <div className="row mb-3">
          <div className="col-4 d-flex justify-content-center">
            <h6>
              <span className="badge badge-pill badge-danger">
                {stats.newOrderCount} New Orders
              </span>
            </h6>
          </div>
          <div className="col-4 d-flex justify-content-center">
            <h6>
              <span className="badge badge-pill badge-warning">
                {stats.inprogressCount} Inprogress
              </span>
            </h6>
          </div>
          <div className="col-4 d-flex justify-content-center">
            <h6>
              <span className="badge badge-pill badge-success">
                {stats.completedCount} Completed
              </span>
            </h6>
          </div>
        </div>
      );

      const total =
        stats.newOrderCount + stats.inprogressCount + stats.completedCount;

      let newOrderPercentage = 0;
      let inprogressCountPercentage = 0;
      let completedCountPercentage = 0;
      if (total !== 0) {
        newOrderPercentage = (stats.newOrderCount * 100) / total;
        inprogressCountPercentage = (stats.inprogressCount * 100) / total;
        completedCountPercentage = (stats.completedCount * 100) / total;
      }

      const progressBoard = (
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped bg-danger"
            style={{ width: newOrderPercentage + "%" }}
            data-toggle="tooltip"
            data-placement="bottom"
            title="New Orders"
          >
            {Math.round(newOrderPercentage)}%
          </div>
          <div
            className="progress-bar progress-bar-striped bg-warning"
            style={{ width: inprogressCountPercentage + "%" }}
            data-toggle="tooltip"
            data-placement="bottom"
            title="Inprogress Orders"
          >
            {Math.round(inprogressCountPercentage)}%
          </div>
          <div
            className="progress-bar progress-bar-striped bg-success"
            style={{ width: completedCountPercentage + "%" }}
            data-toggle="tooltip"
            data-placement="bottom"
            title="Completed Orders"
          >
            {Math.round(completedCountPercentage)}%
          </div>
        </div>
      );

      statsView = (
        <div className="container">
          <h4 className="mb-4">Tailor Dashboard</h4>
          <div className="row">
            <div className="col-md-8 m-auto">
              {orderCountBoard}
              {stateCountBoard}
              {progressBoard}
            </div>
          </div>
          <div />
        </div>
      );
    }

    return <div className="user-dashboard">{statsView}</div>;
  }
}

UserDashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  cust: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired,
  getOrdersStats: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cust: state.cust,
  order: state.order,
  errors: state.errors,
  stats: state.stats,
});

export default connect(mapStateToProps, { getOrdersStats })(UserDashboard);
