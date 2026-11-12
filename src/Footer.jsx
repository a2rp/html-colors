import { FaCodepen, FaFacebook, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa6';
import { FiCoffee, FiHeart, FiMail, FiMessageCircle, FiUser } from 'react-icons/fi';
import './Footer.css';

const links = [
  ['Portfolio', 'https://www.ashishranjan.net', FiUser],
  ['GitHub', 'https://github.com/a2rp', FaGithub],
  ['CodePen', 'https://codepen.io/ash1198', FaCodepen],
  ['LinkedIn', 'https://www.linkedin.com/in/aashishranjan', FaLinkedin],
  ['Facebook', 'https://www.facebook.com/theash.ashish/', FaFacebook],
  ['YouTube', 'https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1', FaYoutube],
  ['Email', 'mailto:ash.ranjan09@gmail.com', FiMail],
  ['Support', 'https://a2rp-donation-page.netlify.app/', FiHeart],
  ['Buy Me a Coffee', 'https://buymeacoffee.com/a2rp', FiCoffee],
  ['Patreon', 'https://patreon.com/a2rp', FiMessageCircle],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <strong className="site-footer__brand"><img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ashish Ranjan logo" />HTML Colors</strong>
        <nav className="site-footer__links" aria-label="Developer and support links">
          {links.map(([label, href, Icon]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}><Icon aria-hidden="true" /></a>)}
        </nav>
      </div>
      <small className="site-footer__copyright">Copyright &copy; {new Date().getFullYear()} <a href="https://www.ashishranjan.net" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a></small>
    </footer>
  );
}
