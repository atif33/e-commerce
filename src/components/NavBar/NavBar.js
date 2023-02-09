import React, { useState } from 'react';
import './NavBar.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSideBarOn } from '../../store/sideBarSlice';
import { getAllCategories } from '../../store/categorieSlice';
import { getTotalItem } from '../../store/cartSlice';


//Header 2 
const NavBar = () => {
    const dispatch = useDispatch();
    const categroies = useSelector(getAllCategories);

    //Hooks
    const [search, setSearch] = useState({
        search: ""
    })

    const totalItemsTmp = useSelector(getTotalItem);


    //Actions
    const handleSearchProduct = (event) => {
        event.preventDefault();
        setSearch(event.target.value);

    }

    return (
        <nav className='navbar'>
            <div className='navbar-cnt flex align-center'>
                <div className='brand-and-toggler flex align-center'>
                    <button type="button" className='sidebar-show-btn text-white' onClick={() => dispatch(setSideBarOn())}>
                        <i className='fas fa-bars'></i>
                    </button>
                    <Link to="/" className='navbar-brand flex align-center'>
                        <span className='navbar-brand-ico'>
                            <i className='fa-solid fa-bag-shopping'></i>
                        </span>
                        <span className='navbar-brand-txt mx-2'>
                            <span className='fw-7'>Achat</span>!!!
                        </span>
                    </Link>
                </div>

                <div className='navbar-collapse w-100'>
                    <div className='navbar-search bg-white'>
                        <div className='flex align-center'>
                            <input type="text" className='form-control fs-14' name='search'
                                id='search' placeholder="chercher éléement" onChange={(e) => handleSearchProduct(e)} />
                            <Link to={`/search/${search}`} className='text-white search-btn flex align-center justify-center'>
                                <i className='fa-solid fa-magnifying-glass'></i>
                            </Link>
                        </div>
                    </div>

                    <ul className='navbar-nav flex align-center fs-12 fw-4 font-manrope'>

                        {categroies.map((category, index) =>
                            <li className='nav-item no-wrap' key={index} >
                                <Link to={`category/${category}`} className='nav-link text-capitalize'>{category.replace("-", " ")}</Link>
                            </li>
                        )}

                    </ul>
                </div>

                <div className='navbar-cart flex align-center'>
                    <Link to="/cart" className='cart-btn'>
                        <i className='fa-solid fa-cart-shopping'></i>
                        <div className='cart-items-value'>{totalItemsTmp}</div>

                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
