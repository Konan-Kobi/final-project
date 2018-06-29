import React from 'react';
import DetailProjectContainer from '../containers/DetailProjectContainer';
import {
  DetailProjectProvider,
  DetailProjectConsumer,
} from '../contexts/DetailProjectContext';

export default class DetailProjectPage extends React.Component {
  render() {
    const { projectId } = this.props.match.params;
    return (
      <DetailProjectProvider projectId={projectId}>
        <DetailProjectConsumer>
          {({ loading }) =>
            loading ? <div>...loading</div> : <DetailProjectContainer />
          }
        </DetailProjectConsumer>
      </DetailProjectProvider>
    );
  }
}
