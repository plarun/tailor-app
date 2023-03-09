import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import Landing from '../layout/Landing';

  
class Dashboard extends Component {
	render() {

		let view = ( <Landing /> )
		if (this.props.auth.user) {
			const { name } = this.props.auth.user
			if (name === "admin") {
				view = ( <AdminDashboard /> )
			} else {
				view = ( <UserDashboard /> )
			}
		}

		return (
			<div className="dashboard">
				<div className="row">
					<div className="col-md-12">{view}</div>
				</div>
			</div>
		)
	}
}

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
})

export default connect(mapStateToProps)(Dashboard); 