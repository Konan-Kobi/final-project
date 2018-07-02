import React from 'react';
import ReactTags from 'react-tag-autocomplete';
import { Grid, Segment } from 'semantic-ui-react';
import './../css/create-project.css';

export default class CreateProjectForm extends React.Component {
  state = {
    busy: false,
    tags: [],
  };

  titleRef = React.createRef();
  bodyRef = React.createRef();

  handleDelete(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  }

  handleAddition(tag) {
    if (this.state.tags.indexOf(tag) == -1) {
      const tags = [].concat(this.state.tags, tag);
      this.setState({ tags });
    } else {
      alert('중복으로 태깅하셨습니다.');
      return;
    }
  }

  handleInputChange(input) {
    const { suggestions } = this.props;
    console.log(suggestions);
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
          <h1>프로젝트 생성하는 페이지</h1>
          <form>
            <div>
              프로젝트 이름 :
              <input
                type="text"
                placeholder="제목을 입력해주세요"
                size="100"
                ref={this.titleRef}
                required
              />
            </div>
            <div>
              담당자 선택 :
              <ReactTags
                className="tagging"
                placeholder="담당자를 추가해주세요"
                tags={this.state.tags}
                minQueryLength={1}
                suggestions={suggestions}
                handleInputChange={this.handleInputChange.bind(this)}
                handleDelete={this.handleDelete.bind(this)}
                handleAddition={this.handleAddition.bind(this)}
                autofocus={false}
              />
            </div>
            <div>
              내용 or 목표 :
              <textarea
                cols="100"
                rows="10"
                placeholder="내용을 입력해주세요"
                ref={this.bodyRef}
                required
              />
            </div>
            <button onClick={this.handleClick}>작성하기</button>
          </form>
        </Grid.Column>
        <Grid.Column />
      </Grid>
    );
  }
}
