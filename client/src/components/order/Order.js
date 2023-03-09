import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faEdit } from '@fortawesome/free-solid-svg-icons'

import NotePanel from './NotePanel'

class Order extends Component {
	// onDeleteClick(id) {
	// 	this.props.deleteExperience(id);
	// }

	constructor() {
		super();
		this.state = {
			showNotePanel: false,
			errors: {}
		};
		this.onClick = this.onClick.bind(this);
	}

	onClick(e) {
		let visibility = this.state.showNotePanel;
		this.setState({showNotePanel: !visibility});
	}

	render() {
		const order = this.props.order;

		let panelColor = "bg-white text-dark";
		let notePanelIcon = (<FontAwesomeIcon icon={faCaretDown} role="button" onClick={this.onClick}/>)
		if (this.state.showNotePanel) {
			panelColor = "bg-dark text-white pt-2 pb-2"
			notePanelIcon = (<FontAwesomeIcon icon={faCaretUp} role="button" onClick={this.onClick}/>)
		}

		return (
			<li className="list-group-item border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2" key={order._id}>
				<div className={"row " + panelColor}>
					<div className="col-2">{order.customer.name}</div>
					<div className="col-2">{order.customer.phone}</div>
					<div className="col-2">{order.dressType.name}</div>
					<div className="col-2">{order.order_date}</div>
					<div className="col-2">{order.delivery_date}</div>
					<div className="col-2">{order.order_status}</div>
					<div className="col-1">{notePanelIcon}</div>
				</div>
				{ this.state.showNotePanel ? <NotePanel note={order.note}/> : null}
			</li>
		);
	}
}

// TailorProfileItem.propTypes = {
//   deleteExperience: PropTypes.func.isRequired
// };

// export default connect(null, { deleteExperience })(TailorProfileItem);
export default Order