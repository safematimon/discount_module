import './cartmodal.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Collapse } from 'antd';
import Cart from './Cart';
import Discount from './Discount';
import Total from './Total';
import useCartStore from '../store/useCartStore';
import useDiscountCalulation from '../hooks/useDiscountCalulation';

const CartModal = ({ closeModal, isOpen,isClosing }) => {

  const { cartItems } = useCartStore();

  const { normalPrice,totalDiscount,updatePrice } = useDiscountCalulation()

  const price = (totalDiscount>0 ) ? 
  <span className='price'>Total : {'  '} <span className='kill-text'>฿{normalPrice}</span>to ฿{updatePrice}</span> 
  : <span className='price' >Total : ฿{normalPrice}</span>;


  const items = [
    {
      key: '1',
      label: 'Discount',
      children: <Discount />,
    },
    {
      key: '2',
      label: price,
      children: <Total />,
    },
  ];

  return (
    <>
    <div className={`overlay ${isOpen ? 'visible' : ''}`} onClick={closeModal} />

    <div className={`CartModal ${isOpen ? 'open' : ''} ${isClosing ? 'close' : ''}`}>
      <div className='cart-modal-nav'>
          <div className='yourcart'>Your cart</div>
          <FontAwesomeIcon className="x-icon" icon={faXmark} onClick={closeModal}/>
        </div>

          { (isOpen && cartItems.length === 0) ? (
            <div className='empty'>Your cart is empty ;-;</div>
            ) : (
            <>
              <Cart/>
              <Collapse items={items} />
            </>
          )}
    </div>
    
    </>
  );
};

export default CartModal;
