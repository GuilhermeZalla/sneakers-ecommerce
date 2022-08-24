import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../common/header/header";
import { MdOutlineHandyman } from 'react-icons/md';
import { BiMedal } from 'react-icons/bi';
import { IoIosArrowUp } from 'react-icons/io';

const body = {
    method: "GET",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function getProduct(name) {
    let response = await fetch(`http://localhost:3001/product/payment/item/${name}`, body);
    let result = response.json();
    return result;
};

const Payment = () => {
    const [product, setProduct] = useState([]);
    const [service, setService] = useState('');
    const [warranty, setWarranty] = useState(0.00);
    const [total, setTotal] = useState(0.00);
    let { name, quant } = useParams();
    let container = useRef(null);
    let arrow = useRef(null);
    let navigate = useNavigate();

    useEffect(() => {
        getProduct(name).then(data => setProduct(data)).catch(err => console.error(err));
        localStorage.setItem('total', total);
    }, [total]);

    const handleContainer = e => {
        if (container.current.style.display === '' || container.current.style.display === 'none') {
            container.current.style.display = 'grid';
            arrow.current.style.transform = 'rotate(180deg)';
            arrow.current.style.webkitTransform = 'rotate(180deg)';
            arrow.current.style.mozTransform = 'rotate(180deg)';
        } else {
            container.current.style.display = 'none';
            arrow.current.style.transform = 'initial';
        };
    };

    const handleServiceTotal = e => {
        setService(e.target.value)
        setWarranty(((Number(e.target.value) / 6)).toFixed(2).replace('.', ','));
        setTotal(((Number(e.target.value) / 6) + Number(e.target.value)).toFixed(2).replace('.', ','));
        localStorage.setItem('price', product.price);
    };

    const verifyWarranty = () => {
        if (service === '') {
            window.alert("You must choose a warranty.");
        } else {
            navigate(`/payment/cart/${product.shoeName}/${quant}`);
        };
    };

    return (
        <>
            <Header />
            <main className="main-payment">
                <div className="current-product">
                    <figure><img src={product.thumbnail} alt={product.shoeName} /></figure>
                    <article>
                        <span>{product.brand}</span>
                        <h2>{product.shoeName}</h2>
                        <p>{product.description}</p>
                    </article>
                    <ul>
                        <li>8x $ {((parseInt(product.price) + 30) / (8)).toFixed(2).replace('.', ',')} <span>(total: {parseInt(product.price) + 30})</span></li>
                        <li>$ {parseInt(product.price).toFixed(2).replace('.', ',')} <span>(in cash)</span></li>
                    </ul>
                </div>
                <div className="product-container">
                    <div className="left-container">
                        <h2><BiMedal /> EXTENDED WARRANTY</h2>
                        <p>Take advantage of our <span>extended warranty</span> plans and keep your product protected for longer</p>
                        <button type="button" onClick={handleContainer} ref={arrow}><IoIosArrowUp /></button>
                        <div className="container" ref={container}>
                            <div>
                                <h3>No Warranty</h3>
                                <h4>(Manufacturer's warranty only)</h4>
                                <span>$ 0,00</span>
                                <input type="radio" name='warranty' value={0.00} onClick={handleServiceTotal} />
                            </div>
                            <div>
                                <h3>+12 warranty months</h3>
                                <h4>Without fees and 10x of</h4>
                                <span>$ 5,28</span>
                                <input type="radio" name='warranty' value={52.80} onClick={handleServiceTotal} />
                            </div>
                            <div>
                                <h3>+24 warranty months</h3>
                                <h4>Without fees and 10x of</h4>
                                <span>$ 11,13</span>
                                <input type="radio" name='warranty' value={111.30} onClick={handleServiceTotal} />
                            </div>
                            <div>
                                <h3>+36 warranty months</h3>
                                <h4>Without fees and 10x of</h4>
                                <span>$ 15,58</span>
                                <input type="radio" name='warranty' value={152.80} onClick={handleServiceTotal} />
                            </div>
                        </div>
                    </div>
                    <aside className="aside">
                        <h2><MdOutlineHandyman /> SERVICES</h2>
                        <ul>
                            <li>Extended Warranty <span>$ {(Number(service).toFixed(2).replace('.', ',')) || '0,00'}</span></li>
                            <li>Robbery and Theft <span>$ {warranty || '0,00'}</span></li>
                            <li><h3>Total value with all services: <span>$ {total || '0,00'}</span></h3></li>
                        </ul>
                        <a onClick={verifyWarranty}>GO TO THE CART</a>
                        <Link to={'/'}>KEEP BUYING</Link>
                    </aside>
                </div>
            </main>
        </>
    );
};

export default Payment;