import React, { Component } from 'react';

class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {secondsElapsed: this.props.secondsElapsed};
    }

    tick() {
        if (this.state.secondsElapsed === 0) {
            this.setState((prevState) => ({
                secondsElapsed: 20
            }));
        } else {
            this.setState((prevState) => ({
                secondsElapsed: prevState.secondsElapsed - 1
            }));
        }

    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="catalog bgcolor-f5f5">
                <div className="row">
                    <div className="col col-60 b-title">
                        数字货币市值TOP 10
                    </div>
                    <div className="col col-40 text-right">
                        {this.state.secondsElapsed}秒后刷新
                        </div>
                </div>
            </div>
        );
    }
}

export default Title;
