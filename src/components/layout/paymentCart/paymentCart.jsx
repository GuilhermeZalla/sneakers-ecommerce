import Header from "../../common/header/header";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AiOutlineFileSearch, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { IoLocationSharp } from 'react-icons/io5';
import { BsFillBasketFill } from 'react-icons/bs';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
import { FaTruck, FaTrashAlt } from 'react-icons/fa';
import { BiDollar } from 'react-icons/bi';
import Address from '../../common/address/address';

const body = {
    method: "GET",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function getAddress(useremail) {
    let response = await fetch(`http://localhost:3001/account/address/${useremail}`, body);
    let result = response.json();
    return result;
};

async function getProduct(name) {
    let response = await fetch(`http://localhost:3001/product/payment/item/${name}`, body);
    let result = response.json();
    return result;
};

const PaymentCart = () => {
    const [totalValue, setTotal] = useState(0.00);
    const [address, setAddress] = useState([]);
    const [product, setProduct] = useState([]);
    const [productQuant, setQuant] = useState(1);
    const [fee, setFee] = useState('0.00');
    let navigate = useNavigate();
    let { name, quant } = useParams();
    let total = localStorage.getItem('total');
    let price = localStorage.getItem('price');
    let user = localStorage.getItem('useremail');
    localStorage.setItem('name', name);
    localStorage.setItem('quant', productQuant);

    useEffect(() => {
        setTotal(parseInt(total) + parseInt(price) + parseInt(fee));
        localStorage.setItem('buyout', totalValue);
    }, [totalValue]);

    useEffect(() => {
        getAddress(user).then(data => setAddress(data.result)).catch(err => console.error(err));
    }, [address]);

    useEffect(() => {
        getProduct(name).then(data => setProduct(data)).catch(err => console.error(err));
    }, []);

    const verifyFee = () => fee === '0.00' ? window.alert("You need to choose a shipping.") : navigate('/payment/cart/buyout');

    const handleFee = e => {
        setFee(e.target.value);
        localStorage.setItem('fee', e.target.id.toString());
        localStorage.setItem('feeprice', e.target.value.toString());
    };

    localStorage.setItem('incash', ((totalValue * productQuant) + parseInt(fee)).toFixed(2).toString().replace('.', ','));
    localStorage.setItem('installment', (((totalValue * productQuant) + 30 + parseInt(fee))).toFixed(2).toString().replace('.', ','));

    return (
        <>
            <Header />
            <main className="main-payment-cart">
                <div>
                    <section>
                        <h1><IoLocationSharp /> SELECT THE ADDRESS</h1>
                        {
                            address.length === 0 ?
                                <h2 className="address__title">You don't have any addresses registered</h2>
                                :
                                <ul className="address__list">
                                    {
                                        address?.map((address, index) => address.default ? <Address key={index} id={address._id} type={address.type} isCart={true} streetAddress={address.street_address} street_number={address.street_number} streetAddress_2={address.street_address_2} reference={address.reference} postal={address.postal} city={address.city} state={address.state} /> : null)
                                    }
                                </ul>
                        }
                    </section>
                    <section>
                        <h2><BsFillBasketFill /> PRODUCT</h2>
                        <button type="button"><FaTrashAlt /> REMOVE ALL PRODUCTS</button>
                        <ul>
                            <li>
                                <div>
                                    <figure><img src={product.thumbnail} alt={product.shoeName} /></figure>
                                    <article>
                                        <span>{product.brand}</span>
                                        <h3>{product.shoeName}</h3>
                                        <h4>Original price: <span>$ {totalValue * productQuant}</span></h4>
                                        <h4>Original installments 10x without fees: <span>$ {((totalValue * productQuant) + 30).toFixed(2).replace('.', ',')}</span></h4>
                                    </article>
                                    <div>
                                        <div>
                                            <button type="button" onClick={() => setQuant(productQuant - 1)}><MdOutlineArrowBackIos /></button>
                                            <span>{productQuant < 1 ? setQuant(Number(quant)) : productQuant}</span>
                                            <button type="button" onClick={() => setQuant(productQuant + 1)}><MdOutlineArrowForwardIos /></button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <h2><FaTruck /> SHIPPING:</h2>
                        <div className="container__shipping">
                            <form>
                                <p>
                                    <span>
                                        <label htmlFor="blue" className="blue">Blue</label>
                                        <input id="blue" type="radio" name="shipping" value={'15.07'} onClick={handleFee} />
                                    </span>
                                    <span><AiOutlineStar /><AiOutlineStar /><AiFillStar /><AiFillStar /><AiFillStar /></span>
                                    <span>15.07<BiDollar /></span>
                                </p>
                                <p>
                                    <span>
                                        <label htmlFor="sedex" className="sedex">Sedex</label>
                                        <input id="sedex" type="radio" name="shipping" value={'8.90'} onClick={handleFee} />
                                    </span>
                                    <span><AiOutlineStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /></span>
                                    <span>8.90<BiDollar /></span>
                                </p>
                                <p>
                                    <span>
                                        <label htmlFor="fedex" className="fedex">Fedex</label>
                                        <input id="fedex" type="radio" name="shipping" value={'22.02'} onClick={handleFee} />
                                    </span>
                                    <span><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /></span>
                                    <span>22.02<BiDollar /></span>
                                </p>
                                <p>
                                    <span>
                                        <label htmlFor="red" className="red">Red</label>
                                        <input id="red" type="radio" name="shipping" value={'4.70'} onClick={handleFee} />
                                    </span>
                                    <span><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /></span>
                                    <span>4.70<BiDollar /></span>
                                </p>
                            </form>
                        </div>
                    </section>
                </div>
                <aside className="aside">
                    <h2><AiOutlineFileSearch /> RESUME</h2>
                    <ul>
                        <li>Total value: <span>$ {(((totalValue * productQuant) + 30)).toFixed(2).toString().replace('.', ',')} </span></li>
                        <li>Shipping: <span>$ {fee.toString().replace('.', ',')}</span></li>
                        <li className="payment">
                            Installments: <div><span>$ {(((totalValue * productQuant) + 30 + parseInt(fee))).toFixed(2).toString().replace('.', ',')}</span>
                                <span><strong>10x</strong> of $ {(((totalValue * productQuant) + parseInt(fee) + 30) / 10).toFixed(2).replace('.', ',')} <strong></strong></span></div>
                        </li>
                        <li><h3>In cash: <span>$ {((totalValue * productQuant) + parseInt(fee)).toFixed(2).toString().replace('.', ',')}</span> <span className="totalpay">(Save: $ <strong>{(((totalValue * productQuant) + 30 + parseInt(fee)) - ((totalValue * productQuant) + parseInt(fee))).toFixed(2).toString().replace('.', ',')}</strong>)</span></h3> </li>
                    </ul>
                    <a role="button" onClick={verifyFee}>GO TO THE PAYMENT</a>
                    <Link to={'/'}>KEEP BUYING</Link>
                </aside>
            </main>
        </>
    );
};

export default PaymentCart;