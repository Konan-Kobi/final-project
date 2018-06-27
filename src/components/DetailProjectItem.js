import React from 'react';

export default class DetailProjectItem extends React.Component {
  render() {
    return (
      <tr>
        <td>담당자</td>
        <td>라벨</td>
        <td>타이틀</td>
        <td>기한</td>
        <td>진척상황</td>
      </tr>
    );
  }
}
