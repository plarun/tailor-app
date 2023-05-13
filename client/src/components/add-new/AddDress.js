import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import SelectListGroup from "../common/SelectListGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addDress } from "../../actions/dressActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

class AddDresstypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      name: "",
      cost: "",
      errors: {},
      disabled: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const dressItem = {
      gender: this.state.gender,
      name: this.state.name,
      cost: this.state.cost,
    };

    this.props.addDress(dressItem, this.props.history);
  }

  render() {
    const { errors } = this.state;

    const options = [
      { label: "* Select Gender", value: 0 },
      { label: "female", value: "female" },
      { label: "male", value: "male" },
    ];

    return (
      <div className="add-dresstypes">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dress" className="btn btn-light">
                <FontAwesomeIcon icon={faArrowLeft} />
              </Link>
              <h4 className="text-center">Add New Dress</h4>
              <small className="d-block pb-3 text-danger">
                * = required fields
              </small>
              <form noValidate onSubmit={this.onSubmit}>
                <SelectListGroup
                  placeholder="* Gender"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.onChange}
                  options={options}
                  error={errors.gender}
                />
                <TextFieldGroup
                  placeholder="* Dress Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="* Cost"
                  name="cost"
                  value={this.state.cost}
                  onChange={this.onChange}
                  error={errors.cost}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddDresstypes.propTypes = {
  addDress: PropTypes.func.isRequired,
  dress: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dress: state.dress,
  errors: state.errors,
});

export default connect(mapStateToProps, { addDress })(
  withRouter(AddDresstypes)
);
