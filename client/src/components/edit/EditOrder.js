import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { updateOrder } from "../../actions/orderActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";

class EditOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dueDate: new Date(),
      orderStatus: "New Order",
      note: "",
      errors: {},
      disabled: false,
      isDelivered: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChecked = this.onChecked.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  componentDidMount() {
    if (this.props.order.order) {
      const { order } = this.props.order;

      this.setState({ note: order.note });
      this.setState({ orderStatus: order.orderStatus });
      this.setState({ dueDate: new Date(order.dueDate) });
    }
  }

  setDate(date) {
    this.setState({ dueDate: date });
  }

  onChecked(e) {
    this.setState({ isDelivered: e.target.checked });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { order } = this.props.order;

    let orderStatus = this.state.orderStatus;
    let deliveredOn = null;
    if (this.state.isDelivered) {
      orderStatus = "Delivered";
      deliveredOn = new Date();
    }

    const orderItem = {
      _id: order._id,
      note: this.state.note,
      orderStatus: orderStatus,
      dueDate: this.state.dueDate,
      deliveredOn: deliveredOn,
    };

    this.props.updateOrder(orderItem, this.props.history);
  }

  render() {
    const { errors } = this.state;

    const options = [
      { label: "* Order Status", value: 0 },
      { label: "New Order", value: "New Order" },
      { label: "Inprogress", value: "Inprogress" },
      { label: "Completed", value: "Completed" },
    ];

    const { order, loading } = this.props.order;
    let page;

    if (order === null || loading) {
      page = <Spinner />;
    } else {
      page = (
        <div className="col-md-8 m-auto">
          <Link to="/orders" className="btn btn-light">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h1 className="display-6 text-center">Edit Order</h1>
          <form noValidate onSubmit={this.onSubmit}>
            <TextAreaFieldGroup
              placeholder="Notes"
              name="note"
              value={this.state.note}
              onChange={this.onChange}
              error={errors.note}
            />
            <SelectListGroup
              placeholder="* Order Status"
              name="orderStatus"
              value={this.state.orderStatus}
              onChange={this.onChange}
              options={options}
              error={errors.orderStatus}
            />
            {/* <TextFieldGroup
              placeholder="* Extend days"
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
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="delivery"
                onChange={this.onChecked}
              />
              <label className="form-check-label" htmlFor="delivery">
                Mark As Delivered
              </label>
            </div>
            <input
              type="submit"
              value="Save"
              className="btn btn-info btn-block mt-4"
            />
          </form>
        </div>
      );
    }

    return (
      <div className="edit-order">
        <div className="container">
          <div className="row">{page}</div>
        </div>
      </div>
    );
  }
}

EditOrder.propTypes = {
  updateOrder: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  order: state.order,
  errors: state.errors,
});

export default connect(mapStateToProps, { updateOrder })(withRouter(EditOrder));
