import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import DresslistItem from "./DresslistItem";
import { getDresslists } from "../../actions/dresslistActions";

class Dresslist extends Component {
  constructor(props) {
    super(props);

    this.refreshDress = this.refreshDress.bind(this);
  }

  componentDidMount() {
    this.props.getDresslists();
  }

  refreshDress() {
    this.props.getDresslists();
  }

  render() {
    const { dresslist, loading } = this.props.dress;
    let dressItems;

    if (dresslist === null || loading) {
      dressItems = <Spinner />;
    } else {
      dressItems = (
        <DresslistItem
          dresslist={dresslist}
          refreshDressCallback={this.refreshDress}
        />
      );
    }

    return (
      <div className="dresslist">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ul className="list-group mb-0">{dressItems}</ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dresslist.propTypes = {
  getDresslists: PropTypes.func.isRequired,
  dress: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dress: state.dress,
});

export default connect(mapStateToProps, { getDresslists })(Dresslist);
