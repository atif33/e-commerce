import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Product from '../../components/Product/Product';
import ProductList from '../../components/ProductList/ProductList';
import { fetSearchProductByTitle, resultSearchProduct, statusSearchProduct } from '../../store/searchSlice';
import { STATUS } from '../../utils/status';
import "./SearchPage.scss";
import Loader from '../../components/Loader/Loader';

const SearchPage = () => {
    const { search } = useParams();
    const dispatch = useDispatch();
    const isMounted = useRef(true);


    useEffect(() => {
        // component did mount
        if (isMounted.current) dispatch(fetSearchProductByTitle(search));
        return () => {
            // componenet will unmount
            isMounted.current = false;

        }
    }, [search])


    //Selectors
    const productFound = useSelector(resultSearchProduct);
    const statusSearch = useSelector(statusSearchProduct);



    if (statusSearch === STATUS.SUCCEEDED) {


        if (productFound.products.length === 0) {
            return (
                <div>
                    <h1>Produit introuvable</h1>
                </div>
            )

        }
    }
    return (

        <main>
            <div className='search-content bg-whitesmoke'>
                <div className='container'>
                    <div className='py-5'>
                        <div className='title-md'>
                            <h3>Résultat de la recherche:</h3>
                        </div>
                        {statusSearch === STATUS.SUCCEEDED ? < ProductList products={productFound.products}></ProductList> : <Loader />}
                    </div>
                </div>
            </div>
        </main >
    );
}

export default SearchPage;