import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AdminRegister } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			password2: '',
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.errors) {
			this.setState({errors: nextProps.errors});
		}
	}
	

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});
	}

	onSubmit(e) {
		e.preventDefault();

		const newUser = {
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		}

		this.props.AdminRegister(newUser, this.props.history);
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Admin Sign Up</h1>
							{/* <p className="lead text-center">Create your account</p> */}
							<form noValidate onSubmit={this.onSubmit}>
							<TextFieldGroup
								placeholder="Email Address"
								name="email"
								type="email"
								value={this.state.email}
								onChange={this.onChange}
								error={errors.email}
							/>
							<TextFieldGroup
								placeholder="Password"
								name="password"
								type="password"
								value={this.state.password}
								onChange={this.onChange}
								error={errors.password}
							/>
							<TextFieldGroup
								placeholder="Confirm Password"
								name="password2"
								type="password"
								value={this.state.password2}
								onChange={this.onChange}
								error={errors.password2}
							/>
							<input type="submit" className="btn btn-info btn-block mt-4" value="Submit"/>
							</form>
						</div>
					</div>
				</div>
			</div>
		
		)
	}
}

Register.propTypes = {
	AdminRegister: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { AdminRegister })(withRouter(Register)); 