import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AdminRegister from "./Register";
import AdminLogin from "./Login";
import { IsAdminExists } from "../../actions/authActions";

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }

  componentDidMount() {
    this.props.IsAdminExists();
  }

  render() {
    let pageContent;

    const { adminExists } = this.props.auth;

    pageContent = <div>{adminExists ? <AdminLogin /> : <AdminRegister />}</div>;

    return (
      <div className="admin">
        <div className="row">
          <div className="col-md-12">{pageContent}</div>
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  IsAdminExists: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { IsAdminExists })(Admin);
