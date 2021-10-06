import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles.css';

import LogoWhite from '../../assets/logo-white.png';
import Logo from '../../assets/logo.png';

export default function Header({ whiteVersion, hideCart }) {

  const {cart} = useSelector((state) => state.shop)

  function openDrawer() {

    const event = new CustomEvent('openCart');
    window.dispatchEvent(event);
  }

  return (
    <div>
      <Link to="/">
        <header className="col-12 py-4 text-center px-4">
          <img src={whiteVersion ? LogoWhite : Logo} alt="Logo" />
        </header>
      </Link>

      {!hideCart &&
        (<button onClick={openDrawer} className="btn cart-button btn-secondary">
          <span className="mdi mdi-cart"></span>
          {cart.length} Ítens
        </button>)}
    </div>

  )
}