import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

import { deleteDress } from "../../actions/dressActions";

class DresslistItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  deleteDress(id) {
    this.props.deleteDress(id);
    this.props.refreshDressCallback();
  }

  render() {
    const dresslist = this.props.dresslist
      .filter(
        (dress) =>
          this.state.query === "" ||
          dress.name.toLowerCase().startsWith(this.state.query.toLowerCase())
      )
      .map((dress) => (
        <li
          className="list-group-item border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2"
          key={dress._id}
        >
          <div className="row">
            <div className="col-4">{dress.name}</div>
            <div className="col-4">{dress.gender}</div>
            <div className="col-3">{dress.cost}</div>
            <div className="col-1">
              <FontAwesomeIcon
                icon={faTrash}
                role="button"
                onClick={this.deleteDress.bind(this, dress._id)}
              />
            </div>
          </div>
        </li>
      ));

    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <h4 className="mb-4">Dress Lists</h4>
          </div>
          <div className="col-md- 6">
            <input
              type="text"
              className="form-control"
              placeholder="Search Dress"
              value={this.state.query}
              onChange={this.onChange}
              name="query"
            />
          </div>
          <div className="col-md-2">
            <Link to="/add-dresstypes">
              <div className="btn btn-outline-primary">
                <FontAwesomeIcon icon={faPlus} />
                <span> Dress</span>
              </div>
            </Link>
          </div>
        </div>

        <li className="list-group-item border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
          <div className={"row"}>
            <div className="col-4 font-weight-bold my-auto">Customer</div>
            <div className="col-4 font-weight-bold my-auto">Dress</div>
            <div className="col-3 font-weight-bold my-auto">Cost</div>
            <div className="col-1"></div>
          </div>
        </li>
        {dresslist}
      </div>
    );
  }
}

DresslistItem.propTypes = {
  deleteDress: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteDress })(DresslistItem);
