import React from "react";
import pmAPI from "../pmAPI";
import ReactTags from "react-tag-autocomplete";

export default class CreateProjectForm extends React.Component {
  state = {
    // value: "",
    busy: false,
    tags: [],
    suggestions: []
  };

  async componentDidMount() {
    const res = await pmAPI.get("users");
    const resdata = {
      id: res.data.map(item => item.id),
      name: res.data.map(item => item.username)
    };
    for (let i = 0; i < resdata.name.length; i++) {
      this.state.suggestions.push({
        id: resdata.id[i],
        name: resdata.name[i]
      });
    }
  }

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
      alert("중복으로 태깅하셨습니다.");
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

  handleWriteClick = async e => {
    const payload = {
      title: this.titleRef.current.value,
      body: this.bodyRef.current.value
    };
    e.preventDefault();
    await pmAPI.post(`projects`, payload);
    const resPro = await pmAPI.get("projects");
    for (let i = 0; i < this.state.tags.length; i++) {
      const projectpayload = {
        userId: this.state.tags[i].id,
        projectId: resPro.data[resPro.data.length - 1].id
      };
      await pmAPI.post(`projectMembers`, projectpayload);
    }
  };

  render() {
    return (
      <React.Fragment>
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
              placeholder="담당자를 추가해주세요"
              tags={this.state.tags}
              suggestions={this.state.suggestions}
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
          <button onClick={this.handleWriteClick}>작성하기</button>
        </form>
      </React.Fragment>
    );
  }
}
