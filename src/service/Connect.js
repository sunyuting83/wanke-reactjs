import React, { Component } from 'react';

const Connect = (MyComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {},
      };
    }

    componentWillMount() {
        fetch(this.props.url, {
            method:'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // console.log(data);
                    this.setState({
                        data: data.result
                    });
                }.bind(this));
            } else {
                console.log('请求失败，状态码为', response.status);
            }
        }.bind(this), function(err) {
            console.log('出错：', err);
        });
    }

    render() {
      return <MyComponent { ...this.props } data={this.state.data} />
    }
  }
}

export {
  Connect,
}
