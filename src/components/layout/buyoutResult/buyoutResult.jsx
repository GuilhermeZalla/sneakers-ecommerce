import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../common/header/header';
import { FaAngleDoubleRight } from 'react-icons/fa';

const body = {
    method: "GET",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function getUser(name) {
    let response = await fetch(`http://localhost:3001/account/validation/${name}`, body);
    let result = response.json();
    return result;
};

async function getAddress(name) {
    let response = await fetch(`http://localhost:3001/account/address/${name}`, body);
    let result = response.json();
    return result;
};
async function getProduct(name) {
    let response = await fetch(`http://localhost:3001/product/payment/item/${name}`, body);
    let result = response.json();
    return result;
};

async function savePurchase(useremail, date, payment, price, type, streetAddress, shoeName, quant, fee, feePrice, status, postal, streetNumber, district, city, state) {
    let response = await fetch(`http://localhost:3001/account/purchase/${useremail}/${date}/${payment}/${price}/${type}/${streetAddress}/${shoeName}/${quant}/${fee}/${feePrice}/${status}/${postal}/${streetNumber}/${district}/${city}/${state}`, {
        method: "POST",
        mode: "cors",
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    let result = response.json();
    return result;
};

const BuyoutResult = () => {
    const [payment, setType] = useState();
    const [address, setAddress] = useState([]);
    const [product, setProduct] = useState([]);
    const [user, setUser] = useState([]);
    let { name, type } = useParams();
    let incash = localStorage.getItem('incash');
    let installment = localStorage.getItem('installment');
    let useremail = localStorage.getItem('useremail');
    let fee = localStorage.getItem('fee');
    let feePrice = localStorage.getItem('feeprice');
    let quant = localStorage.getItem('quant');
    let date = new Date();
    let purchaseDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

    useEffect(() => {
        getUser(useremail).then(data => setUser(data)).catch(err => console.error(err));
        getProduct(name).then(data => setProduct(data)).catch(err => console.error(err));
        getAddress(useremail).then(data => {
            for (let i = 0; data.result.length; ++i) {
                if (data.result[i].default) {
                    setAddress(data.result[i]);
                };
            };
        }).catch(err => console.error(err));
        switch (type) {
            case 'cash':
                setType(incash);
                break;
            case 'debit':
                setType(incash);
                break;
            case 'credit':
                setType(installment);
                break;
        };
    }, []);

    const handlePurchase = () => {
        savePurchase(useremail, purchaseDate, payment, product.price, type, address.street_address, name, quant, fee, feePrice, 'pending', address.postal, address.street_number, address.district, address.city, address.state).then(data => console.log(data)).catch(err => console.error(err));
    };
 
    return (
        <>
            <Header />
            <main className="main-buyout-result">
                <h1>Thank you for your purchase!</h1>
                <div className="product-container">
                    <figure><img src={product.thumbnail} alt={product.shoeName} /></figure>
                    <ul>
                        <li>{name}</li>
                        <li>Total Value: <span>$ {payment}</span></li>
                    </ul>
                    <ul>
                        <li className="brand">{product.brand}</li>
                        <li>Payment Method: <span>{type}</span></li>
                    </ul>
                    <Link to={`/dashboard/${useremail}/purchases`} onClick={handlePurchase}><FaAngleDoubleRight /></Link>
                </div>
                <p>Sending to: <span>{user.full_name}, {address.street_address} {address.street_number}, {address.street_address_2}, {address.district}, {address.city}-{address.state}, {address.postal}</span></p>
                <footer>
                    <Link to={'/'} onClick={handlePurchase}>Back to home</Link>
                    <Link to={`/dashboard/${useremail}/general`} onClick={handlePurchase}>Go to dashboard</Link>
                </footer>
            </main>
        </>
    );
};

export default BuyoutResult;