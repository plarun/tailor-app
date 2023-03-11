import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

// import { deleteExperience } from '../../actions/profileActions';

class DresslistItem extends Component {
  // onDeleteClick(id) {
  // 	this.props.deleteExperience(id);
  // }

  onViewClick(id) {}

  render() {
    const dresslist = this.props.dresslist.map((dress) => (
      <tr key={dress._id}>
        <td>{dress.gender}</td>
        <td>{dress.name}</td>
        <td>{dress.cost}</td>
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
            <h4 className="mb-4">Dress Lists</h4>
          </div>
          <div className="col-md-3">
            <Link to="/add-dresstypes">
              <div className="btn btn-outline-info">
                <FontAwesomeIcon icon={faPlus} />
                <span> New Dress</span>
              </div>
            </Link>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Gender</th>
              <th>Dress Name</th>
              <th>Cost</th>
              <th />
            </tr>
            {dresslist}
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
export default DresslistItem;
