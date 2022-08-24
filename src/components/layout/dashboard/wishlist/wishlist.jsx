import { IoMdHeart } from 'react-icons/io';
import { useEffect, useState } from 'react';
import Favorites from './favorites/favorites';
import { Link } from 'react-router-dom';
const products = require('../../../../assets/data/products.json');

const body = {
    method: "GET",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function verifyCurrentUser(useremail) {
    let response = await fetch(`http://localhost:3001/account/wishlist/${useremail}`, body);
    let result = response.json();
    return result;
}

const Wishlist = (props) => {
    let [favorites, setFavorites] = useState([]);

    useEffect(() => {
        verifyCurrentUser(props.useremail).then(data => setFavorites(data)).catch(err => console.error(err));
    }, [favorites]);

    function getThumbnail(thumbnail) {
        for (let i = 0; i < products.products.length; ++i) {
            if (Number(products.products[i].id) === thumbnail) {
                return products.products[i].thumbnail;
            };
        };
    };

    return (
        <main className="container__wishlist">
            <h1><IoMdHeart /> FAVORITES</h1>
            {
                favorites.length === 0 ?
                    <div>
                        <h2>You have not favorited any products.</h2>
                        <Link to={'/'}>Back to Home</Link>
                    </div> :
                    <ul className="container__list">
                        {
                            favorites.map((product, index) => <Favorites key={index} productId={product.productId} name={product.name} rank={product.rank} price={product.price} thumbnail={getThumbnail(product.productId)} useremail={props.usermeail} />)
                        }
                    </ul>
            }
        </main>
    );
};

export default Wishlist;