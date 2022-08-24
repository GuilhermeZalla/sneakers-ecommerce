import { RiArrowDownSLine } from 'react-icons/ri';
import { useRef, useState, useEffect } from 'react';

const body = {
    method: "GET",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function getProducts(name) {
    let response = await fetch(`http://localhost:3001/product/payment/item/${name}`, body);
    let result = response.json();
    return result;
};

const PurchaseItem = (props) => {
    const [thumbnail, setThumbnail] = useState([]);
    let svg = useRef(null);
    let details = useRef(null);

    useEffect(() => {
        getProducts(props.productName).then(data => setThumbnail(data.thumbnail)).catch(err => console.error(err));
    }, []);

    const handlePurchaseDetails = () => {
        if (details.current.style.height === '0px' || details.current.style.height === '') {
            details.current.style.height = '600px';
            svg.current.style.transform = 'rotate(180deg)';
        } else {
            details.current.style.height = '0';
            svg.current.style.transform = 'rotate(0deg)';
        };
    };

    return (
        <li>
            <ul>
                <li>PURCHASE NUMBER <span className="purchase">#{props.purchaseNumber}</span></li>
                <li>STATUS <span className="status">{props.status}</span></li>
                <li>DATE <span className="date">{(props.date).replaceAll('-', '/')}</span></li>
                <li>PAYMENT <span className="type">{props.type}</span></li>
                <li><a role="button" onClick={handlePurchaseDetails}>Purchase details <i ref={svg}><RiArrowDownSLine /></i></a></li>
            </ul>
            <div className="purchase-details" ref={details}>
                <hr />
                <h2>ADDRESS</h2>
                <p>{props.address} {props.number}, {props.district}</p>
                <p>ZIP - {props.postal}, {props.city} - {props.state}</p>
                <div>
                    <figure><img src={thumbnail} alt={props.productName} /></figure>
                    <ul>
                        <li>{props.productName} <span>Quantity: {props.quant}</span></li>
                        <li>TOTAL <span>$ {props.payment}</span></li>
                    </ul>
                </div>
                <ul>
                    <li>TOTAL PRODUCT(S) <span>$ {parseFloat(props.payment) - parseFloat(props.fee)}</span></li>
                    <li>FEE - {props.shipping} <span>$ {props.fee}</span></li>
                    <li>DONATION <span>$ {'0,00'}</span></li>
                    <li>SUBTOTAL - SNEAKERS <span>$ {props.payment}</span></li>
                    <li>BUYOUT TOTAL <span>$ {props.payment}</span></li>
                </ul>
            </div>
        </li>
    );
};

export default PurchaseItem;