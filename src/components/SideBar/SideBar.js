
import './SideBar.scss'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { getStatusOfSideBar, setSideBarOf } from '../../store/sideBarSlice';
import { getAllCategories } from '../../store/categorieSlice';


// the bar, where all the categories



const SideBar = () => {
    const dispatch = useDispatch();
    const isSidBarOnOrOf = useSelector(getStatusOfSideBar);
    const category = useSelector(getAllCategories);


    return (
        <aside className={`sidebar ${isSidBarOnOrOf ? 'hide-sidebar' : ''}`}>
            <button type="button" className='sidebar-hide-btn' onClick={() => dispatch(setSideBarOf())} >
                <i className='fas fa-times'></i>
            </button>
            <div className='sidebar-cnt'>
                <div className='cat-title fs-17 text-uppercase fw-6 ls-1h'>All Categories</div>
                <ul className='cat-list'>
                    {category.map((cat, idx) => (
                        <li key={idx}>
                            <Link to={`category/${cat}`}>{cat.replace("-", " ")}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export default SideBar;