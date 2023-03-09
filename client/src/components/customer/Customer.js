import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faEdit } from '@fortawesome/free-solid-svg-icons'

import SizePanel from './SizePanel'

class Customer extends Component {
	// onDeleteClick(id) {
	// 	this.props.deleteExperience(id);
	// }

	constructor() {
		super();
		this.state = {
			showSizePanel: false,
			errors: {}
		};
		this.onClick = this.onClick.bind(this);
	}

	onClick(e) {
		let visibility = this.state.showSizePanel;
		this.setState({showSizePanel: !visibility});
	}

	render() {
		const customer = this.props.customer;

		let panelColor = "bg-white text-dark";
		let sizePanelIcon = (<FontAwesomeIcon icon={faCaretDown} role="button" onClick={this.onClick}/>)
		if (this.state.showSizePanel) {
			panelColor = "bg-dark text-white pt-2 pb-2"
			sizePanelIcon = (<FontAwesomeIcon icon={faCaretUp} role="button" onClick={this.onClick}/>)
		}

		return (
			<li className="list-group-item border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2" key={customer._id}>
				<div className={"row " + panelColor}>
					<div className="col-4">{customer.name}</div>
					<div className="col-4">{customer.phone}</div>
					<div className="col-2">{customer.gender}</div>
					<div className="col-1"><FontAwesomeIcon icon={faEdit} role="button"/></div>
					<div className="col-1">{sizePanelIcon}</div>
				</div>
				{ this.state.showSizePanel ? <SizePanel customer={customer}/> : null}
			</li>
		);
	}
}

// TailorProfileItem.propTypes = {
//   deleteExperience: PropTypes.func.isRequired
// };

// export default connect(null, { deleteExperience })(TailorProfileItem);
export default Customer