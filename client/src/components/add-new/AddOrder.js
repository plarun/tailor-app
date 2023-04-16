import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import DatePicker from "react-datepicker";

import SelectListGroup from "../common/SelectListGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addOrder } from "../../actions/orderActions";
import { getDresslists } from "../../actions/dresslistActions";
import { getCustomerByPhone } from "../../actions/customerActions";
import { clearOrderCustomer } from "../../actions/orderActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

class AddOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dressTypes: [],
      customerPhone: "",
      dressType: "",
      dueDate: new Date(),
      orderStatus: "New Order",
      note: "",
      errors: {},
      disabled: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setDate = this.setDate.bind(this);

    this.onFetchCust = this.onFetchCust.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.dress.dresslist) {
      const { dresslist } = nextProps.dress;
      var items = [];
      items.push({
        label: "* Choose Dress",
        value: 0,
      });
      for (let i = 0; i < dresslist.length; i++) {
        let item = {
          label: dresslist[i].name,
          value: dresslist[i]._id,
        };
        items.push(item);
      }

      this.setState({ dressTypes: items });
    }
  }

  componentDidMount() {
    this.props.clearOrderCustomer();
    this.props.getDresslists();
  }

  setDate(date) {
    this.setState({ dueDate: date });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const orderItem = {
      customer: this.props.order.customer[0]._id,
      user: this.props.auth.user.id,
      dressType: this.state.dressType,
      dueDate: this.state.dueDate,
      orderStatus: this.state.orderStatus,
      note: this.state.note,
    };

    console.log(orderItem);

    this.props.addOrder(orderItem, this.props.history);
  }

  onFetchCust(e) {
    e.preventDefault();

    const phone = {
      phone: this.state.customerPhone,
    };

    this.props.getCustomerByPhone(phone);
  }

  render() {
    const { dresslist, loading } = this.props.dress;
    let view;
    const { errors } = this.state;

    if (dresslist === null || loading) {
      view = <Spinner />;
    } else {
      let customerPanel = (
        <form noValidate onSubmit={this.onFetchCust}>
          <div className="row">
            <div className="col-md-6">
              <TextFieldGroup
                placeholder="* Customer Phone"
                name="customerPhone"
                value={this.state.customerPhone}
                onChange={this.onChange}
                error={errors.customers}
              />
            </div>
            <div className="col-md-2">
              <input
                type="submit"
                value="Get Customer"
                className="btn btn-info"
              />
            </div>
          </div>
        </form>
      );
      if (this.props.order.customer && this.props.order.customer.length > 0) {
        customerPanel = (
          <div className="alert alert-primary">
            {this.props.order.customer[0].name}
          </div>
        );
      }

      view = (
        <div className="col-md-8 m-auto">
          <Link
            to="/orders"
            className="btn btn-light"
            onClick={this.props.clearOrderCustomer}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h4 className="text-center">Create New Order</h4>
          <small className="d-block pb-3 text-danger">
            * = required fields
          </small>

          {customerPanel}

          <SelectListGroup
            placeholder="* Dress"
            name="dressType"
            value={this.state.dressType}
            onChange={this.onChange}
            options={this.state.dressTypes}
            error={errors.dressType}
          />

          <form noValidate onSubmit={this.onSubmit}>
            <TextAreaFieldGroup
              placeholder="Notes"
              name="note"
              value={this.state.note}
              onChange={this.onChange}
              error={errors.note}
            />
            {/* <TextFieldGroup
              placeholder="Deliverable in days"
              name="deliveryDays"
              value={this.state.deliveryDays}
              onChange={this.onChange}
              error={errors.deliveryDays}
            /> */}
            <div className="form-group row">
              <label htmlFor="dueDate" className="col-sm-2 col-form-label">
                DueDate
              </label>
              <div className="col">
                <DatePicker
                  className="col form-control border border-secondary rounded"
                  id="dueDate"
                  dateFormat="dd-MM-yyyy"
                  selected={this.state.dueDate}
                  onSelect={(date) => this.setDate(date)}
                />
              </div>
            </div>
            <input
              type="submit"
              value="Submit"
              className="btn btn-info btn-block mt-4"
            />
          </form>
        </div>
      );
    }

    return (
      <div className="add-order">
        <div className="container">
          <div className="row">{view}</div>
        </div>
      </div>
    );
  }
}

AddOrder.propTypes = {
  addOrder: PropTypes.func.isRequired,
  getDresslists: PropTypes.func.isRequired,
  clearOrderCustomer: PropTypes.func.isRequired,
  dress: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dress: state.dress,
  auth: state.auth,
  order: state.order,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  addOrder,
  getDresslists,
  getCustomerByPhone,
  clearOrderCustomer,
})(withRouter(AddOrder));
