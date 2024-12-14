import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetData } from '../../redux/slice';
import PersonIcon from '@mui/icons-material/Person';

const NavBar = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');

    const handleLogout = () => {
        localStorage.clear()
        dispatch(resetData())
        navigate("/")
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#343a40' }}>
            <a className="navbar-brand" href="/">{userName}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                </ul>

                <div className="nav-item dropdown mr-5">
                    <PersonIcon
                        className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                        style={{ color: 'white', fontSize: '35px', margin: 0, padding: 0, cursor: 'pointer' }}
                    />
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <p className="dropdown-item m-0" href="#">{userName}</p>
                        <p className="dropdown-item m-0" href="#">{userEmail}</p>
                        {/* <p className="dropdown-item m-0" href="#">Another action</p> */}
                        <div className="dropdown-divider"></div>
                        <a onClick={handleLogout} className="dropdown-item" href="/">Logout</a>
                    </div>
                </div>
                
                <form className="form-inline my-2 my-lg-0 mr-3">
                    {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" /> */}
                    {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
                    <button onClick={handleLogout} className='btn btn-danger my-2 my-sm-0'>Logout</button>
                </form>

            </div>
        </nav>
    )
}

export default NavBar