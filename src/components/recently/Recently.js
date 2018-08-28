import React from 'react';
import Title from './Title';
import Datalist from './Data_list';


const Recently = () => (
    <div>
        <Title />
        <Datalist url="http://127.0.0.1:3000/recently" />
    </div>
);

export default Recently;
