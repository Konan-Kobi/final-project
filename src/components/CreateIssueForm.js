import React from 'react';
import ReactTags from 'react-tag-autocomplete';
import DateTimePicker from 'react-datetime-picker';

export default class CreateIssueForm extends React.Component {
  state = {
    busy: false,
    tags: [],
    label: [],
    projectStart: new Date(),
    deadline: '',
  };

  titleRef = React.createRef();
  bodyRef = React.createRef();

  // Tag, Autocomplete 관련 함수
  // 태그 삭제
  handleDelete(i) {
    const tags = this.state.tags.slice(0);
    tags.splice(i, 1);
    this.setState({ tags });
  }

  // 태그 삭제 - 라벨
  handleLabelDelete(i) {
    const label = this.state.label.slice(0);
    label.splice(i, 1);
    this.setState({ label });
  }

  // 태그 추가
  handleAddition(tag) {
    if (this.state.tags.indexOf(tag) === -1) {
      const tags = [].concat(this.state.tags, tag);
      this.setState({ tags });
    } else {
      alert('중복으로 태깅하셨습니다.');
      return;
    }
  }

  // 태그 추가 - 라벨
  handleLabelAddition(tag) {
    // 라벨은 일단 정한게 하나밖에 설정못하도록 했으니까 조건을 걸어주고
    if (this.state.label < 1) {
      // 입력된 값을 label의 배열의 값과 비교해서 중복된게 없으면 추가
      if (this.state.label.indexOf(tag) === -1) {
        const label = [].concat(this.state.label, tag);
        this.setState({ label });
      } else {
        // 중복된 값이 있으면 경고창
        alert('중복으로 태깅하셨습니다.');
        return;
      }
    } else {
      // 라벨을 두개달려고 할 경우 경고창
      alert('라벨은 하나만 선택하실수 있습니다.');
      return;
    }
  }

  // input에 입력한 값과와 일치하는 글자만 출력되게 하는 함수
  handleInputChange(input) {
    if (!this.state.busy) {
      this.setState({ busy: true });
      return fetch(`query=${input}`).then(result => {
        this.setState({ busy: false });
      });
    }
  }

  // input에 입력한 값과와 일치하는 글자만 출력되게 하는 함수 - 라벨
  handleLabelInputChange(input) {
    if (!this.state.busy) {
      this.setState({ busy: true });
      return fetch(`query=${input}`).then(result => {
        this.setState({ busy: false });
      });
    }
  }

  // DatePicker에 입력된 값을 state에 저장해주는 함수 - created
  onChangeCreated = date =>
    this.setState({
      projectStart: date,
    });

  // DatePicker에 입력된 값을 state에 저장해주는 함수 - deadline
  onChangeDeadline = date =>
    this.setState({
      deadline: date,
    });

  handleClick = async e => {
    e.preventDefault();
    const postIssue = {
      title: this.titleRef.current.value,
      body: this.bodyRef.current.value,
      tags: this.state.tags,
      label: this.state.label,
      projectStart: this.state.projectStart,
      deadline: this.state.deadline,
    };
    const { handleWriteClick } = this.props;
    handleWriteClick(postIssue);
  };

  render() {
    const { suggestions, labelSuggestions } = this.props;
    return (
      <React.Fragment>
        <h1>Create Issue Page</h1>
        <form>
          <div>
            할당자 선택 :
            <ReactTags
              placeholder="이슈를 할당받을 담당자를 추가해주세요"
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
            제목 :
            <input
              type="text"
              ref={this.titleRef}
              placeholder="제목을 입력해주세요"
              size="100"
              required
            />
          </div>
          <div>
            내용 :
            <textarea
              cols="100"
              rows="10"
              placeholder="내용을 입력해주세요"
              ref={this.bodyRef}
              required
            />
          </div>
          <div>
            기한 설정 :
            <DateTimePicker
              onChange={this.onChangeCreated}
              value={this.state.projectStart}
              required={true}
              showLeadingZeros={true}
              locale="en-us"
            />부터
            <DateTimePicker
              onChange={this.onChangeDeadline}
              value={this.state.deadline}
              required={true}
              showLeadingZeros={true}
              locale="en-us"
            />까지
          </div>
          <div>
            라벨 :
            <ReactTags
              placeholder="라벨을 추가해주세요"
              tags={this.state.label}
              minQueryLength={1}
              suggestions={labelSuggestions}
              handleInputChange={this.handleLabelInputChange.bind(this)}
              handleDelete={this.handleLabelDelete.bind(this)}
              handleAddition={this.handleLabelAddition.bind(this)}
              autofocus={false}
            />
          </div>
          <button onClick={this.handleClick}>작성하기</button>
        </form>
      </React.Fragment>
    );
  }
}
