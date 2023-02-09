import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCartStore, getInfoCarte, removeItemFromCart, updatItemFromCart } from '../../store/cartSlice';
import "./CartPage.scss";




const CartPage = () => {
    const dispatch = useDispatch();


    //Selectors
    const cartInfos = useSelector(getInfoCarte);


    //Action
    const addItem = (product) => {
        dispatch(updatItemFromCart(product));

    }

    const removeItem = (product) => {
        dispatch(removeItemFromCart(product));
    }

    const clearCart = () => {
        dispatch(clearCartStore());
    }

    const totalPriceItems = cartInfos.map((itemPrice) => itemPrice.priceTotal).reduce((acc, value) => acc + value, 0);
    const totalItem = cartInfos.length;

    if (totalItem === 0) {
        return (
            <div className='container my-5'>
                <div className='empty-cart flex justify-center align-center flex-column font-manrope'>
                    <span className='fw-6 fs-15 text-gray'>Votre Panier est Vide.</span>
                    <Link to="/" className='shopping-btn bg-orange text-white fw-5'>Faire le <strong>Shopping</strong></Link>
                </div>
            </div>
        )

    }


    return (
        <div className='cart bg-whitesmoke'>

            <div className='container'>

                <div className='cart-ctable'>
                    <div className='cart-chead bg-white'>
                        <div className='cart-ctr fw-6 font-manrope fs-15'>
                            <div className='cart-cth'>
                                <span className='cart-ctxt'>S.N.</span>
                            </div>
                            <div className='cart-cth'>
                                <span className='cart-ctxt'>Product</span>
                            </div>
                            <div className='cart-cth'>
                                <span className='cart-ctxt'>Unit Price</span>
                            </div>
                            <div className='cart-cth'>
                                <span className='cart-ctxt'>Quantity</span>
                            </div>
                            <div className='cart-cth'>
                                <span className='cart-ctxt'>Total Price</span>
                            </div>
                            <div className='cart-cth'>
                                <span className='cart-ctxt'>Actions</span>
                            </div>
                        </div>
                    </div>
                    {/* Body */}


                    {cartInfos.map((product, idx) => (
                        <div className='cart-cbody bg-white' key={idx}>
                            <div className='cart-ctr py-4'>
                                <div className='cart-ctd' >
                                    <span className='cart-ctxt'>{idx + 1}</span>
                                </div>
                                <div className='cart-ctd'>
                                    <span className='cart-ctxt'>{product?.title}</span>
                                </div>
                                <div className='cart-ctd'>
                                    <span className='cart-ctxt'>{product?.price}</span>
                                </div>
                                <div className='cart-ctd'>
                                    <div className='qty-change flex align-center'>
                                        <button type="button" className='qty-decrease flex align-center justify-center'
                                            onClick={() => addItem({ product: product, type: "DISC" })} >
                                            <i className='fas fa-minus'></i>
                                        </button>

                                        <div className='qty-value flex align-center justify-center'>
                                            {product?.quantity}
                                        </div>

                                        <button type="button" className='qty-increase flex align-center justify-center'
                                            onClick={() => addItem({ product: product, type: "ADD" })}>
                                            <i className='fas fa-plus'></i>
                                        </button>
                                    </div>
                                </div>

                                <div className='cart-ctd'>
                                    <span className='cart-ctxt text-orange fw-5'>{product?.priceTotal} </span>
                                </div>
                                <div className='cart-ctd'>
                                    <button type="button" className='delete-btn text-dark' onClick={() => removeItem(product)}>Supprimer</button>
                                </div>
                            </div>
                        </div>

                    ))}

                    <div className='cart-cfoot flex align-start justify-between py-3 bg-white'>
                        <div className='cart-cfoot-l'>
                            <button type='button' className='clear-cart-btn text-danger fs-15 text-uppercase fw-4'
                                onClick={() => clearCart()}>
                                <i className='fas fa-trash'></i>
                                <span className='mx-1'>Vider la Carte</span>
                            </button>
                        </div>

                        <div className='cart-cfoot-r flex flex-column justify-end'>
                            <div className='total-txt flex align-center justify-end'>
                                <div className='font-manrope fw-5'>Total des produits ({totalItem}): </div>
                                <span className='text-orange fs-22 mx-2 fw-6'>{totalPriceItems}</span>
                            </div>

                            <button type="button" className='checkout-btn text-white bg-orange fs-16'>Check Out</button>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}

export default CartPage;