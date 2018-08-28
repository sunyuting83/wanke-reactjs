import React from 'react';
import Title from './Title';
import Dataall from './Data_all';


const History = () => (
    <div>
        <Title />
        <Dataall url="http://127.0.0.1:3000/marketHistoryList" />
    </div>
);

export default History;
