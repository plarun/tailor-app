import React, { Component } from "react";
import { connect } from "mongoose";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

class TailorProfileItem extends Component {
  constructor(props) {
    super(props);

    this.formatDate = this.formatDate.bind(this);
  }

  formatDate(date) {
    var d = new Date(date);
    d.setDate(d.getDate());

    var month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  render() {
    const profiles = this.props.tailors.map((profile) => (
      <li
        className="list-group-item border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
        key={profile._id}
      >
        <div className="row">
          <div className="col-4">{profile.name}</div>
          <div className="col-4">{profile.email}</div>
          <div className="col-3">{this.formatDate(profile.date)}</div>
          <div className="col-1">
            <FontAwesomeIcon
              icon={faTrash}
              role="button"
              onClick={this.deleteDress}
            />
          </div>
        </div>
      </li>
    ));

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h4 className="mb-4">Tailors Profile</h4>
          </div>
        </div>

        <li className="list-group-item border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
          <div className={"row"}>
            <div className="col-4 font-weight-bold">Tailor</div>
            <div className="col-4 font-weight-bold">Email Id</div>
            <div className="col-3 font-weight-bold">Working From</div>
            <div className="col-1"></div>
          </div>
        </li>
        {profiles}
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
