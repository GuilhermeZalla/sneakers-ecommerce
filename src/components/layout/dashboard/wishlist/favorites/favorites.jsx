import { FaTrashAlt, FaShoppingCart } from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const body = {
    method: "DELETE",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function deleteItem(id, useremail) {
    let response = await fetch(`http://localhost:3001/account/wishlist/${useremail}/${id}`, body);
    let result = response.json();
    return result;
};

const Favorites = (props) => {
    let stars = [];

    for (let i = 0; i < props.rank; ++i) {
        stars.push(<AiFillStar key={i} />);
    };

    if (stars.length < 5) {
        let i = 5;
        while (stars.length < 5) {
            stars.push(<AiOutlineStar key={i} />);
            i++;
        };
    };

    const handleDeleteItem = () => {
        deleteItem(props.productId, props.useremail).then(data => console.log(data)).catch(err => console.log(`Failed to delete item from wishlist \n Error: ${err}`));
    };

    return (
        <li className="container__item">
            <div>
                <figure>
                    <img src={props.thumbnail} alt={props.name} />
                </figure>
                <article>
                    <h2>{props.name}</h2>
                    <span>{stars}</span>
                </article>
            </div>
            <span>${props.price}</span>
            <div>
                <Link to={`/payment/${props.name}/${'0'}`}><FaShoppingCart /> BUY NOW</Link>
                <button type="button" onClick={handleDeleteItem}><FaTrashAlt /></button>
            </div>
        </li>
    );
};

export default Favorites;