import React, { Component } from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legendScroll';
import 'echarts/lib/component/grid';

import moment from 'moment';

// 时间数据处理函数
function MakeData (dates,type) {
    if (type==='datetime') {
        let CreateTime = [];
        dates.forEach((item,index)=>{
            CreateTime.push(moment(item.createTime).format('MM-DD'));
        });
        return CreateTime
    };
    if (type==='topWkb') {
        let TopWKB = [];
        dates.forEach((item,index)=>{
            TopWKB.push(item.topWkb);
        });
        return TopWKB
    };
    if (type==='averageWKb') {
        let AverageWKb = [];
        dates.forEach((item,index)=>{
            AverageWKb.push((item.wkbAdd / item.blockNum).toFixed(2));
        });
        return AverageWKb
    };
    if (type==='kjNumber') {
        let KjNumber = [];
        dates.forEach((item,index)=>{
            let thisnumber = (((item.wkbNum / item.wkbAdd) * item.averageDisk * item.averageOnlineTime) / (item.wkbAdd / item.blockNum).toFixed(0));
            KjNumber.push(thisnumber);
        });
        return KjNumber
    };
};

class Dataall extends Component {

    componentDidMount() {

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
                    let datetiem = MakeData(data.result,'datetime');
                    let topWkb = MakeData(data.result,'topWkb');
                    let averageWKb = MakeData(data.result,'averageWKb');
                    let kjnumber = MakeData(data.result,'kjNumber');
                    // console.log(kjnumber);
                    // this.setState({
                    //     data: data.result
                    // });
                    // 基于准备好的dom，初始化echarts实例
                    let myChart = echarts.init(document.getElementById('main'));
                    myChart.setOption({
                        tooltip: {
                            trigger: 'axis',
                            formatter: function (value) {
                                // console.log(value);
                                var relVal = value[0].name+"<br/>";
                                relVal += value[0].seriesName+ ' : ' + value[0].value+"<br/>";
                                relVal +=value[1].seriesName+ ' : ' +value[1].value+"<br/>";
                                relVal += value[2].seriesName+ ' : ' + getkb(value[2].value);
                                return relVal;
                                function getkb(value) {
                                    if (value === 0) return '0 B';
                                    var k = 1024, // or 1024
                                    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                                    i = Math.floor(Math.log(value) / Math.log(k));

                                    return (value / Math.pow(k, i)).toPrecision(3) + sizes[i];
                                }
                            }
                        },
                        legend: {
                            data:['人均得币','最高得币','预计矿机数量']
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: datetiem
                        },
                        yAxis: [
                            {
                                name:'得币个数',
                                type: 'value'
                            },
                            {
                                name:'预计矿机数量',
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name:'人均得币',
                                type:'line',
                                stack: '总量',
                                color: '#36dab8',
                                data:averageWKb
                            },
                            {
                                name:'最高得币',
                                type:'line',
                                stack: '总量',
                                color: '#5ab1ef',
                                data:topWkb
                            },
                            {
                                name:'预计矿机数量',
                                type:'line',
                                stack: '总量',
                                color: '#fa6e86',
                                yAxisIndex: 1,
                                data: kjnumber
                            }
                        ]
                    });
                });
            } else {
                console.log('请求失败，状态码为', response.status);
            }
        }, function(err) {
            console.log('出错：', err);
        });
    }
    render() {
        return (
            <div id="main" className="catalog text-left" style={{ width: '100%', height: 300 }}></div>
        );
    }
}

export default Dataall;
