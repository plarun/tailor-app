import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AdminDashboard extends Component {
	render() {
		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Admin Dashboard</h1>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

AdminDashboard.propTypes = {
	auth: PropTypes.object.isRequired,
	dress: PropTypes.object.isRequired,
	profiles: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profiles: state.profiles,
	dress: state.dress,
	errors: state.errors
});

export default connect(mapStateToProps)(AdminDashboard); 