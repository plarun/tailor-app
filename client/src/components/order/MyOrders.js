import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";

import { getMyOrders } from "../../actions/orderActions";
import OrderItem from "./OrderItem";

class MyOrders extends Component {
  constructor(props) {
    super(props);
    this.refreshOrder = this.refreshOrder.bind(this);
  }

  componentDidMount() {
    this.props.getMyOrders(this.props.auth.user.id);
  }

  refreshOrder() {
    this.props.getMyOrders(this.props.auth.user.id);
  }

  render() {
    const { orders, loading } = this.props.order;
    let myorders;

    if (orders === null || loading) {
      myorders = <Spinner />;
    } else {
      myorders = (
        <OrderItem orders={orders} refreshCallback={this.refreshOrder} />
      );
    }

    return (
      <div className="orders">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{myorders}</div>
          </div>
        </div>
      </div>
    );
  }
}

MyOrders.propTypes = {
  getMyOrders: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.order,
  auth: state.auth,
});

export default connect(mapStateToProps, { getMyOrders })(MyOrders);
