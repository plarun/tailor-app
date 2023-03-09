import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import CustomerListItem from './CustomerListItem';
import { getCustomers } from '../../actions/customerActions';

class CustomerList extends Component {
	componentDidMount() {
		this.props.getCustomers();
	}

	render() {
		const { customers, loading } = this.props.cust;
		let customerItems;

		if (customers === null || loading) {
			customerItems = <Spinner />;
		} else {
			if (customers.length > 0) {
				customerItems = (
					<CustomerListItem customers={customers} />
				);
			} else {
				// customerItems = <h4>No Customers found...</h4>;
				customerItems = (
					<CustomerListItem customers={customers} />
				);
			}
		}

		return (
		<div className="customerList">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						{customerItems}
					</div>
				</div>
			</div>
		</div>
		);
	}
}

CustomerList.propTypes = {
	getCustomers: PropTypes.func.isRequired,
	cust: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	cust: state.cust
});

export default connect(mapStateToProps, { getCustomers })(CustomerList);