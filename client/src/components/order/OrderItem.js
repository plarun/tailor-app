import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
// import { deleteExperience } from '../../actions/profileActions';

import Order from './Order';

class OrderItem extends Component {
	// onDeleteClick(id) {
	// 	this.props.deleteExperience(id);
	// }

	render() {
		const header = (
			<li className="list-group-item border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
				<div className={"row"}>
					<div className="col-4 font-weight-bold">Customer</div>
					<div className="col-3 font-weight-bold">Dress</div>
					<div className="col-1 font-weight-bold">Ordered On</div>
					<div className="col-1 font-weight-bold">Due On</div>
					<div className="col-1 font-weight-bold">Status</div>
					<div className="col-1"></div>
					<div className="col-1"></div>
				</div>
			</li>
		);

		const orders = this.props.orders.map( order => (
			<Order order={order} key={order._id}/>
		));

		return (
		<div>
			<div className="row">
				<div className="col-md-9">
					<h4 className="mb-4">Orders</h4>
				</div>
				<div className="col-md-3">
					
						<Link to="/add-order">
							<div className="btn btn-outline-info">
								<FontAwesomeIcon icon= {faPlus} />
								<span>   New Order</span>
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
export default OrderItem