
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import ProductList from '../../components/ProductList/ProductList';
import HeaderSlider from '../../components/Slider/HeaderSlider';
import { fetChAsynckCategory, getAllCategories } from '../../store/categorieSlice';
import { fetAsynchProducts, getAllProducts, getProductsStatus } from '../../store/productSlice';
import { getStatusOfSideBar } from '../../store/sideBarSlice';
import { STATUS } from '../../utils/status';


const HomePage = () => {
    const isOnSideBar = useSelector(getStatusOfSideBar);
    const dispatch = useDispatch();

    let ref = useRef(true);
    /* in StrictMode
        1.) component mount -> effect run -> fetchData
        2.) componenet unmounts
        3.) component mount again -> effecr run -> fetchData
    */
    useEffect(() => {
        if (ref.current) {
            dispatch(fetChAsynckCategory());
            dispatch(fetAsynchProducts(40));
        }
        return () => {
            ref.current = false;
        }


    }, [dispatch])

    const products = useSelector(getAllProducts);
    const statusProducts = useSelector(getProductsStatus);
    const categories = useSelector(getAllCategories);
    let productPc = []
    let productsWithoutTree = []
    if (statusProducts === STATUS.SUCCEEDED) {
        productPc = products.filter((product) => product.category === categories[1]);
        productsWithoutTree = products.filter((product) => !productPc.includes(product));
    }





    return (
        <main>
            <div className='slider-wrapper'>
                <HeaderSlider />
            </div>
            <div className='main-content bg-whitesmoke'>
                <div className={`${isOnSideBar ? 'container' : ''}`}>
                    <div className='categories py-5'>
                        <div className='categories-item'>
                            <div className='title-md'>
                                <h3>Nos Produits</h3>
                            </div>
                            {statusProducts === STATUS.SUCCEEDED ? <ProductList products={productsWithoutTree} /> : <Loader />}

                        </div>
                        <div className='categories py-5'>
                            <div className='categories-item'>
                                <div className='title-md'>
                                    <h3>PC Portable</h3>
                                </div>
                                {statusProducts === STATUS.SUCCEEDED ? <ProductList products={productPc} /> : <Loader />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </main >
    );
}

export default HomePage;
<div></div>