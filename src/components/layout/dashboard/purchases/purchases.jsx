import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { FaShoppingBasket } from 'react-icons/fa';
import PurchaseItem from "./purchaseItem/purchaseItem";

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

const Purchase = (props) => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        getPurchases(props.useremail).then(data => setPurchases(data)).catch(err => console.error(err));
    }, [props.useremail]);

    return (
        <main className="main-purchases">
            <h1><FaShoppingBasket /> MY PURCHASES</h1>
            <div className="container">
                {
                    purchases.length === 0 ? <div>
                    <h2>You didn't purchase any product yet.</h2>
                    <Link to={'/'}>Back to Home</Link>
                </div> :  <ul className="main__list">
                    {
                       purchases.map((purchase, index) => <PurchaseItem key={index} purchaseNumber={purchase.purchase_number} status={purchase.status} date={purchase.date} type={purchase.buyout_type} address={purchase.address} number={purchase.street_number} district={purchase.district} postal={purchase.postal} city={purchase.city} state={purchase.state} payment={purchase.payment} productName={purchase.name} quant={purchase.quantity} shipping={purchase.shipping} fee={purchase.shipping_price} />)
                    }
                </ul>
                }
            </div>
        </main>
    );
};

export default Purchase;