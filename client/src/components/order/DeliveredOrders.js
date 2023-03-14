import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";

import { getDeliveredOrders } from "../../actions/orderActions";
import DeliveredOrderItem from "./DeliveredOrderItem";

class DeliveredOrders extends Component {
  constructor(props) {
    super(props);
    this.refreshOrder = this.refreshOrder.bind(this);
  }

  componentDidMount() {
    this.props.getDeliveredOrders(this.props.auth.user.id);
  }

  refreshOrder() {
    this.props.getDeliveredOrders(this.props.auth.user.id);
  }

  render() {
    const { orders, loading } = this.props.order;
    let deliveredOrders;

    if (orders === null || loading) {
      deliveredOrders = <Spinner />;
    } else {
      deliveredOrders = (
        <DeliveredOrderItem
          orders={orders}
          refreshCallback={this.refreshOrder}
        />
      );
    }

    return (
      <div className="orders">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{deliveredOrders}</div>
          </div>
        </div>
      </div>
    );
  }
}

DeliveredOrders.propTypes = {
  getDeliveredOrders: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.order,
  auth: state.auth,
});

export default connect(mapStateToProps, { getDeliveredOrders })(
  DeliveredOrders
);
