import React from 'react'
import HtmlColors from './htmlColors'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

const App = () => {
    return (
        <div>
            <HtmlColors />

            <ToastContainer />
            <Footer />
        </div>
    )
}

export default App

