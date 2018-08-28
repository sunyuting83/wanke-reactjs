import React from 'react';
import { Connect } from '../../service/Connect';

const Datalist = (props) => {
  return (
    <div className="block catalog">
        <ul className="row row-wrap f12">
            <li className="col col-33">
                <h3 className="f16">{ props.data.wkbNum }</h3>
                挖矿总量
            </li>
            <li className="col col-33">
                <h3 className="f16">{ props.data.blockNum }</h3>
                区块高度
            </li>
            <li className="col col-33">
                <h3 className="f16">{ props.data.wkbAdd }</h3>
                出币数量
            </li>
            <li className="col col-33">
                <h3 className="f16">{ props.data.averageOnlineTime }小时</h3>
                人均在线时长
            </li>
            <li className="col col-33">
                <h3 className="f16">{ props.data.averageBandWidth }Mbps</h3>
                人均带宽
            </li>
            <li className="col col-33">
                <h3 className="f16">{ props.data.averageDisk }GB</h3>
                人均存储
            </li>
            <li className="col col-33">
                <h3 className="f16">{ props.data.topWkb }</h3>
                昨日最高得币
            </li>
            <li className="col col-33">
                <h3 className="f16">{ (props.data.wkbNum / props.data.wkbAdd * props.data.averageDisk * props.data.averageOnlineTime / (props.data.wkbAdd / props.data.blockNum)).toFixed(0) }</h3>
                预计矿机数量
            </li>
            <li className="col col-33">
                <h3 className="f16">{ (props.data.wkbAdd / props.data.blockNum).toFixed(2) }</h3>
                人均得币数量
            </li>
        </ul>
    </div>
  );
};
export default Connect(Datalist);
// export default Datalist;
