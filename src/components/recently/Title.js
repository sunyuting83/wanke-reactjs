import React from 'react';
import moment from 'moment';

const Title = () => (
    <div className="catalog bgcolor-f5f5">
        <div className="row">
            <div className="col col-60 b-title">
                玩客币昨日矿场情况 {moment(Date.now()).format('YYYY-MM-DD')}
            </div>
        </div>
    </div>
);

export default Title;
