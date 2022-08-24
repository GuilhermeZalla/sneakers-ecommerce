import Header from "../../common/header/header";
import { MdPayment, MdOutlinePayments } from 'react-icons/md';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";

const PaymentBuyout = () => {
    let buttons = document.getElementsByTagName('button');
    let sections = document.getElementsByTagName('section');
    let cash = localStorage.getItem('incash');
    let installments = localStorage.getItem('installment');
    let name = localStorage.getItem('name');
    let quant = localStorage.getItem('quant');

    const handleOption = e => {
        e.target.style.backgroundColor = 'hsl(26, 100%, 55%)';
        e.target.style.color = 'hsl(223, 64%, 98%)';

        for (let i = 0; i < sections.length; ++i) {
            if (sections[i].getAttribute('id') === e.target.value) {
                sections[i].style.display = 'flex';
            } else {
                sections[i].style.display = 'none';
            };
        };

        for (let i = 0; i < buttons.length; ++i) {
            if (buttons[i] !== e.target) {
                buttons[i].style.backgroundColor = 'transparent';
                buttons[i].style.color = 'hsl(26, 100%, 55%';
            };
        };
    };

    return (
        <>
            <Header />
            <main className="main-payment-buyout">
                <h1><MdPayment /> PAYMENT METHODS</h1>
                <div className="container">
                    <aside>
                        <ul>
                            <li><button type="button" value="cash" onClick={handleOption}><FaRegMoneyBillAlt /> CASH</button></li>
                            <li><button type="button" value="debit" onClick={handleOption}><MdOutlinePayments /> DEBIT CARD</button></li>
                            <li><button type="button" value="credit" onClick={handleOption}><MdOutlinePayments /> CREDIT CARD</button></li>
                        </ul>
                    </aside>
                    <section id="cash">
                        <h2>Cash</h2>
                        <p><strong>The best way to pay for your purchases</strong></p>
                        <p>Pay with cash and get <strong>30% off</strong>. With cash payment, <strong>your purchase is immediately approved</strong>, which makes your shipping even faster.</p>
                        <ul>
                            <li>YOUR PURCHASE TOTAL: <span className="value">$ {cash}</span></li>
                            <li><p>YOUR TOTAL IN CASH: <span className="value">$ {cash}</span></p> <span>(Save: $ 0,00)</span></li>
                        </ul>
                        <footer>
                            <Link to={`/payment/cart/${name}/${quant}`}>GO BACK</Link><Link to={`/payment/cart/buyout/result/${name}/${'cash'}`}>PAY WITH CASH</Link>
                        </footer>
                    </section>
                    <section id="debit">
                        <h2>Debit Card</h2>
                        <p><strong>The best way to pay for your purchases</strong></p>
                        <p>Pay with debit card and get <strong>30% off</strong>. With debit card, <strong>your purchase is immediately approved</strong>, which makes your shipping even faster.</p>
                        <form>
                            <p>
                                <input type="text" placeholder="Name on the card" />
                                <input type="text" placeholder="Card's number" />
                            </p>
                            <p>
                                <input type="month" min='2018-01' />
                                <input type="text" maxLength={4} placeholder="Verification code (CVV)" />
                                <input type="text" maxLength={9} placeholder="Social Security Number" />
                                <input type="date" />
                            </p>
                            <p>
                                <select id="installments-debit" name="installments">
                                    <option value={parseFloat(cash)}>1x - no descounts and without fees - $ {(parseFloat(cash)).toFixed(2).toString().replace('.', ',')}</option>
                                </select>
                            </p>
                        </form>
                        <footer>
                            <Link to={`/payment/cart/${name}/${quant}`}>GO BACK</Link><Link to={`/payment/cart/buyout/result/${name}/${'debit'}`}>PAY WITH DEBIT CARD</Link>
                        </footer>
                    </section>
                    <section id="credit">
                        <h2>Credit Card</h2>
                        <p><strong>The best way to pay for your purchases</strong></p>
                        <p>Pay with credit card and get <strong>10% off</strong>. With credit card, <strong>your purchase will be approved after the bank's approve</strong>, usually takes only 24 hours.</p>
                        <form>
                            <p>
                                <input type="text" placeholder="Name on the card" />
                                <input type="text" placeholder="Card's number" />
                            </p>
                            <p>
                                <input type="month" min='2018-01' />
                                <input type="text" maxLength={4} placeholder="Verification code (CVV)" />
                                <input type="text" maxLength={9} placeholder="Social Security Number" />
                                <input type="date" />
                            </p>
                            <p>
                                <select id="installments-card" name="installments">
                                    <option value={parseFloat(cash) - (parseFloat(installments) * 0.1)}>1x - 10% descount and without fees - $ {(parseFloat(installments) - (parseFloat(installments) * 0.1)).toFixed(2).toString().replace('.', ',')}</option>
                                    <option value={(parseFloat(installments) / 2).toFixed(2).toString().replace('.', ',')}>2x - no descounts and without fees - $ {(parseFloat(installments) / 2).toFixed(2).toString().replace('.', ',')}</option>
                                    <option value={(parseFloat(installments) / 3)}>3x - no descounts and without fees - $ {(parseFloat(installments) / 3).toFixed(2).toString().replace('.', ',')}</option>
                                    <option value={(parseFloat(installments) / 4)}>4x - no descounts and without fees - $ {(parseFloat(installments) / 4).toFixed(2).toString().replace('.', ',')}</option>
                                    <option value={(parseFloat(installments) / 5)}>5x - no descounts and without fees - $ {(parseFloat(installments) / 5).toFixed(2).toString().replace('.', ',')}</option>
                                    <option value={(parseFloat(installments) / 6)}>6x - no descounts and without fees - $ {(parseFloat(installments) / 6).toFixed(2).toString().replace('.', ',')}</option>
                                    <option value={(parseFloat(installments) / 7)}>7x - no descounts and without fees - $ {(parseFloat(installments) / 7).toFixed(2).toString().replace('.', ',')}</option>
                                    <option value={(parseFloat(installments) / 8)}>8x - no descounts and without fees - $ {(parseFloat(installments) / 8).toFixed(2).toString().replace('.', ',')}</option>
                                    <option value={(parseFloat(installments) / 9)}>9x - no descounts and without fees - $ {(parseFloat(installments) / 9).toFixed(2).toString().replace('.', ',')}</option>
                                    <option value={(parseFloat(installments) / 10)}>10x - no descounts and without fees - $ {(parseFloat(installments) / 10).toFixed(2).toString().replace('.', ',')}</option>
                                    <option value={((parseFloat(installments) * 11 * (.60 / 100)) + parseFloat(installments)) / 11}>11x - no descounts and with fees ($ 0.60) - $ {(((parseFloat(installments) * 11 * (.60 / 100)) + parseFloat(installments)) / 11).toFixed(2).toString().replace('.', ',')}</option>
                                    <option value={((parseFloat(installments) * 12 * (.70 / 100)) + parseFloat(installments)) / 12}>12x - no descounts and with fees ($ 0,70) - $ {(((parseFloat(installments) * 12 * (.70 / 100)) + parseFloat(installments)) / 12).toFixed(2).toString().replace('.', ',')}</option>
                                </select>
                            </p>
                        </form>
                        <footer>
                            <Link to={`/payment/cart/${name}/${quant}`}>GO BACK</Link><Link to={`/payment/cart/buyout/result/${name}/${'credit'}`}>PAY WITH CREDIT CARD</Link>
                        </footer>
                    </section>
                </div>
            </main>
        </>
    );
};

export default PaymentBuyout;