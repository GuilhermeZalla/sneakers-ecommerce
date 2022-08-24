import { useRef, useState, useEffect } from "react";
let items = document.getElementsByClassName('address__item');

const body = {
    method: "DELETE",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function deleteAddress(id) {
    let response = await fetch(`http://localhost:3001/account/address/${id}`, body);
    let result = response.json();
    return result;
};

async function getAddress(useremail) {
    let response = await fetch(`http://localhost:3001/account/address/${useremail}`, {
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

async function setAddressDefault(id) {
    let response = await fetch(`http://localhost:3001/account/address/default/${id}`, {
        method: "PUT",
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

async function removeAddressDefault(id) {
    let response = await fetch(`http://localhost:3001/account/address/remove-default/${id}`, {
        method: "PUT",
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

const Address = (props) => {
    const [address, setAddress] = useState([]);
    let addressModal = useRef(null);
    let deleteModal = useRef(null);
    let item = useRef(null);
    let user = localStorage.getItem('useremail');

    useEffect(() => {
        getAddress(user).then(data => setAddress(data.result)).catch(err => console.error(err));
    }, [address]);

    const handleDefault = () => {
        item.current.style.background = 'hsl(25, 100%, 94%)';
        item.current.style.borderLeft = '4px solid hsl(26, 100%, 55%)';
        item.current.setAttribute('data-default', true);

        setAddressDefault(props.id).then(data => console.log(data)).catch(err => console.error(err));

        for (let i = 0; i < items.length; ++i) {
            if (items[i] !== item.current) {
                items[i].style.background = 'transparent';
                items[i].style.borderLeft = '4px solid rgba(128, 128, 128, 0.301)';
                items[i].setAttribute('data-default', false);
            };
        };
    };

    const handleRemoveDefault = () => {
        item.current.style.background = 'transparent';
        item.current.style.borderLeft = '4px solid rgba(128, 128, 128, 0.301)';
        item.current.setAttribute('data-default', false);
        removeAddressDefault(props.id).then(data => console.log(data)).catch(err => console.error(err));
    };

    const handleAddressModal = () => {
        if (addressModal.current.style.display === '' || addressModal.current.style.display === 'none') {
            addressModal.current.style.display = 'flex';
        } else {
            addressModal.current.style.display = 'none';
        };
    };

    const handleDeleteAddress = () => {
        deleteAddress(props.id).then(data => console.log(data)).catch(err => console.error(err));
        deleteModal.current.style.display = 'none'
    };

    if (props.isCart) {
        return (
            <>
                <li className="address__item" ref={item}>
                    <h2 className="address__type">{props.type}</h2>
                    <ul className="address__sub-list">
                        <li className="address__sub-item">{props.streetAddress}</li>
                        <li className="address__sub-item">NUMBER: &nbsp; {props.street_number}, {props.streetAddress_2} - {props.reference}</li>
                        <li className="address__sub-item">POSTAL: &nbsp; {props.postal} - {props.city}, {props.state}</li>
                    </ul>
                    <ul className="address__sub-list">
                        <li className="address__sub-item"><button type="button">EDIT</button></li>
                        <li className="address__sub-item"><button type="button" onClick={handleAddressModal}>SELECT OTHER</button></li>
                        <li className="address__sub-item"><button type="button">NEW ADDRESS</button></li>
                    </ul>
                </li>
                <div className="addresses-modal" ref={addressModal}>
                    <div className="modal">
                        <ul className="address__list ">
                            {
                                address?.map((address, index) => <Address key={index} id={address._id} type={address.type} isCart={false} streetAddress={address.street_address} street_number={address.street_number} streetAddress_2={address.street_address_2} reference={address.reference} postal={address.postal} city={address.city} state={address.state} />)
                            }
                        </ul>
                        <footer>
                            <button type="button" onClick={handleAddressModal}>CLOSE</button>
                        </footer>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <li className="address__item" ref={item}>
                    <h2 className="address__type">{props.type} <span>{props.default ? '(DEFAULT)' : null}</span></h2>
                    <ul className="address__sub-list">
                        <li className="address__sub-item">{props.streetAddress}</li>
                        <li className="address__sub-item">NUMBER: &nbsp; {props.street_number}, {props.streetAddress_2} - {props.reference}</li>
                        <li className="address__sub-item">POSTAL: &nbsp; {props.postal} - {props.city}, {props.state}</li>
                    </ul>
                    <ul className="address__sub-list">
                        <li className="address__sub-item"><button type="button" onClick={() => deleteModal.current.style.display = 'flex'}>DELETE</button></li>
                        <li className="address__sub-item"><button type="button">EDIT</button></li>
                        <li className="address__sub-item">{props.default ? <button type="button" onClick={handleRemoveDefault}>REMOVE DEFAULT</button> : <button type="button" onClick={handleDefault}>SET DEFAULT</button>}</li>
                    </ul>
                </li>
                <div className="address__container" ref={deleteModal}>
                    <div className="address__modal">
                        <h2 className="address__modal-title">Do you confirm to delete it?</h2>
                        <div>
                            <button type="button" onClick={handleDeleteAddress}>YES</button>
                            <button type="button" onClick={() => deleteModal.current.style.display = 'none'}>NO</button>
                        </div>
                    </div>
                </div>
            </>
        );
    };
};

export default Address;