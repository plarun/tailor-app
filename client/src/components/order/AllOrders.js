import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faShirt } from "@fortawesome/free-solid-svg-icons";
// import { faShirt } from '@fortawesome/free-solid-svg-icons';

// import { deleteExperience } from '../../actions/profileActions';

class AllOrders extends Component {
  // onDeleteClick(id) {
  // 	this.props.deleteExperience(id);
  // }

  onViewClick(id) {}

  render() {
    const orderItem = this.props.orderItem.map((order) => (
      <tr key={order._id}>
        <td>{order.tailor.name}</td>
        <td>{order.tailor.email}</td>
        <td>{order.customer.name}</td>
        <td>{order.customer.phone}</td>
        <td>{order.dressType.name}</td>
        <td>{order.order_date}</td>
        <td>{order.delivery_date}</td>
        <td>{order.order_status}</td>
        <td>{order.note}</td>
        <td>
          <FontAwesomeIcon
            icon={faTrash}
            // onClick={this.onDeleteClick.bind(this, exp._id)}
          />
          {/* <button
					
					className="btn btn-danger"
				>
					Delete
				</button> */}
        </td>
      </tr>
    ));

    return (
      <div>
        <div className="row">
          <div className="col-md-9">
            <h4 className="mb-4">All Orders</h4>
          </div>
          <div className="col-md-3"></div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>TailorName</th>
              <th>Email</th>
              <th>CustomerName</th>
              <th>CustomerPhoneNo</th>
              <th>DressType</th>
              <th>OrderDate</th>
              <th>DeliveryDate</th>
              <th>Status</th>
              <th>Notes</th>

              <th />
            </tr>
            {orderItem}
          </thead>
        </table>
      </div>
    );
  }
}

// TailorProfileItem.propTypes = {
//   deleteExperience: PropTypes.func.isRequired
// };

// export default connect(null, { deleteExperience })(TailorProfileItem);
export default AllOrders;
