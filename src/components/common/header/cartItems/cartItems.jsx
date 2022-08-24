import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const products = require('../../../../assets/data/products.json');

const body = {
    method: "DELETE",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function deleteItem(useremail, productName) {
    let response = await fetch(`http://localhost:3001/product/delete/${useremail}/${productName}`, body);
    let result = response.json();
    return result;
};

const CartItems = (props) => {
    let user = localStorage.getItem('useremail');

    function getImage() {
        for (let i = 0; i < products.products.length; ++i) {
            if (Number(products.products[i].id) === Number(props.id)) {
                return products.products[i].thumbnail;
            };
        };
    };

    const handleDelete = () => deleteItem(user, props.name).then(data => console.log(data)).catch(err => console.log(`Error: ${err}`));

    return (
        <li className="header__cart-item">
            <div className="cart-container">
                <figure><img src={getImage()} alt={props.name} /></figure>
                <h3 className="header__product-name">{props.name} <br /> ${props.price} x {props.quant}
                    <span className="header__product-total">{` $${(props.price * props.quant).toFixed(2)}`}</span>
                </h3>
                <button type="button" name='trash' onClick={handleDelete}><FaTrashAlt className="trash" /></button>
            </div>
            <Link to={`/payment/${props.name}/${props.quant}`}>Checkout</Link>
        </li>
    );
};

export default CartItems;