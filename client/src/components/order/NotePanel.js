import React, { Component } from "react";

class NotePanel extends Component {
  render() {
    const { note } = this.props;

    return (
      <div className="row">
        <div className="card mt-2 mb-4">
          <div className="card-header">Notes</div>
          <div className="row card-body">{note}</div>
        </div>
      </div>
    );
  }
}

export default NotePanel;
