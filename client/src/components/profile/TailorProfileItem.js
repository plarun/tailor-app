import React, { Component } from "react";
import { connect } from "mongoose";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

class TailorProfileItem extends Component {
  // onDeleteClick(e) {
  // 	this.props.deleteTailor();
  // }

  render() {
    const profiles = this.props.tailors.map((profile) => (
      <tr key={profile._id}>
        <td>{profile.name}</td>
        <td>{profile.email}</td>
        <td>{profile.date}</td>
        <td>
          <FontAwesomeIcon
            icon={faTrash}
            // onClick={this.onDeleteClick.bind(this)}
          />
          {/* <button
					// onClick={this.onDeleteClick.bind(this, profile)}
					className="btn btn-danger"
				>
					Delete
				</button> */}
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Tailors Profile</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email Id</th>
              <th>Working From</th>
              <th />
            </tr>
            {profiles}
          </thead>
        </table>
      </div>
    );
  }
}

// TailorProfileItem.propTypes = {
// 	profiles: PropTypes.object.isRequired,
// 	deleteTailor: PropTypes.func.isRequired
// };
// const mapStateToProps = state => ({
// 	profiles: state.profiles
// })

// export default connect(mapStateToProps, { deleteTailor })(TailorProfileItem);
export default TailorProfileItem;
