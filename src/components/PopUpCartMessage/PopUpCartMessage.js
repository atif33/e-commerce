import React from 'react';
import { correct } from "../../utils/images";
import "./PopUpCartMessage.scss";

const PopUpCartMessage = () => {
    return (
        <div className='cart-message text-center'>
            <div className='cart-message-icon'>
                <img src={correct} alt="" />
            </div>
            <h6 className='text-white fs-14 fw-5'>Element bien ajouté</h6>
        </div>
    );
}

export default PopUpCartMessage;