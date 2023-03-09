import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import TailorProfileItem from './TailorProfileItem';
import { getTailorsProfile } from '../../actions/profileActions';
// import { deleteTailor } from '../../actions/profileActions';

class TailorProfiles extends Component {
	componentDidMount() {
		this.props.getTailorsProfile();
	}

	// onDeleteClick(e) {
	// 	this.props.deleteTailor();
	// }

	render() {
		const { tailors, loading } = this.props.profiles;
		let profileItems;

		if (tailors === null || loading) {
				profileItems = <Spinner />;
		} else {
			if (tailors.length > 0) {
				profileItems = (
					<TailorProfileItem tailors={tailors} />
				);
			} else {
				profileItems = <h4>No tailors found...</h4>;
			}
		}

		return (
		<div className="profiles">
			<div className="container">
			<div className="row">
				<div className="col-md-12">
				{profileItems}
				</div>
			</div>
			</div>
		</div>
		);
	}
}

TailorProfiles.propTypes = {
	getTailorsProfile: PropTypes.func.isRequired,
	// deleteTailor: PropTypes.func.isRequired,
	profiles: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profiles: state.profiles
});

export default connect(mapStateToProps, { getTailorsProfile })(TailorProfiles);
