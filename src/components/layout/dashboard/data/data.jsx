import { useState, useRef, useEffect } from 'react';
import { BsFileTextFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { HiPlusCircle } from 'react-icons/hi';
import { AiOutlineLock } from 'react-icons/ai';
import { IoLocationSharp } from 'react-icons/io5';
import { MdSaveAlt, MdClose } from 'react-icons/md';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import Address from '../../../common/address/address';

const body = {
    method: "GET",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function getAddress(useremail) {
    let response = await fetch(`http://localhost:3001/account/address/${useremail}`, body);
    let result = response.json();
    return result;
};

async function getVerifiedUseremail(useremail, password) {
    let response = await fetch(`http://localhost:3001/account/password/${useremail}/${password}`, body);
    let result = response.json();
    return result;
};

const Data = (props) => {
    const [address, setAddress] = useState([]);
    const [newPassword, setNewPassword] = useState('');
    let newAddress = useRef(null);
    let passwordModal = useRef(null);
    let password = useRef(null);
    let warningModal = useRef(null);
    let newPasswordConfirm = useRef(null);
    let user = localStorage.getItem('useremail');

    useEffect(() => {
        getAddress(user).then(data => setAddress(data.result)).catch(err => console.error(err));
    }, [address, user]);

    const verifyUseremail = e => getVerifiedUseremail(user, e.target.value).then(data => {
        if (data.result.length === 0) {
            e.target.placeholder = 'Current password is wrong';
            e.target.value = null;
        } else {
            e.target.style.color = 'initial';
        };
    }).catch(err => console.error(err));

    const handleConfirmPassword = e => {
        if (e.target.value !== newPassword) {
            e.target.placeholder = "The new password doesn't match";
            e.target.value = null;
        } else {
            e.target.style.color = 'initial';
        };
    };

    const handleEye = e => {
        if ((e.target.classList.contains('eye-close') && e.target.style.display === 'block') || (e.target.style.display === '')) {
            e.target.nextElementSibling.style.display = 'block';
            e.target.previousSibling.type = 'text';
            e.target.style.display = 'none';
        } else if ((e.target.classList.contains('eye-open') && e.target.style.display === 'block') || (e.target.style.display === '')) {
            e.target.previousElementSibling.previousElementSibling.type = 'password';
            e.target.previousSibling.style.display = 'block';
            e.target.style.display = 'none';
        };
    };

    const verifyRegisteredAddresses = () => {
        if (address.length === 4) {
            warningModal.current.style.display = 'flex';
        } else {
            newAddress.current.style.display = 'flex'
        };
    };

    return (
        <div className="container__data">
            <div className="warning-modal" ref={warningModal}>
                <div className="modal">
                    <h2>You reached the limit of registered addresses. Please, delete one before adding a new address.</h2>
                    <button type="button" onClick={() => warningModal.current.style.display = 'none'}>OK</button>
                </div>
            </div>
            <div className="password__container" ref={passwordModal}>
                <div className="password__modal">
                    <button type="button" onClick={() => passwordModal.current.style.display = 'none'}><MdClose /></button>
                    <form method="POST" action="http://localhost:3001/account/password/update" onSubmit={() => window.alert("Password successfully changed.")}>
                        <fieldset>
                            <legend>
                                <span>CHANGE PASSWORD</span> Inform your new password to your account
                            </legend>
                            <p ref={password}>
                                <input id="password" type="password" placeholder='Your current password *' autoComplete="on" className="input" required onBlur={verifyUseremail} />
                                <a role="button" className='eye eye-close' onClick={handleEye}><RiEyeCloseLine /></a>
                                <a role="button" className='eye eye-open' onClick={handleEye}><RiEyeLine /></a>
                            </p>
                            <p>
                                <input id="newpassword" type="password" placeholder='Your new password *' autoComplete="on" className="input" required onBlur={e => setNewPassword(e.target.value)} />
                                <a role="button" className='eye eye-close' onClick={handleEye}><RiEyeCloseLine /></a>
                                <a role="button" className='eye eye-open' onClick={handleEye}><RiEyeLine /></a>
                            </p>
                            <p>
                                <input id="confirmpassword" type="password" name='password' placeholder='Confirm your new password *' autoComplete="on" className="input" required onBlur={handleConfirmPassword} ref={newPasswordConfirm} />
                                <a role="button" className='eye eye-close' onClick={handleEye}><RiEyeCloseLine /></a>
                                <a role="button" className='eye eye-open' onClick={handleEye}><RiEyeLine /></a>
                            </p>
                            <p className="user">
                                <AiOutlineLock />
                                <input type="text" name='useremail' value={user} readOnly />
                            </p>
                            <p>
                                <button type="submit">SAVE</button>
                            </p>
                        </fieldset>
                    </form>
                </div>
            </div>
            <form method="POST" action="http://localhost:3001/account/update">
                <h1><FaUser /> MY DATA</h1>
                <fieldset>
                    <legend>
                        <span><BsFileTextFill /> QUICK DATA</span>
                        <button type="button" name='change' onClick={() => passwordModal.current.style.display = 'flex'}>CHANGE PASSWORD</button>
                    </legend>
                    <p>
                        <label htmlFor="fullName">Full Name*</label>
                        <input id="fullName" type="text" name='fullName' placeholder={props.fullName} required />
                    </p>
                    <p className="email">
                        <label htmlFor="email">E-mail / Login</label>
                        <input id="email" type="email" name='useremail' defaultValue={props.useremail} readOnly />
                        <AiOutlineLock />
                    </p>
                    <p className="gender">
                        <input id="male" type="radio" name='genre' value="Male" />
                        <label htmlFor="male">Male</label>

                        <input id="female" type="radio" name='genre' value="Female" />
                        <label htmlFor="female">Female</label>

                        <input id="genre" type="radio" name='genre' value="none" />
                        <label htmlFor="female">Rather not identify</label>
                    </p>
                    <p>
                        <label htmlFor="date">Birthday*</label>
                        <input id="date" type="date" name='date' placeholder={props.bday} required ></input>
                    </p>
                    <p>
                        <label htmlFor="firstTel">First Contact*</label>
                        <input id="firstTel" type="tel" name='tel1' placeholder={props.phone} required ></input>
                    </p>
                    <p>
                        <label htmlFor="secondTel">Second Contact</label>
                        <input id="secondTel" type="tel" name='tel2' placeholder={props.second_contact || 'Second contact not informed'}></input>
                    </p>
                    <p>
                        <button type="submit" name="save"><MdSaveAlt /> SAVE</button>
                    </p>
                </fieldset>
            </form>
            <div className="addresses">
                <div className="addresses__modal" ref={newAddress}>
                    <div className="container">
                        <button type="button" onClick={() => newAddress.current.style.display = 'none'}><MdClose /></button>
                        <form method="POST" action="http://localhost:3001/account/address">
                            <fieldset>
                                <legend>Register New Address</legend>
                                <p>
                                    <input type="text" name='postal' maxLength={20} placeholder="Postal / Zipcode *" required />
                                </p>
                                <p>
                                    <input type="text" name='type' maxLength={60} placeholder="Apartment / House / (Residential Name) *" required />
                                </p>
                                <p className="streetAddress">
                                    <input type="text" name='streetAddress' maxLength={50} placeholder="Street Address *" required />
                                    <input type="text" name='number' placeholder="Number *" required />
                                </p>
                                <p>
                                    <input type="text" name='streetAddress2' maxLength={60} placeholder="Street Address Line 2 *" required />
                                </p>
                                <p>
                                    <input type="text" name='reference' maxLength={60} required placeholder="Reference *" />
                                </p>
                                <p>
                                    <input type="text" name='district' maxLength={40} placeholder="District *" required />
                                </p>
                                <p className="city">
                                    <input type="text" name='city' placeholder="City *" required />
                                    <input type="text" name='state' placeholder="FS *" maxLength={2} required />
                                </p>
                                <p className="user">
                                    <AiOutlineLock />
                                    <input type="text" name='useremail' value={user} readOnly />
                                </p>
                                <p>
                                    <button type="submit" name='submit'>SAVE ADDRESS</button>
                                </p>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <h2><IoLocationSharp /> ADDRESSES</h2>
                {
                    address.length === 0 ?
                        <h2>You don't have any addresses registered</h2>
                        :
                        <ul className="address__list">
                            {
                                address?.map((address, index) => <Address key={index} id={address._id} type={address.type} isCart={false} default={address.default} streetAddress={address.street_address} street_number={address.street_number} streetAddress_2={address.street_address_2} reference={address.reference} postal={address.postal} city={address.city} state={address.state} />)
                            }
                        </ul>
                }
                <button type="button" name="form" onClick={verifyRegisteredAddresses}><HiPlusCircle />  NOVO ENDEREÇO</button>
            </div>
        </div>
    );
};

export default Data;