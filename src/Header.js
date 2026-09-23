import { useState } from 'react';
import { FiDroplet, FiGithub, FiMenu, FiX } from 'react-icons/fi';
import './Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-header__brand" href="#colors" onClick={close}>
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Ashish Ranjan logo" />
          <span><small>COLOR TOOL</small><strong>HTML Colors</strong></span>
        </a>
        <nav className={`site-header__nav${open ? ' is-open' : ''}`} aria-label="Main navigation">
          <a href="#colors" onClick={close}><FiDroplet aria-hidden="true" /> Palette</a>
          <a href="#converter" onClick={close}>Converter</a>
          <a href="https://github.com/a2rp/html-colors" target="_blank" rel="noopener noreferrer" onClick={close}><FiGithub aria-hidden="true" /> GitHub</a>
        </nav>
        <button className="site-header__menu" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
