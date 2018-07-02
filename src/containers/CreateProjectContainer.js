import React from 'react';
import { CreateProjectConsumer } from './../contexts/CreateProjectContext';
import CreateProjectForm from '../components/CreateProjectForm';
import { Dimmer, Loader } from 'semantic-ui-react';

export default class CreateProjectContainer extends React.Component {
  render() {
    return (
      <CreateProjectConsumer>
        {({ suggestions, handleWriteClick, loading }) =>
          loading ? (
            <Dimmer active inverted>
              <Loader size="large">Loading</Loader>
            </Dimmer>
          ) : (
            <CreateProjectForm
              suggestions={suggestions}
              handleWriteClick={handleWriteClick}
            />
          )
        }
      </CreateProjectConsumer>
    );
  }
}
