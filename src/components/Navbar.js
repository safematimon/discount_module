import { useState,useEffect } from 'react';
import {  Badge } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import useCartStore from '../store/useCartStore';
import useDiscountStore from '../store/useDiscountStore';
import CartModal from './CartModal';
import './navbar.scss'

const Navbar = () => {

  const [isCartOpen, setIsCarteOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { cartItems } = useCartStore();
  const { setSelectNull } = useDiscountStore();

  const openCart = () => {
    setIsCarteOpen(true);
  };

  const closeCart = () => {
    setIsClosing(true);
    setSelectNull()
  };

  useEffect(() => {
    if (isClosing) {
      setTimeout(() => {
        setIsCarteOpen(false);
        setIsClosing(false);
      }, 300); // animation duration 
    }

    // overflow hidden to body when modalCart is open
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = ''; // reset to default
    }
    // vlean 
    return () => {
      document.body.style.overflow = '';
    };
  }, [isClosing,isCartOpen]);


  return (
    <nav className='Navbar' >
      <div className='menu'>SHOP</div>
      <div className='right'>
        <Badge className='custom-badge' count={cartItems.length}>
          <FontAwesomeIcon icon={faCartShopping} onClick={openCart}/>
        </Badge>
      </div>
      <CartModal  isOpen={isCartOpen} isClosing={isClosing} closeModal={closeCart} />
    </nav>
  )
}


export default Navbar