import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

import ProductList from '../../components/ProductList/ProductList';
import { fetAsynckProductByCategory, getProductByCategory, getStatusProductByCategory } from '../../store/categorieSlice';

import { STATUS } from '../../utils/status';

const CategoryProductPage = () => {
    const { category } = useParams();
    const dispatch = useDispatch();
    const isMounted = useRef(true);
    // Hooks
    useEffect(() => {
        if (isMounted.current) dispatch(fetAsynckProductByCategory(category));
        return () => {
            isMounted.current = false;
        }
    }, [category])

    //Selectors
    const products = useSelector(getProductByCategory).products;

    const statusProductByCat = useSelector(getStatusProductByCategory);
    return (
        <div>
            {statusProductByCat === STATUS.SUCCEEDED ? <ProductList products={products} /> : <Loader />}

        </div>
    );
}

export default CategoryProductPage
    ;