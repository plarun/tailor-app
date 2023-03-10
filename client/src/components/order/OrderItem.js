import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
// import { deleteExperience } from '../../actions/profileActions';

import Order from './Order';

class OrderItem extends Component {
	// onDeleteClick(id) {
	// 	this.props.deleteExperience(id);
	// }

	render() {
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
								<FontAwesomeIcon icon= {faUser} />
								<span>   New Order</span>
							</div>
						</Link>
					
					</div>
			</div>
			
			<ul className="list-group mb-0">
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