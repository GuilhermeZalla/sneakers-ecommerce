import Logo from "../logo/logo";
import UserDropDrownMenu from "./userDropDownMenu/userDropDownMenu";
import CartItems from "./cartItems/cartItems";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineEmail, MdLockOutline, MdClose } from 'react-icons/md';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

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
    let response = await fetch(`http://localhost:3001/account/validation/${useremail}`, body);
    let result = response.json();
    return result;
};

async function getCart(useremail) {
    let response = await fetch(`http://localhost:3001/product/cart/${useremail}`, body);
    let result = response.json();
    return result;
};

const Header = () => {
    const [modalOption, setOption] = useState('login');
    const [loginUser, setLoginUser] = useState('');
    const [isLogged, setLogin] = useState(false);
    const [cart, setItemsCart] = useState([]);
    let eyeOpen = useRef(null);
    let eyeClose = useRef(null);
    let input = useRef(null);
    let loginModal = useRef(null);
    let userTaken = useRef(null);
    let phoneTaken = useRef(null);
    let inputUsername = useRef(null);
    let inputPhone = useRef(null);
    let loginMatch = useRef(null);
    let userMatch = useRef(null);
    let items = localStorage.getItem('items');

    useEffect(() => {
        let user;
        if (localStorage.getItem('useremail')) {
            user = localStorage.getItem('useremail');
            verifyCurrentUser(user).then(data => setLogin(data.logged)).catch(err => console.error(err));
            if (isLogged && items !== null) {
                setItemsCart(items);
            } else if (isLogged) {
                getCart(user).then(data => setItemsCart(data)).catch(err => console.error(err));
            } else {
                setItemsCart(items);
            };
        };
    }, [isLogged, cart]);

    const handleEye = () => {
        if (eyeClose.current.style.display === '' || eyeClose.current.style.display === 'block') {
            eyeClose.current.style.display = 'none';
            eyeOpen.current.style.display = 'block';
            input.current.setAttribute('type', 'text');
        } else {
            eyeClose.current.style.display = 'block';
            eyeOpen.current.style.display = 'none';
            input.current.setAttribute('type', 'password');
        };
    };

    const verifyUsername = useremail => {
        async function getData(info) {
            let response = await fetch(`http://localhost:3001/account/${info}`, body);
            let result = response.json();
            return result;
        };
        getData(useremail.target.value).then(data => {
            if (data.result) {
                userTaken.current.style.display = 'block';
                inputUsername.current.style.outline = '1px solid rgb(255, 0, 0)';
                inputUsername.current.value = null;
            } else {
                userTaken.current.style.display = 'none';
                inputUsername.current.style.outline = '1px solid rgba(128, 128, 128, 0.747)';
            };
        }).catch(err => console.error(err));
    };

    const verifyPhone = phone => {
        async function getData(info) {
            let response = await fetch(`http://localhost:3001/account/phone/${info}`, body);
            let result = response.json();
            return result;
        };
        getData(phone.target.value).then(data => {
            if (data.result) {
                phoneTaken.current.style.display = 'block';
                inputPhone.current.style.outline = '1px solid rgb(255, 0, 0)';
                inputPhone.current.value = null;
            } else {
                phoneTaken.current.style.display = 'none';
                inputPhone.current.style.outline = '1px solid rgba(128, 128, 128, 0.747)';
            }
        }).catch(err => console.error(err));
    };

    const verifyLogin = password => {
        async function getData(info1, info2) {
            let response = await fetch(`http://localhost:3001/account/validation/${info1}/${info2}`, body);
            let result = response.json();
            return result;
        };
        getData(loginUser, password.target.value).then(data => {
            if (data.result) {
                loginMatch.current.style.display = 'none';
            } else {
                loginMatch.current.style.display = 'block';
                userMatch.current.value = null;
                input.current.value = null;
            }
        }).catch(err => console.error(err));
    };

    return (
        <header className="header">
            <nav className="header__navbar">
                <ul className="header__list">
                    <li className="header__item"><Link to={'/'} className="logo"><Logo /></Link></li>
                    <li className="header__item"><a href="#">Collections</a></li>
                    <li className="header__item"><a href="#">Men</a></li>
                    <li className="header__item"><a href="#">Women</a></li>
                    <li className="header__item"><a href="#">About</a></li>
                    <li className="header__item"><a href="#">Contact</a></li>
                </ul>
                <ul className="header__list">
                    <li className="header__item">
                        {
                            cart?.length === 0 ? null : <span>{cart?.length}</span>
                        }
                        <a role="button"><AiOutlineShoppingCart /></a>
                        <div className="header__cart-body">
                            <header className="header__cart-header">
                                <h2 className="header__subtitle">Cart</h2>
                                {
                                    cart?.length === 0 ? null : <span>{cart?.length} {cart?.length === 1 ? 'item' : 'items'}</span>
                                }
                            </header>
                            {
                                cart?.length === 0 ?
                                    <ul className="header__empty-list">
                                        <li className="header__cart-item empty">Your cart is empty.</li>
                                    </ul> :
                                    <ul className="header__cart-list">
                                        {
                                            cart?.map((item, index) => <CartItems key={index} id={item.productId} name={item.name} price={item.price} quant={item.quant} />)
                                        }
                                    </ul>
                            }
                        </div>
                    </li>
                    {
                        isLogged ? <UserDropDrownMenu /> : <li className="header__item nologin"><button type="button" name='nologin' onClick={() => loginModal.current.style.display = 'flex'}><FaUserCircle /></button></li>
                    }
                </ul>
            </nav>
            {
                modalOption === 'login' ?
                    <div className="modal-login" ref={loginModal}>
                        <main className="main-form">
                            <button type="button" onClick={() => loginModal.current.style.display = 'none'}><MdClose /></button>
                            <form method="POST" action="http://localhost:3001/account/login" className="login">
                                <fieldset>
                                    <legend>Login to Your Account</legend>
                                    <p>
                                        <input type="email" name="useremail" placeholder='Email' className="login" ref={userMatch} onBlur={e => setLoginUser(e.target.value)} required />
                                        <MdOutlineEmail />
                                    </p>
                                    <p>
                                        <input type="password" name="password" placeholder='Password' autoComplete="on" className="login" ref={input} onBlur={verifyLogin} required />
                                        <MdLockOutline />
                                        <a role="button" onClick={handleEye} ref={eyeClose} className="eye eye-close"><RiEyeCloseLine /></a>
                                        <a role="button" onClick={handleEye} ref={eyeOpen} className="eye eye-open"><RiEyeLine /></a>
                                        <span className="verify" ref={loginMatch}>Email and password don't match</span>
                                    </p>
                                    <p>
                                        <button type="submit">Sign In</button>
                                    </p>
                                    <p>
                                        <span>New Here? <br /><a role="button" onClick={() => setOption('register')}>Sign Up</a> now and start your account in Sneakers to win discounts in our products!</span>
                                    </p>
                                </fieldset>
                            </form>
                        </main>
                    </div>
                    :
                    <div className="modal-login" ref={loginModal}>
                        <main className="main-form">
                            <button type="button" onClick={() => loginModal.current.style.display = 'none'}><MdClose /></button>
                            <form method="POST" action="http://localhost:3001/account/register" className="register">
                                <fieldset>
                                    <legend>Create Your Account</legend>
                                    <p>
                                        <label htmlFor="email" className="username">Email <span>(You'll use this as your user ID)</span></label>
                                        <input id="email" type="email" name="useremail" placeholder='email@hotmail.com' ref={inputUsername} onBlur={verifyUsername} required />
                                        <span className="exists" ref={userTaken}>Sorry... email already taken</span>
                                    </p>
                                    <p>
                                        <label htmlFor="password">Password</label>
                                        <input id="password" type="password" name="password" placeholder='********' autoComplete="on" required />
                                    </p>
                                    <p>
                                        <label htmlFor="name">Full Name</label>
                                        <input id="name" type="text" name="full_name" placeholder='Ezio Auditore de Firenze' maxLength="40" required />
                                    </p>
                                    <p>
                                        <label htmlFor="phone">Phone *<span>(recommended)</span></label>
                                        <input id="phone" type="text" name="phone" placeholder="+55119XXXXYYYY" maxLength={16} ref={inputPhone} onBlur={verifyPhone} required />
                                        <span className="exists" ref={phoneTaken}>Sorry... phone already taken</span>
                                    </p>
                                    <p>
                                        <label htmlFor="phone">Second Contact <span>(recommended)</span></label>
                                        <input id="phone" type="text" name="phone2" placeholder="+55119XXXXYYYY" maxLength={16} ref={inputPhone} required />
                                    </p>
                                    <p>
                                        <label htmlFor="bday">Birthday</label>
                                        <input id="bday" type="date" name="birthday" placeholder='Birthday' required />
                                    </p>
                                    <p>
                                        <label htmlFor="genders" required>Gender</label>
                                        <select id="genders" name="gender">
                                            <option value="Man">Man</option>
                                            <option value="Woman">Woman</option>
                                            <option value="None">Prefer not to say</option>
                                        </select>
                                    </p>
                                    <p>
                                        <button type="submit">Create Account</button>
                                    </p>
                                    <p className="form__paragraph"> Already have an account? <span><a role="button" onClick={() => setOption('login')}>Login</a></span></p>
                                </fieldset>
                            </form>
                        </main>
                    </div>
            }
        </header>
    );
};

export default Header;