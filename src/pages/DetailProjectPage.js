import React from 'react';
import DetailProjectContainer from '../containers/DetailProjectContainer';
import {
  DetailProjectProvider,
  DetailProjectConsumer,
} from '../contexts/DetailProjectContext';
import { Dimmer, Loader } from 'semantic-ui-react';
export default class DetailProjectPage extends Rweact.Component {
  render() {
    const { projectId } = this.props.match.params;
    return (
      <DetailProjectProvider projectId={projectId}>
        <DetailProjectConsumer>
          {({ loading }) =>
            loading ? (
              <Dimmer active inverted>
                <Loader size="large">Loading</Loader>
              </Dimmer>
            ) : (
              <DetailProjectContainer />
            )
          }
        </DetailProjectConsumer>
      </DetailProjectProvider>
    );
  }
}
