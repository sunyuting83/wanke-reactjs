import React from 'react';
import Datatitle from './Data_title';
import Datalist from './Data_list';

const Dataall = () => (
    <div className="block catalog">
        <Datatitle />
        <Datalist url="http://127.0.0.1:3000/monitorRecordList" />
    </div>
);

export default Dataall;
