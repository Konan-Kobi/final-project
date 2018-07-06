import React from 'react';
import pmAPI from '../pmAPI';
import { Redirect } from 'react-router-dom';

const { Provider, Consumer } = React.createContext();

class UserProvider extends React.Component {
  state = {
    loading: true,
    userId: null,
    username: null,
    userImg: null,
    userDefaultImage:
      'https://cdn.glitch.com/0f15b7fc-72a3-4ed2-a6f9-6a5e9b5f52cb%2Fgirl.png?1530295823731',
    redirect: false,
  };
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.fetchMe();
    }
  }
  fetchMe = async () => {
    this.setState({
      loading: true,
    });
    try {
      const res = await pmAPI.get('/me');
      if (res.data.userImg != null) {
        this.setState({
          userId: res.data.id,
          username: res.data.username,
          userImg: res.data.userImg[0].base64,
        });
      } else {
        this.setState({
          userId: res.data.id,
          username: res.data.username,
        });
      }
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  join = async (username, password, userImg) => {
    this.setState({
      loading: true,
    });
    try {
      if (!userImg) {
        await pmAPI.post('users/register', {
          username: username,
          password: password,
          userImg: [
            {
              base64:
                'https://cdn.glitch.com/0f15b7fc-72a3-4ed2-a6f9-6a5e9b5f52cb%2Fgirl.png?1530295823731',
            },
          ],
        });
      } else {
        await pmAPI.post('users/register', {
          username: username,
          password: password,
          userImg: userImg,
        });
      }
      alert('회원가입을 축하드립니다.');
    } catch (e) {
      if (e.response) {
        if (e.response.status >= 500) {
          alert('서버에 이상이 생겼습니다. 잠시 후에 다시 시도부탁드립니다.');
        } else if (e.response.status === 400) {
          alert('아이디가 중복되었습니다. 다시 입력부탁드립니다.');
        }
      }
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  login = async (username, password) => {
    this.setState({
      loading: true,
    });
    try {
      const res = await pmAPI.post('/users/login', {
        username: username,
        password: password,
      });
      localStorage.setItem('token', res.data.token);
      this.fetchMe();
      alert(`${username}님 환영합니다.`);
      window.location.replace('/myPage');
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  logout = () => {
    localStorage.removeItem('token');
    alert('로그아웃이 정상적으로 완료되었습니다.');
    window.location.replace('/');
  };

  render() {
    const value = {
      join: this.join,
      login: this.login,
      logout: this.logout, // 이 부분 수정하였습니다.
      username: this.state.username,
      userImg: this.state.userImg,
      userDefaultImage: this.state.userDefaultImage,
      userId: this.state.userId,
      loading: this.state.loading,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { UserProvider, Consumer as UserConsumer };
