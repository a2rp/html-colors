import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 150);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <button className={`top-button${visible ? ' is-visible' : ''}`} type="button" aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><FiArrowUp aria-hidden="true" /></button>;
}
