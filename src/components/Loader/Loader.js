import React from 'react'
import "./Loader.scss";
import { loading } from "../../utils/images";

const Loader = () => {
    return (
        <div className='container'>
            <div className='loader flex justify-center align-center'>
                <img src={loading} alt="" />
            </div>
        </div>
    );
}

export default Loader;
<div></div>