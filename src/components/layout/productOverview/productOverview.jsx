import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import { ImMinus } from 'react-icons/im';
import { BiPlusMedical, BiChevronRightCircle, BiChevronLeftCircle } from 'react-icons/bi';
import Header from "../../common/header/header";
import { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import Images from './images/images';

const body = {
    method: "GET",
    mode: "cors",
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

async function getProduct() {
    let response = await fetch(`http://localhost:3001/product`, body);
    let result = response.json();
    return result;
};

async function verifyAndUpdate(useremail, productName, productId, productPrice, quant) {
    let response = await fetch(`http://localhost:3001/product/${useremail}/${productName}/${productId}/${productPrice}/${quant}`, {
        method: "POST",
        mode: "cors",
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    let result = response.json();
    return result;
}

const ProductOverview = () => {
    const [product, setProduct] = useState([]);
    const [quant, setQuant] = useState(0);
    const [item, fillCart] = useState(0);
    let { id } = useParams();
    let modal = useRef(null);
    let modal2 = useRef(null);
    let slider = useRef();
    let slider2 = useRef();
    let close = useRef(null);
    let close2 = useRef(null);
    let user = localStorage.getItem('useremail');
    let items = new Array();

    useEffect(() => {
        getProduct().then(data => {
            for (let i = 0; i < data.products.length; ++i) {
                if (Number(data.products[i].id) === Number(id)) {
                    setProduct([data.products[i]]);
                };
            };
        }).catch(err => console.error(err));
    }, [])

    const handleModal = () => {
        if (modal.current.style.display === '' || modal.current.style.display === 'none') {
            modal.current.style.display = 'flex'
            close.current.style.display = 'block';
            slider.current.style.boxShadow = 'none';
        } else {
            modal.current.style.display = 'none';
        }
    }
    const handleModal2 = () => {
        if (modal2.current.style.display === '' || modal2.current.style.display === 'none') {
            modal2.current.style.display = 'flex'
            close2.current.style.display = 'block';
            slider2.current.style.boxShadow = 'none';
        } else {
            modal2.current.style.display = 'none';
        }
    }

    const closeModal = () => {
        modal.current.style.display = 'none';
        close.current.style.display = 'none';
        slider.current.style.boxShadow = '0 0 16px 0 #ff7d1ab0';
    }
    const closeModal2 = () => {
        modal2.current.style.display = 'none';
        close2.current.style.display = 'none';
        slider2.current.style.boxShadow = '0 0 16px 0 #ff7d1ab0';
    }

    const addItemToCart = () => {
        if (quant !== 0) {
            if (user === null) {
                items.push({ name: product[0].shoeName, id: product[0].id, price: product[0].price, quant: quant });
                localStorage.setItem('items', JSON.stringify(items));
                fillCart(quant);
                setQuant(0);
            } else {
                verifyAndUpdate(user, product[0].shoeName, product[0].id, product[0].price, quant).then(data => console.log(data)).catch(err => console.error(`Error: ${err}`));
            };
        };
    };

    if (product[0]?.type !== 'sneaker') {
        return (
            <>
                <Header item={item} />
                <main className="main__product-overview w-5">
                    <div className="container__modal" ref={modal}></div>
                    <div className="main__slider">
                        <button type="button" name='close' onClick={closeModal} ref={close}><MdClose /></button>
                        <button type="button" name='left' onClick={() => slider.current.scrollLeft -= 520}><BiChevronLeftCircle /></button>
                        <button type="button" name='right' onClick={() => slider.current.scrollLeft += 520}><BiChevronRightCircle /></button>
                        <figure onClick={handleModal} ref={slider}>
                            {
                                product[0]?.image_url?.map((img, index) => <Images key={index} url={img} name={product[0].shoeName} />)
                            }
                        </figure>
                    </div>
                    <article className="main__article">
                        <h1 className="main__title">{product[0]?.shoeName}</h1>
                        <p className="main__paragraph">{product[0]?.description}</p>
                        <span className="main__price">${product[0]?.price}</span>
                        <div className="main__payment">
                            <div>
                                <button type="button" onClick={() => setQuant(quant - 1)}><ImMinus /></button>
                                <span className="quant">{quant < 0 ? setQuant(0) : quant}</span>
                                <button type="button" onClick={() => setQuant(quant + 1)}><BiPlusMedical /></button>
                            </div>
                            <button type="button" onClick={addItemToCart}><AiOutlineShoppingCart /> Add to cart</button>
                        </div>
                    </article>
                </main>
            </>
        );
    } else {
        return (
            <>
                <Header item={item} />
                <main className="main__product-overview">
                    <div className="container__modal" ref={modal2}></div>
                    <div className="main__slider">
                        <button type="button" name='close' onClick={closeModal2} ref={close2}><MdClose /></button>
                        <button type="button" name='left' onClick={() => slider2.current.scrollLeft -= 520}><BiChevronLeftCircle /></button>
                        <button type="button" name='right' onClick={() => slider2.current.scrollLeft += 520}><BiChevronRightCircle /></button>
                        <figure onClick={handleModal2} ref={slider2}>
                            {
                                product[0]?.image_url?.map((img, index) => <Images key={index} url={img} name={product[0].shoeName} />)
                            }
                        </figure>
                    </div>
                    <article className="main__article">
                        <h1 className="main__title">{product[0]?.shoeName}</h1>
                        <p className="main__paragraph">{product[0]?.description}</p>
                        <span className="main__price">${product[0]?.price}</span>
                        <div className="main__payment">
                            <div>
                                <button type="button" onClick={() => setQuant(quant - 1)}><ImMinus /></button>
                                <span className="quant">{quant < 0 ? setQuant(0) : quant}</span>
                                <button type="button" onClick={() => setQuant(quant + 1)}><BiPlusMedical /></button>
                            </div>
                            <button type="button" onClick={addItemToCart}><AiOutlineShoppingCart /> Add to cart</button>
                        </div>
                    </article>
                </main>
            </>
        );
    };
};

export default ProductOverview;