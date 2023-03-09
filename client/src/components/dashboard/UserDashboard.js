import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class UserDashboard extends Component {
	render() {
		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Tailor Dashboard</h1>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

UserDashboard.propTypes = {
	auth: PropTypes.object.isRequired,
	cust: PropTypes.object.isRequired,
	order: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	cust: state.cust,
	order: state.order,
	errors: state.errors
});

export default connect(mapStateToProps)(UserDashboard); 