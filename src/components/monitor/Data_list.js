import React, { Component } from 'react';

class Datalist extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    loadData() {
        var myInit = {
          method: 'GET',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }; // 头部信息，解决兼容性问题
        var url = this.props.url; // 接口url
        fetch(url, myInit).then(function (response) {
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

    componentWillMount() {
        this.loadData()
    }
    componentDidMount(){
        setInterval(()=>{
            this.loadData()
        },20000)
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                {
                  this.state.data && this.state.data.length > 0 &&
                  this.state.data.map((item,index) => (
                    <ul className="row f12" key={index}>
                        <li className="col col-25">{ item.dict.name }</li>
                        <li className={item.change < item.buy ? 'col col-25 green down' : 'col col-25 red up' }>￥ { item.cnyPrice.toFixed(2) }</li>
                        <li className="col col-25">{ item.turnover.toFixed(2) }</li>
                        <li className={item.change < 0 ? 'col col-25 green' : 'col col-25 red' }>{ item.change }%</li>
                    </ul>
                  ))
                }
            </div>
        );
    }
}

export default Datalist;
