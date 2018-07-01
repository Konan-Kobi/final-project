import React from 'react';
// import "./../css/login.css";
import { Helmet } from 'react-helmet';
import { Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class LoginForm extends React.Component {
  static defualtProps = {
    username: '', // 아이디 입력 필드에 표시 될 값
    password: '', // 비밀번호 입력 필드에 표시될 값
    onUsernameChange: username => {}, // 아이디 입력 필드에 새로운 입력이 일어날 때 호출되는 함수
    onPasswordChange: password => {}, // 비밀번호 입력 필드에 새로운 입력이 일어날 때 호출되는 함수
  };

  componentWillMount() {
    const bodyStyle = document.body.style;
    bodyStyle.backgroundImage =
      "url('https://images.unsplash.com/photo-1526289375762-27075d038ebd?ixlib=rb-0.3.5&s=26d1255767d8e79458ad28fd1c49811c&auto=format&fit=crop&w=2100&q=80')";
    bodyStyle.backgroundSize = '100%';
    bodyStyle.textAlign = 'center';
  }

  render() {
    const {
      username,
      password,
      onUsernameChange,
      onPasswordChange,
      login,
    } = this.props;
    return (
      <Grid columns="equal">
        <Grid.Row />
        <Grid.Row />
        <Grid.Row />
        <Grid.Row />
        <Grid.Row />
        <Grid.Row />
        <Grid.Row />
        <Grid.Row />
        <Grid.Column />
        <Grid.Column width={5}>
          <span className="copyright">협업이 즐거워지는 Project++</span>
          <Segment className="container" color="blue" textAlign="center">
            <div>
              <div className="column">
                <h2 className="ui white image header">
                  <div className="content">로그인</div>
                </h2>
                <Helmet
                  title="Login"
                  meta={[{ property: 'og:title', content: 'login' }]}
                />
                <form className="ui form">
                  <div className="ui stacked segment">
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="user icon" />
                        <input
                          type="text"
                          value={username}
                          onChange={e => onUsernameChange(e.target.value)}
                          placeholder="계정을 입력해주세요"
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="lock icon" />
                        <input
                          type="password"
                          value={password}
                          onChange={e => onPasswordChange(e.target.value)}
                          placeholder="패스워드를 입력해주세요"
                          required
                        />
                      </div>
                    </div>
                    {/* e.preventDefault가 없어서 코드를 바꿨습니다.*/}
                    <button
                      onClick={e => {
                        e.preventDefault();
                        login(username, password);
                      }}
                      className="ui fluid large blue submit button"
                    >
                      로그인 하기
                    </button>
                  </div>
                </form>
                <div className="ui message">
                  계정이 없으신가요? <Link to="/join">회원가입하기</Link>
                </div>
              </div>
            </div>
          </Segment>
        </Grid.Column>
        <Grid.Column />
      </Grid>
    );
  }
}
