import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineDashboard, MdOutlineLogout } from 'react-icons/md';
import { IoMdHeart } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

const body = {
    method: "PUT",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function getUser(useremail) {
    let response = await fetch(`http://localhost:3001/account/logout/${useremail}`, body);
    let result = response.json();
    return result;
};

const UserDropDrownMenu = () => {
    let useremail = localStorage.getItem('useremail');
    let navigate = useNavigate();

    const handleLogout = () => {
        getUser(useremail).then(data => {
            localStorage.clear('useremail');
            localStorage.clear('total');
            localStorage.clear('quant');
            localStorage.clear('buyout');
            localStorage.clear('installment');
            localStorage.clear('fee');
            localStorage.clear('feeprice');
            localStorage.clear('incash');
            localStorage.clear('name');
            localStorage.clear('price');
            navigate('/');
            window.location.reload();
        }).catch(err => console.error(err));
    };

    return (
        <li className="header__item">
            <button type="button" name="login"><FaUserCircle /></button>
            <div className="dropdown">
                <ul className="dropdown__list">
                    <li className="dropdown__item"><Link to={`/dashboard/${useremail}/general`}><MdOutlineDashboard /> Dashboard</Link></li>
                    <li className="dropdown__item"><Link to={`/dashboard/${useremail}/wishlist`}><IoMdHeart /> Wishlist</Link></li>
                    <li className="dropdown__item"></li>
                    <li className="dropdown__item"><button onClick={handleLogout}><MdOutlineLogout /> Logout</button></li>
                </ul>
            </div>
        </li>
    );
};

export default UserDropDrownMenu;