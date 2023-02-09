import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PopUpCartMessage from '../../components/PopUpCartMessage/PopUpCartMessage';
import { addInfoCart, getItemAdded, setItemInCart } from '../../store/cartSlice';
import { fetchSingleProduct, getSingleProduct } from '../../store/productSlice';
import "./ProductSinglePage.scss";

const ProductSinglePage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [qtyTmp, setQtyTmp] = useState(1);
    const isMounted = useRef(true);
    useEffect(() => {
        if (isMounted.current) dispatch(fetchSingleProduct(id));
        return () => {
            isMounted.current = false;
        }
    }, [])
    const singleProduct = useSelector(getSingleProduct);
    const isItemsAdded = useSelector(getItemAdded);
    const discountPrice = singleProduct.price - singleProduct.price * (singleProduct.discountPercentage / 100);



    const addTmpQty = () => {
        setQtyTmp((preventQty) => {
            return (preventQty + 1 < singleProduct.stock) ? preventQty + 1 : singleProduct.stock;
        })
    };

    const elemTmpQty = () => {
        setQtyTmp((preventQty) => {
            const tmpStock = preventQty - 1;
            return (tmpStock - 1 < 1) ? 1 : tmpStock;
        });
    };

    const addToCart = (product) => {
        const productCart = { ...product, discPrice: Math.floor(discountPrice), quantity: qtyTmp, priceTotal: (Math.floor(discountPrice) * qtyTmp) };
        dispatch(addInfoCart(productCart));
        dispatch(setItemInCart(true));
        hidePopUp();
        setQtyTmp(1);
    }


    const hidePopUp = () => {
        setTimeout(() => {
            dispatch(setItemInCart(false))
        }, 2000);
    }


    return (

        <main className='py-5 bg-whitesmoke'>
            <div className='product-single'>
                <div className='container'>
                    <div className='product-single-content bg-white grid'>
                        <div className='product-single-l'>
                            <div className='product-img'>
                                <img src={singleProduct ? (singleProduct.images ? singleProduct.images[0] : "") : ""}
                                    alt={singleProduct.title} className='img-cover' />
                            </div>
                            <div className='product-img-thumbs flex align-center my-2'>
                                <div className='thumb-item'>
                                    <img src={singleProduct ? (singleProduct.images ? singleProduct.images[1] : "") : ""}
                                        alt={singleProduct.title} className='img-cover' />
                                </div>
                                <div className='thumb-item'>
                                    <img src={singleProduct ? (singleProduct.images ? singleProduct.images[2] : "") : ""}
                                        alt={singleProduct.title} className='img-cover' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='product-single-r'>
                        <div className='product-details font-manrope'>
                            <div className='title fs-20 fw-5'>{singleProduct?.title}</div>
                            <div>
                                <p className='para fw-3 fs-15'>{singleProduct?.description}</p>
                            </div>
                            <div className='info flex align-center flex-wrap fs-14'>
                                <div className='rating'>
                                    <span className='text-orange fw-5'>Rating:</span>
                                    <span className='mx-1'>
                                        {singleProduct?.rating}
                                    </span>
                                </div>
                                <div className='vert-line'></div>
                                <div className='brand'>
                                    <span className='text-orange fw-5'>Marque:</span>
                                    <span className='mx-1'>{singleProduct?.brand}</span>
                                </div>
                                <div className='vert-line'></div>
                                <div className='brand'>
                                    <span className='text-orange fw-5'>Category:</span>
                                    <span className='mx-1 text-capitalize'>
                                        {singleProduct?.category ? (singleProduct.category.replace("-", "")) : ""}
                                    </span>
                                </div>
                            </div>
                            <div className="price">
                                <div className='flex align-center'>
                                    <div className='old-price text-gray'>
                                        {singleProduct?.price}$
                                    </div>
                                    <span className='fs-14 mx-2 text-dark'>
                                        Inclus la Taxe
                                    </span>
                                </div>
                                <div className='flex align-center my-1'>
                                    <div className='new-price fw-5 font-poppins fs-24 text-orange'>
                                        {Math.floor(discountPrice)}$
                                    </div>
                                    <div className='discount bg-orange fs-13 text-white fw-6 font-poppins'>
                                        {Math.floor(singleProduct?.discountPercentage)}% OFF
                                    </div>
                                </div>
                            </div>

                            <div className='qty flex align-center my-4'>
                                <div className='qty-text'>Quantity:</div>
                                <div className='qty-change flex align-center mx-3'>
                                    <button type="button" className='qty-decrease flex align-center justify-center' onClick={() => elemTmpQty()} >
                                        <i className='fas fa-minus'></i>
                                        {qtyTmp}
                                    </button>
                                    <div className="qty-value flex align-center justify-center" ></div>
                                    <button type="button" className='qty-increase flex align-center justify-center' onClick={() => addTmpQty()} >
                                        <i className='fas fa-plus'>

                                        </i>
                                    </button>

                                </div>

                            </div>

                            <div className='btns'>
                                <button type="button" className='add-to-cart-btn btn'>
                                    <i className='fas fa-shopping-cart'></i>
                                    <span className='btn-text mx-2' onClick={() => addToCart(singleProduct)}>Ajouter à la carte</span>
                                </button>
                                <Link to="/cart">
                                    <button type="button" className='buy-now btn mx-3'>
                                        <span className='btn-text'>Commander</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isItemsAdded && <PopUpCartMessage />}

        </main >

    );
}

export default ProductSinglePage;