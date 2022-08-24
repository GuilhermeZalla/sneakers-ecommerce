import { IoIosMail } from 'react-icons/io';
import { BsFileTextFill } from 'react-icons/bs';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { MdOutlineShortcut } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const body = {
    method: "GET",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function getPurchases(useremail) {
    let response = await fetch(`http://localhost:3001/account/purchases/${useremail}`, body);
    let result = response.json();
    return result;
};

const General = (props) => {
    const [purchases, setPurchases] = useState([]);
    let useremail = localStorage.getItem('useremail');
    let navigate = useNavigate();

    useEffect(() => {
        getPurchases(props.useremail).then(data => setPurchases(data)).catch(err => console.error(err));
    }, [props.useremail]);

    const handleOption = e => navigate(`/dashboard/${useremail}/${e.target.value}`);

    return (
        <div className="container__overview">
            <div className="container">
                <article className="article">
                    <img src='https://i.imgur.com/Rarc7rm.png' alt="User" />
                    <h1>Welcome, {props.fullName} <br /><span><IoIosMail /> {props.useremail}</span></h1>
                </article>
                <article className="article">
                    <h2>Unavailable Credit</h2>
                    <h3>U$ 0,00</h3>
                </article>
            </div>
            <div className="container">
                <h2 className="container__title"><FaShoppingCart /> LAST ORDER SUMMARY</h2>
                <div className="container__panel">
                    <ul className="container__list">
                        <li className="container__item">
                            <h2>PURCHASE NUMBER</h2>
                            <h3>#{purchases[purchases.length - 1]?.purchase_number}</h3>
                        </li>
                        <li className="container__item">
                            <h2>STATUS</h2>
                            <h3 className="status">{purchases[purchases.length - 1]?.status}</h3>
                        </li>
                        <li className="container__item">
                            <h2>DATE</h2>
                            <h3>{purchases[purchases.length - 1]?.date.replaceAll('-', '/')}</h3>
                        </li>
                        <li className="container__item">
                            <h2>PAYMENT</h2>
                            <h3>{purchases[purchases.length - 1]?.buyout_type}</h3>
                        </li>
                    </ul>
                    <ul className="container__list">
                        <li className="container__item">
                            <h2>ENDEREÇO</h2>
                            <ul className="container__sub-list">
                                <li className="container__sub-item">Avenida Raimundo Pereira de Magalhães 1720</li>
                                <li className="container__sub-item">Número 1720, Jardim Íris</li>
                                <li className="container__sub-item">CEP 5145901 - São Paulo, SP</li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="container__list">
                        <li className="container__item"><button type="button" value="purchases" onClick={handleOption}>See all purchases</button></li>
                    </ul>
                </div>
            </div>
            <div className="container">
                <h2 className="container__title"><MdOutlineShortcut /> SHORTCUTS</h2>
                <div className="container__panel">
                    <ul className="container__list">
                        <li className="container__item"><button type="button" value="purchases" onClick={handleOption}><FaShoppingCart /> MY PURCHASES</button></li>
                        <li className="container__item"><button type="button" value="wishlist" onClick={handleOption}><FaHeart /> WISHLIST</button></li>
                        <li className="container__item"><button type="button" value="data" onClick={handleOption}><BsFileTextFill /> MY DATA</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default General;