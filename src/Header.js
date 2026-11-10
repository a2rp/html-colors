import { useEffect, useRef, useState } from 'react';
import { FiDroplet, FiGithub, FiMenu, FiX } from 'react-icons/fi';
import './Header.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 640) {
        setOpen(false);
        document.querySelector('#main-navigation a')?.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-header__brand" href="#colors" onClick={close}>
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Ashish Ranjan logo" />
          <span><small>COLOR TOOL</small><strong>HTML Colors</strong></span>
        </a>
        <nav id="main-navigation" className={`site-header__nav${open ? ' is-open' : ''}`} aria-label="Main navigation">
          <a href="#colors" onClick={close}><FiDroplet aria-hidden="true" /> Palette</a>
          <a href="#converter" onClick={close}>Converter</a>
          <a href="https://github.com/a2rp/html-colors" target="_blank" rel="noopener noreferrer" onClick={close}><FiGithub aria-hidden="true" /> GitHub</a>
        </nav>
        <button ref={menuButtonRef} className="site-header__menu" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
