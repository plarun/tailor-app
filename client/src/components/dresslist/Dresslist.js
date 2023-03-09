import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import DresslistItem from './DresslistItem';
import { getDresslists } from '../../actions/dresslistActions';

class Dresslist extends Component {
	componentDidMount() {
		this.props.getDresslists();
	}

	render() {
		const { dresslist, loading } = this.props.dress;
		let dressItems;

		if (dresslist === null || loading) {
				dressItems = <Spinner />;
		} else {
			if (dresslist.length > 0) {
				dressItems = (
					<DresslistItem dresslist={dresslist} />
				);
			} else {
				// dressItems = <h4>No dresslist found...</h4>;
				dressItems = (
					<DresslistItem dresslist={dresslist} />
				);
			}
		}

		return (
		<div className="dresslist">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						{dressItems}
					</div>
				</div>
			</div>
		</div>
		);
	}
}

Dresslist.propTypes = {
	getDresslists: PropTypes.func.isRequired,
	dress: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	dress: state.dress
});

export default connect(mapStateToProps, { getDresslists })(Dresslist);