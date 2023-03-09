import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SelectListGroup from '../common/SelectListGroup';
import  TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createCustomers } from '../../actions/customerActions';

class CreateCustomers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			phone: '',
			gender: '',
			neck: '',
			shoulder: '',
			fullarm: '',
			halfarm: '',
			sleeve: '',
			wrist: '',
			elbow: '',
			chest: '',
			hip: '',
			body: '',
			thigh: '',
			knee: '',
			seat: '',
			leg_half: '',
			leg_full: '',
			ankle: '',
			errors: {},
			disabled: false
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.errors) {
			this.setState({errors: nextProps.errors});
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
	
		const customerItem = {
			name: this.state.name,
			phone: this.state.phone,
			gender: this.state.gender,
			neck: this.state.neck,
			shoulder: this.state.shoulder,
			fullarm: this.state.fullarm,
			halfarm: this.state.halfarm,
			sleeve: this.state.sleeve,
			wrist: this.state.wrist,
			elbow: this.state.elbow,
			chest: this.state.chest,
			hip: this.state.hip,
			body: this.state.body,
			thigh: this.state.thigh,
			knee: this.state.knee,
			seat: this.state.seat,
			leg_half: this.state.leg_half,
			leg_full: this.state.leg_full,
			ankle: this.state.ankle
		};
	
		this.props.createCustomers(customerItem, this.props.history);

		}
		render() {
		const { errors } = this.state;

		const options = [
			{ label: '* Select Gender', value: 0 },
			{ label: 'female', value: 'female' },
			{ label: 'male', value: 'male' }
		];

		return (
			<div className="create-customers">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<Link to="/customers" className="btn btn-light">
								Go Back
							</Link>
							<h1 className="display-4 text-center">Create New Customer</h1>
							<small className="d-block pb-3">* = required fields</small>
							<form noValidate onSubmit={this.onSubmit}>
							<TextFieldGroup
								placeholder="* Customer Name"
								name="name"
								value={this.state.name}
								onChange={this.onChange}
								error={errors.name}
							/>
							<TextFieldGroup
								placeholder="* Mobile No."
								name="phone"
								value={this.state.phone}
								onChange={this.onChange}
								error={errors.phone}
							/>
							<SelectListGroup
								placeholder="* Gender"
								name="gender"
								value={this.state.gender}
								onChange={this.onChange}
								options={options}
								error={errors.gender}
							/>
							<div>
								<h5>Upper Size Data</h5>
								<div>
								<div class="form-row">
									<label>Neck </label>
									<div class="col">
										<TextFieldGroup
											placeholder="0'0"
											name="neck"
											value={this.state.neck}
											onChange={this.onChange}
											error={errors.neck}
										/>
									</div>
									<label> Shoulder </label>
									<div class="col">
										<TextFieldGroup
											placeholder="0'0"
											name="shoulder"
											value={this.state.shoulder}
											onChange={this.onChange}
											error={errors.shoulder}
										/>
									</div>
									<label> Fullarm </label>
									<div class="col">
										<TextFieldGroup
											placeholder="0'0"
											name="fullarm"
											value={this.state.fullarm}
											onChange={this.onChange}
											error={errors.fullarm}
										/>
									</div>
								</div>
								<div class="form-row">
									<label>Halfarm </label>
									<div class="col">
										<TextFieldGroup
											placeholder="0'0"
											name="halfarm"
											value={this.state.halfarm}
											onChange={this.onChange}
											error={errors.halfarm}
										/>
									</div>
									<label> Sleeve </label>
									<div class="col">
										<TextFieldGroup
											placeholder="0'0"
											name="sleeve"
											value={this.state.sleeve}
											onChange={this.onChange}
											error={errors.sleeve}
										/>
									</div>
									<label> Wrist </label>
									<div class="col">
										<TextFieldGroup
											placeholder="0'0"
											name="wrist"
											value={this.state.wrist}
											onChange={this.onChange}
											error={errors.wrist}
										/>
									</div>	
								</div>
								<div class="form-row">
									<label>Elbow </label>
									<div class="col">
										<TextFieldGroup
											placeholder="0'0"
											name="elbow"
											value={this.state.elbow}
											onChange={this.onChange}
											error={errors.elbow}
										/>
									</div>
									<label> Chest </label>
									<div class="col">
										<TextFieldGroup
											placeholder="0'0"
											name="chest"
											value={this.state.chest}
											onChange={this.onChange}
											error={errors.chest}
										/>
									</div>
									<label> Hip </label>
									<div class="col">
										<TextFieldGroup
											placeholder="0'0"
											name="hip"
											value={this.state.hip}
											onChange={this.onChange}
											error={errors.hip}
										/>
									</div>	
									<label> Body </label>
									<div class="col">
										<TextFieldGroup
											placeholder="0'0"
											name="body"
											value={this.state.body}
											onChange={this.onChange}
											error={errors.body}
										/>
									</div>
								</div>
								</div>
							</div>
							<div>
								<h5>Lower Size Data</h5>
								<div>
								<div class="form-row">
									<label>Thigh </label>
									<div class="col">
										<TextFieldGroup
											placeholder="0'0"
											name="thigh"
											value={this.state.thigh}
											onChange={this.onChange}
											error={errors.thigh}
										/>
									</div>
									<label> Knee </label>
									<div class="col">
										<TextFieldGroup
											placeholder="0'0"
											name="knee"
											value={this.state.knee}
											onChange={this.onChange}
											error={errors.knee}
										/>
									</div>
									<label> Seat </label>
									<div class="col">
										<TextFieldGroup
											placeholder="0'0"
											name="seat"
											value={this.state.seat}
											onChange={this.onChange}
											error={errors.seat}
										/>
									</div>
								</div>
								<div class="form-row">
									<label>LegHalf </label>
									<div class="col">
										<TextFieldGroup
											placeholder="0'0"
											name="leg_half"
											value={this.state.leg_half}
											onChange={this.onChange}
											error={errors.leg_half}
										/>
									</div>
									<label> LegFull </label>
									<div class="col">
										<TextFieldGroup
											placeholder="0'0"
											name="leg_full"
											value={this.state.leg_full}
											onChange={this.onChange}
											error={errors.leg_full}
										/>
									</div>
									<label> Ankle </label>
									<div class="col">
										<TextFieldGroup
											placeholder="0'0"
											name="ankle"
											value={this.state.ankle}
											onChange={this.onChange}
											error={errors.ankle}
										/>
									</div>	
								</div>
								</div>
							</div>
							<input
								type="submit"
								value="Submit"
								className="btn btn-info btn-block mt-4"
							/>
							</form>
						</div>
					</div>
				</div>
				
			</div>
		)

	}

}

CreateCustomers.propTypes = {
	createCustomers: PropTypes.func.isRequired,
	cust: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	cust: state.cust,
	errors: state.errors
});

export default connect(mapStateToProps, {createCustomers})(withRouter(CreateCustomers));