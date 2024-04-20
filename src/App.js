import React from 'react'
import HtmlColors from './htmlColors'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <div>
            <HtmlColors />

            <ToastContainer />
        </div>
    )
}

export default App

