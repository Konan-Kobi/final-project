import React from 'react';
import './../css/join.css';
import { Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class JoinForm extends React.Component {
  componentWillMount() {
    const bodyStyle = document.body.style;
    bodyStyle.backgroundImage =
      "url('https://images.unsplash.com/photo-1496389395181-e5fdd5c0315e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=49bd31ab070ce144fe11d9df225d1d4c&auto=format&fit=crop&w=2092&q=80')";
    bodyStyle.backgroundSize = '100%';
    bodyStyle.textAlign = 'center';
  }

  usernameRef = React.createRef();
  passwordRef = React.createRef();

  handleLoginClick = async e => {
    e.preventDefault();
    const { onJoin } = this.props;
    onJoin(this.usernameRef.current.value, this.passwordRef.current.value);
  };

  render() {
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
                  <div className="content">회원가입</div>
                </h2>
                <form className="ui form">
                  <div className="ui stacked segment">
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="user icon" />
                        <input
                          type="text"
                          ref={this.usernameRef}
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
                          ref={this.passwordRef}
                          placeholder="패스워드를 입력해주세요"
                          required
                        />
                      </div>
                    </div>
                    <button
                      onClick={this.handleLoginClick}
                      className="ui fluid large blue submit button"
                    >
                      회원가입 하기
                    </button>
                  </div>
                </form>
                <div className="ui message">
                  계정이 있으신가요? <Link to="/login">로그인하기</Link>
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
