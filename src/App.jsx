import HtmlColors from './htmlColors'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import Header from './Header';
import ScrollToTop from './ScrollToTop';

const App = () => {
    return (
        <div>
            <Header />
            <HtmlColors />

            <ToastContainer />
            <ScrollToTop />
            <Footer />
        </div>
    )
}

export default App

