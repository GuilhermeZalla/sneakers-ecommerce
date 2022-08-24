import { useEffect, useState } from "react";
import Header from "../../common/header/header";
import Product from "./product/product";
import { IoChevronDownOutline } from 'react-icons/io5';
import { BsArrowUpSquare } from 'react-icons/bs';
import Logo from '../../../assets/images/logo.svg';
import Cover from '../../../assets/images/cover.png';

const body = {
    method: "GET",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function getData() {
    let response = await fetch(`http://localhost:3001/product`, body);
    let result = response.json();
    return result;
};

const Home = () => {
    const [products, setProducts] = useState([]);
    const [option, setOption] = useState('all brands');
    let buttons = document.getElementsByName('brands');

    useEffect(() => {
        getData().then(data => setProducts(data.products)).catch(err => console.error(err));
    }, [products]);

    const handleOption = e => {
        setOption(e.target.value);
        window.scrollTo(0, 350);
        for (let i = 0; i < buttons.length; ++i) {
            if (buttons[i].value === e.target.value) {
                buttons[i].classList.add('is-active');
            } else {
                buttons[i].classList.remove('is-active');
            };
        };
    };

    const goUp = () => window.scrollTo(0, 350);

    return (
        <>
            <Header />
            <div className="container">
                <header className="container__header">
                    <div>
                        <figure className="brand"><img src={Logo} alt="Sneakers brand" /></figure>
                        <h1 className="header__title">What are you shopping for today?</h1>
                    </div>
                    <figure className="cover"><img src={Cover} alt="Nike" /></figure>
                </header>
                <main className="main-products">
                    <button type="button" onClick={goUp}><BsArrowUpSquare /></button>
                    <aside className="main__aside">
                        <dl className="main__list">
                            <dt className="main__term">Sneakers</dt>
                            <dd className="main__item"><button name='brands' type="button" value="all brands" onClick={handleOption}>All Brands</button></dd>
                            <dd className="main__item"><button name='brands' type="button" value="nike" onClick={handleOption}>Nike</button></dd>
                            <dd className="main__item"><button name='brands' type="button" value="adidas" onClick={handleOption}>Adidas</button></dd>
                            <dd className="main__item"><button name='brands' type="button" value="rebook" onClick={handleOption}>Rebook</button></dd>
                            <dd className="main__item"><button name='brands' type="button" value="puma" onClick={handleOption}>Puma</button></dd>
                            <dd className="main__item"><button name='brands' type="button" value="vans" onClick={handleOption}>Vans</button></dd>
                            <dd className="main__item"><button name='brands' type="button" value="jordan" onClick={handleOption}>Jordan</button></dd>
                            <dd className="main__item"><button name='brands' type="button" value="asics" onClick={handleOption}>Asics</button></dd>
                        </dl>
                        <dl className="main__list">
                            <dt className="main__term">Clothes and Gifts</dt>
                            <dd className="main__item"><button name='brands' type="button" value="clothes and gifts" onClick={handleOption}>View All</button></dd>
                            <dd className="main__item"><button name='brands' type="button" value="shirt" onClick={handleOption}>Shirts &amp; Blouses</button></dd>
                            <dd className="main__item"><button name='brands' type="button" value="cap" onClick={handleOption}>Caps</button></dd>
                            <dd className="main__item"><button name='brands' type="button" value="gift" onClick={handleOption}>Gifts</button></dd>
                        </dl>
                    </aside>
                    <div className="container-products">
                        <h2>{option}</h2>
                        <nav className="main__navbar">
                            <ul className="navbar__list">
                                <li className="navbar__item">
                                    <div className="dropdown">
                                        <button type="button" name="dropdown">PRODUCT RANK <IoChevronDownOutline /></button>
                                        <div className="dropdown-menu">
                                            <ul className="dropdown__list">
                                                <li className="dropdown__item">
                                                    <button type="button" name="rank" value="highest">Highest</button>
                                                </li>
                                                <li className="dropdown__item">
                                                    <button type="button" name="rank" value="lowest">Lowest</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li className="navbar__item">
                                    <div className="dropdown">
                                        <button type="button" name="dropdown">COLOR <IoChevronDownOutline /></button>
                                        <div className="dropdown-menu colors">
                                            <ul className="dropdown__list">
                                                <li className="dropdown__item">
                                                    <button type="button" name="color" value="white">White</button>
                                                </li>
                                                <li className="dropdown__item">
                                                    <button type="button" name="color" value="black">Black</button>
                                                </li> <li className="dropdown__item">
                                                    <button type="button" name="color" value="grey">Grey</button>
                                                </li> <li className="dropdown__item">
                                                    <button type="button" name="color" value="red">Red</button>
                                                </li> <li className="dropdown__item">
                                                    <button type="button" name="color" value="green">Green</button>
                                                </li> <li className="dropdown__item">
                                                    <button type="button" name="color" value="blue">Blue</button>
                                                </li>
                                                <li className="dropdown__item">
                                                    <button type="button" name="color" value="yellow">Yellow</button>
                                                </li> <li className="dropdown__item">
                                                    <button type="button" name="color" value="mix">Mix</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        <div className="main__container">
                            {
                                products?.map((product, index) => (product.brand === option || option === 'all brands') && (product.type === 'sneaker' || option === product.type) || (option === 'clothes and gifts' && product.type !== 'sneaker') || (product.type === option) ? <Product key={index} productId={product.id} name={product.shoeName} thumbnail={product.thumbnail} price={product.price} rank={product.rank} type={product.type} /> : null)
                            }
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Home;