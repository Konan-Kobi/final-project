import React from 'react';
import ReactTags from 'react-tag-autocomplete';
import { Form, Grid, Segment } from 'semantic-ui-react';

export default class CreateProjectForm extends React.Component {
  state = { busy: false, tags: [] };

  componentWillMount() {
    document.body.classList.add('CreateProjectForm__Layout');
  }

  componentWillUnmount() {
    document.body.classList.remove('CreateProjectForm__Layout');
  }

  titleRef = React.createRef();
  bodyRef = React.createRef();

  handleDelete(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  }

  handleAddition(tag) {
    if (this.state.tags.indexOf(tag) === -1) {
      const tags = [].concat(this.state.tags, tag);
      this.setState({ tags });
    } else {
      alert('중복으로 태깅하셨습니다.');
      return;
    }
  }

  handleInputChange(input) {
    if (!this.state.busy) {
      this.setState({ busy: true });
      return fetch(`query=${input}`).then(result => {
        this.setState({ busy: false });
      });
    }
  }

  handleClick = async e => {
    e.preventDefault();
    const { handleWriteClick } = this.props;
    const postProject = {
      title: this.titleRef.current.value,
      body: this.bodyRef.current.value,
      tags: this.state.tags,
    };
    handleWriteClick(postProject);
  };

  render() {
    const { suggestions } = this.props;
    return (
      <Grid columns="equal">
        <Grid.Column />
        <Grid.Column width={8}>
          <Segment className="container" color="blue" textAlign="center">
            <h2 className="ui white image header">
              <div className="content header">프로젝트 등록하기</div>
            </h2>
          </Segment>
          <Segment className="container" color="blue" textAlign="left">
            <Form>
              <Form.Field>
                <h5 className="ui white image header">
                  <div className="content">프로젝트 제목</div>
                </h5>
                <input
                  type="text"
                  placeholder="제목을 입력해주세요"
                  ref={this.titleRef}
                  required
                />
              </Form.Field>
              <Form.Field>
                <h5 className="ui white image header">
                  <div className="content">프로젝트 담당자 설정</div>
                </h5>
                <ReactTags
                  placeholder="담당자를 추가해주세요"
                  autoresize={false}
                  tags={this.state.tags}
                  minQueryLength={1}
                  suggestions={suggestions}
                  handleInputChange={this.handleInputChange.bind(this)}
                  handleDelete={this.handleDelete.bind(this)}
                  handleAddition={this.handleAddition.bind(this)}
                  autofocus={false}
                />
              </Form.Field>

              <Form.Field>
                <h5 className="ui white image header">
                  <div className="content">프로젝트 내용</div>
                </h5>
                <textarea
                  id="CreateProjectForm__Textarea"
                  cols="100"
                  rows="10"
                  placeholder="내용을 입력해주세요"
                  ref={this.bodyRef}
                  required
                />
              </Form.Field>
              <button
                className="ui fluid large blue submit button"
                onClick={this.handleClick}
              >
                작성하기
              </button>
            </Form>
          </Segment>
        </Grid.Column>
        <Grid.Column />
      </Grid>
    );
  }
}
