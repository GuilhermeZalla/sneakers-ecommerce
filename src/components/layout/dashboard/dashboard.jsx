import { useParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Header from "../../common/header/header";
import { AiFillHome } from 'react-icons/ai';
import { FaUser, FaShoppingBasket, FaHeart } from 'react-icons/fa';
import General from './general/general';
import Data from './data/data';
import Purchases from './purchases/purchases';
import Wishlist from "./wishlist/wishlist";
import Denied from "../../common/denied/denied";

const body = {
    method: "GET",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

async function getAccount(account) {
    let response = await fetch(`http://localhost:3001/account/user_account/${account}`, body);
    let result = response.json();
    return result;
}

const Dashboard = () => {
    const [isLogged, setLogged] = useState('');
    const [user, setUser] = useState([]);
    const [loader, setLoader] = useState(false);
    let aside = useRef(null);
    let { useremail, name } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        getAccount(useremail).then(data => {
            if (data[0].result !== true) {
                window.alert("No account was found");
                navigate('/');
            } else {
                setUser(data[1][0]);
                setLogged(data[1][0].logged)
                localStorage.setItem('useremail', `${data[1][0].useremail}`);
            }
        }).catch(err => console.error(err));
    }, [isLogged]);

    const handleOption = e => navigate(`/dashboard/${useremail}/${e.target.value}`);

    function updateDashboard() {
        switch (name) {
            case 'general':
                return <General handleOption={handleOption} fullName={user.full_name} useremail={user.useremail} />
            case 'data':
                return <Data handleOption={handleOption} fullName={user.full_name} useremail={user.useremail} bday={user.birthday} phone={user.phone} />
            case 'purchases':
                return <Purchases useremail={user.useremail} />
            case 'wishlist':
                return <Wishlist handleOption={handleOption} useremail={user.useremail} />
            default:
                return console.error('Not available option');
        };
    };

    if (isLogged) {
        return (
            <>
                <Header />
                <main className="main-dashboard">
                    <aside className="aside" ref={aside}>
                        <ul className="aside__list">
                            <li className="aside__item"><button type="button" value="general" onClick={handleOption}><AiFillHome /></button> General</li>
                            <li className="aside__item"><button type="button" value="data" onClick={handleOption}><FaUser /></button> My data</li>
                            <li className="aside__item"><button type="button" value="purchases" onClick={handleOption}><FaShoppingBasket /></button> My purchases</li>
                            <li className="aside__item"><button type="button" value="wishlist" onClick={handleOption}><FaHeart /></button> Wishlist</li>
                        </ul>
                    </aside>
                    <div className="main__container">
                        {updateDashboard()}
                    </div>
                </main>
            </>
        );
    } else {
        setTimeout(() => setLoader(true), 1000)
        if (loader) {
            return <Denied />
        };
    };
};

export default Dashboard;