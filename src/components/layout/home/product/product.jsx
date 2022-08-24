import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const body = {
    method: "POST",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function verifyCurrentUser(useremail) {
    let response = await fetch(`http://localhost:3001/account/validation/${useremail}`, {
        method: "GET",
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

async function postWishlist(user, id, name, price, rank) {
    let response = await fetch(`http://localhost:3001/account/wishlist/${user}/${id}/${name}/${price}/${rank}`, body);
    let result = response.json();
    return result;
};

async function deleteWishlist(user, id) {
    let response = await fetch(`http://localhost:3001/account/wishlist/${user}/${id}`, {
        method: "DELETE",
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

async function getWishlist(user) {
    let response = await fetch(`http://localhost:3001/account/wishlist/favorites/${user}`, {
        method: "GET",
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

const Product = (props) => {
    const [wishlist, setWishlist] = useState([]);
    const [heart, setHeart] = useState(<IoMdHeartEmpty />);
    const [isLogged, setLogin] = useState(false);
    let stars = [];
    let user;

    useEffect(() => {
        if (localStorage.getItem('useremail')) {
            user = localStorage.getItem('useremail');
            verifyCurrentUser(user).then(data => setLogin(data.logged)).catch(err => console.error(err));
            getWishlist(user).then(data => {
                for(let i = 0; i < data.length; ++i){
                     if(data[i].name === props.name){
                        setHeart(<IoMdHeart />);
                     };
                };
            }).catch(err => console.error(err));
        };
    }, [isLogged])

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

    const handleWishlist = () => {
        if ((heart).type.name === 'IoMdHeartEmpty' && isLogged) {
            setHeart(<IoMdHeart />);
            postWishlist(user, props.productId, props.name, props.price, props.rank).then(data => console.log({result: 'Successfully posted.'})).catch(err => console.error(err));
        } else if (isLogged !== true) {
            window.alert("A login is necessary to use the Wishlist.")
        } else {
            setHeart(<IoMdHeartEmpty />)
            deleteWishlist(user, props.productId).then(data => console.log(data)).catch(err => console.error(err));
        };
    };

    if (props.type === "sneaker") {
        return (
            <article className="article">
                <figure className="article__figure">
                    <Link to={`/product_overview/${props.productId}`}><img src={props.thumbnail} alt={props.name} /></Link>
                </figure>
                <h2 className="article__title">{props.name}<span className="product-price">${props.price}</span></h2>
                <p className="article__paragraph">
                    {stars}
                    <span className="article__rank"></span>
                    <button type="button" onClick={handleWishlist}>{heart}</button>
                </p>
            </article>
        );
    } else {
        return (
            <article className="article h-10">
                <figure className="article__figure">
                    <Link to={`/product_overview/${props.productId}`}><img src={props.thumbnail} alt={props.name} /></Link>
                </figure>
                <h2 className="article__title">{props.name}<span className="product-price">${props.price}</span></h2>
                <p className="article__paragraph">
                    {stars}
                    <span className="article__rank"></span>
                    <button type="button" onClick={handleWishlist}>{heart}</button>
                </p>
            </article>
        );
    };
};

export default Product;