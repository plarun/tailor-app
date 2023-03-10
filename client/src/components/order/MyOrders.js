import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';

import {getMyOrders} from '../../actions/orderActions'
import OrderItem from './OrderItem';

class MyOrders extends Component {
    
	componentDidMount() {
		this.props.getMyOrders();
	}

	// onDeleteClick(e) {
	// 	this.props.deleteTailor();
	// }

	render() {
		const { orders, loading } = this.props.order;
		let myorders;

		if (orders === null || loading) {
            myorders = <Spinner />;
		} else {
			if (orders.length > 0) {
				myorders = (
					<OrderItem orders={orders} />
				);
			} else {
				myorders = (
					<OrderItem orders={orders} />
				);
			}
		}

		return (
		<div className="orders">
			<div className="container">
			<div className="row">
				<div className="col-md-12">
				{myorders}
				</div>
			</div>
			</div>
		</div>
		);
	}
}

MyOrders.propTypes = {
	getMyOrders: PropTypes.func.isRequired,
	order: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	order: state.order
});

export default connect(mapStateToProps, { getMyOrders })(MyOrders);
