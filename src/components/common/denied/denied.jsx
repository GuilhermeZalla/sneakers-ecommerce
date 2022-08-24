import { Link } from "react-router-dom";
import { Fragment } from "react";
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Header from "../header/header";

const Denied = (props) => {
    return (
        <Fragment>
            <Header />
            <main className="main-denied">
                <h1 className="main__title"></h1>
                <div className="container">
                    <IoIosCloseCircleOutline />
                    <article className="main__article">
                        <h2 className="main__subtitle">Access denied</h2>
                        <p className="main__paragraph"><span>Oops!</span> It looks like you've tried to access the dashboard. Make sure you are logged in before trying to access the dashboard. The dashboard is exclusive to registered accounts.</p>
                        <Link to={'/'}>BACK</Link>
                    </article>
                </div>
            </main>
        </Fragment>
    );
};

export default Denied;