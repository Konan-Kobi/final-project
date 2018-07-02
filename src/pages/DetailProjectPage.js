import React from 'react';
import DetailProjectContainer from '../containers/DetailProjectContainer';
import {
  DetailProjectProvider,
  DetailProjectConsumer,
} from '../contexts/DetailProjectContext';
import { Dimmer, Loader, Container } from 'semantic-ui-react';
export default class DetailProjectPage extends React.Component {
  render() {
    const { projectId } = this.props.match.params;
    return (
      <Container style={{ padding: '5em 0em' }}>
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
      </Container>
    );
  }
}
