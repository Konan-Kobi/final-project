import React from 'react';

export default class Issue extends React.Component {
  render() {
    const { loading } = this.props;
    const { progress, title, deadline, body } = this.props.issue;

    console.log(this.props.issue);
    if (loading) {
      return <div>...loading</div>;
    } else {
      return (
        <React.Fragment>
          <button>{progress}</button>
          <div>{title}</div>
          {/* <div>{this.props.username}</div> */}
          <div>{deadline}</div>
          <div>{body}</div>
        </React.Fragment>
      );
    }
  }
}
