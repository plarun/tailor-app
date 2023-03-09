import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
// import { deleteExperience } from '../../actions/profileActions';

import Customer from './Customer';

class CustomerListItem extends Component {
	// onDeleteClick(id) {
	// 	this.props.deleteExperience(id);
	// }

	render() {
		const customers = this.props.customers.map( customer => (
			<Customer customer={customer} key={customer._id}/>
		));

		return (
		<div>
			<div className="row">
				<div className="col-md-9">
					<h4 className="mb-4">Customers</h4>
				</div>
				<div className="col-md-3">
					
						<Link to="/create-customers">
							<div className="btn btn-outline-info">
								<FontAwesomeIcon icon= {faUser} />
								<span>   New Customer</span>
							</div>
						</Link>
					
					</div>
			</div>
			
			<ul className="list-group mb-0">
				{customers}
			</ul>
		</div>
		);
	}
}

// TailorProfileItem.propTypes = {
//   deleteExperience: PropTypes.func.isRequired
// };

// export default connect(null, { deleteExperience })(TailorProfileItem);
export default CustomerListItem