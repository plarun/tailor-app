import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCustomers } from '../../actions/customerActions';

class SizePanel extends Component {
	render() {
		const customer = this.props.customer;
		const upper = customer.upper[0]
		const lower = customer.lower[0]

		console.log(customer)

		return (
			<div className="row">
				<div className="card mt-2 mb-4">
					<div className="card-header">Upper Body</div>
					<div className="row card-body">
						<div className="col-2">Neck : {upper.neck}</div>
						<div className="col-2">Shoulder : {upper.shoulder}</div>
						<div className="col-2">Full Arm : {upper.fullarm}</div>
						<div className="col-2">Half Arm : {upper.halfarm}</div>
						<div className="col-2">Sleeve : {upper.sleeve}</div>
						<div className="col-2">Wrist : {upper.wrist}</div>
						<div className="col-2">Elbow : {upper.elbow}</div>
						<div className="col-2">Chest : {upper.chest}</div>
						<div className="col-2">Hip : {upper.hip}</div>
						<div className="col-2">Body : {upper.body}</div>
					</div>
					<div className="card-header">Lower Body</div>
					<div className="row card-body">
						<div className="col-2">Thigh : {lower.thigh}</div>
						<div className="col-2">Knee : {lower.knee}</div>
						<div className="col-2">Seat : {lower.seat}</div>
						<div className="col-2">Leg Half : {lower.leg_half}</div>
						<div className="col-2">Leg Full : {lower.leg_full}</div>
						<div className="col-2">Ankle : {lower.ankle}</div>
					</div>
				</div>
			</div>
		);
	}
}

SizePanel.propTypes = {
	getCustomers: PropTypes.func.isRequired,
	cust: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	cust: state.cust
});

export default connect(mapStateToProps, { getCustomers })(SizePanel);