import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import SelectListGroup from "../common/SelectListGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createCustomers } from "../../actions/customerActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

class CreateCustomers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      gender: "",
      neck: "",
      shoulder: "",
      fullarm: "",
      halfarm: "",
      sleeve: "",
      wrist: "",
      elbow: "",
      chest: "",
      hip: "",
      body: "",
      thigh: "",
      knee: "",
      seat: "",
      leg_half: "",
      leg_full: "",
      ankle: "",
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

    const customerItem = {
      name: this.state.name,
      phone: this.state.phone,
      gender: this.state.gender,
      neck: this.state.neck,
      shoulder: this.state.shoulder,
      fullarm: this.state.fullarm,
      halfarm: this.state.halfarm,
      sleeve: this.state.sleeve,
      wrist: this.state.wrist,
      elbow: this.state.elbow,
      chest: this.state.chest,
      hip: this.state.hip,
      body: this.state.body,
      thigh: this.state.thigh,
      knee: this.state.knee,
      seat: this.state.seat,
      leg_half: this.state.leg_half,
      leg_full: this.state.leg_full,
      ankle: this.state.ankle,
    };

    this.props.createCustomers(customerItem, this.props.history);
  }
  render() {
    const { errors } = this.state;

    const options = [
      { label: "* Select Gender", value: 0 },
      { label: "female", value: "female" },
      { label: "male", value: "male" },
    ];

    return (
      <div className="create-customers">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/customers" className="btn btn-light">
                <FontAwesomeIcon icon={faArrowLeft} />
              </Link>
              <h4 className="text-center">Create New Customer</h4>
              <small className="d-block pb-3 text-danger">
                * = required fields
              </small>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Customer Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="* Mobile No."
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                  error={errors.phone}
                />
                <SelectListGroup
                  placeholder="* Gender"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.onChange}
                  options={options}
                  error={errors.gender}
                />
                <div className="card mt-2 mb-4">
                  <div className="card-header">Upper</div>
                  <div className="row card-body">
                    <div className="form-row">
                      <div class="form-group col-md-3">
                        <label for="neck">Neck</label>
                        <TextFieldGroup
                          placeholder="0'0"
                          name="neck"
                          value={this.state.neck}
                          onChange={this.onChange}
                          error={errors.neck}
                          className="form-control"
                          id="neck"
                        />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="shoulder">Shoulder</label>
                        <TextFieldGroup
                          placeholder="0'0"
                          name="shoulder"
                          value={this.state.shoulder}
                          onChange={this.onChange}
                          error={errors.shoulder}
                          className="form-control"
                          id="shoulder"
                        />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="fullarm">Fullarm</label>
                        <TextFieldGroup
                          placeholder="0'0"
                          name="fullarm"
                          value={this.state.fullarm}
                          onChange={this.onChange}
                          error={errors.fullarm}
                          className="form-control"
                          id="fullarm"
                        />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="halfarm">Halfarm</label>
                        <TextFieldGroup
                          placeholder="0'0"
                          name="halfarm"
                          value={this.state.halfarm}
                          onChange={this.onChange}
                          error={errors.halfarm}
                          className="form-control"
                          id="halfarm"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div class="form-group col-md-3">
                        <label for="sleeve">Sleeve</label>
                        <TextFieldGroup
                          placeholder="0'0"
                          name="sleeve"
                          value={this.state.sleeve}
                          onChange={this.onChange}
                          error={errors.sleeve}
                          className="form-control"
                          id="sleeve"
                        />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="wrist">Wrist</label>
                        <TextFieldGroup
                          placeholder="0'0"
                          name="wrist"
                          value={this.state.wrist}
                          onChange={this.onChange}
                          error={errors.wrist}
                          className="form-control"
                          id="wrist"
                        />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="elbow">Elbow</label>
                        <TextFieldGroup
                          placeholder="0'0"
                          name="elbow"
                          value={this.state.elbow}
                          onChange={this.onChange}
                          error={errors.elbow}
                          className="form-control"
                          id="elbow"
                        />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="chest">Chest</label>
                        <TextFieldGroup
                          placeholder="0'0"
                          name="chest"
                          value={this.state.chest}
                          onChange={this.onChange}
                          error={errors.chest}
                          className="form-control"
                          id="chest"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div class="form-group col-md-3">
                        <label for="hip">Hip</label>
                        <TextFieldGroup
                          placeholder="0'0"
                          name="hip"
                          value={this.state.hip}
                          onChange={this.onChange}
                          error={errors.hip}
                          className="form-control"
                          id="hip"
                        />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="body">Body</label>
                        <TextFieldGroup
                          placeholder="0'0"
                          name="body"
                          value={this.state.body}
                          onChange={this.onChange}
                          error={errors.body}
                          className="form-control"
                          id="body"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mt-2 mb-4">
                  <div className="card-header">Lower</div>
                  <div className="row card-body">
                    <div className="form-row">
                      <div class="form-group col-md-3">
                        <label for="thigh">Thigh</label>
                        <TextFieldGroup
                          placeholder="0'0"
                          name="thigh"
                          value={this.state.thigh}
                          onChange={this.onChange}
                          error={errors.thigh}
                          className="form-control"
                          id="thigh"
                        />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="knee">Knee</label>
                        <TextFieldGroup
                          placeholder="0'0"
                          name="knee"
                          value={this.state.knee}
                          onChange={this.onChange}
                          error={errors.knee}
                          className="form-control"
                          id="knee"
                        />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="seat">Seat</label>
                        <TextFieldGroup
                          placeholder="0'0"
                          name="seat"
                          value={this.state.seat}
                          onChange={this.onChange}
                          error={errors.seat}
                          className="form-control"
                          id="seat"
                        />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="leg_half">LegHalf</label>
                        <TextFieldGroup
                          placeholder="0'0"
                          name="leg_half"
                          value={this.state.leg_half}
                          onChange={this.onChange}
                          error={errors.leg_half}
                          className="form-control"
                          id="leg_half"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div class="form-group col-md-3">
                        <label for="leg_full">LegFull</label>
                        <TextFieldGroup
                          placeholder="0'0"
                          name="leg_full"
                          value={this.state.leg_full}
                          onChange={this.onChange}
                          error={errors.leg_full}
                          className="form-control"
                          id="leg_full"
                        />
                      </div>
                      <div class="form-group col-md-3">
                        <label for="ankle">Ankle</label>
                        <TextFieldGroup
                          placeholder="0'0"
                          name="ankle"
                          value={this.state.ankle}
                          onChange={this.onChange}
                          error={errors.ankle}
                          className="form-control"
                          id="ankle"
                        />
                      </div>
                    </div>
                  </div>
                </div>
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

CreateCustomers.propTypes = {
  createCustomers: PropTypes.func.isRequired,
  cust: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cust: state.cust,
  errors: state.errors,
});

export default connect(mapStateToProps, { createCustomers })(
  withRouter(CreateCustomers)
);
