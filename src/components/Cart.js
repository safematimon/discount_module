import './cart.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import useCartStore from '../store/useCartStore';

const Cart = () => {

  const { cartItems, removeAllOfProduct, updateCart } = useCartStore();

  const handleInputChange = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      newQuantity = 1;
    }
    updateCart(itemId, newQuantity);
  };

  return (
        <div className='Cart'>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">

              <div className='img-wrap'>
                <img src={item.productImage}alt={item.productImage} />
              </div>
              <div className="cart-item-details">
                <div className='item-name'>{item.productName}</div>
                <div className='item-price'>Price: ฿{item.price}</div>
                <div className='item-actions'>
                  <button className="quantity-btn" onClick={() => updateCart(item.id, item.quantity - 1)}>-</button>
                    <input
                      className="quantity-input"
                      type="number" required
                      value={item.quantity}
                      onChange={(e) => handleInputChange(item.id, parseInt(e.target.value))}
                    />
                  <button className="quantity-btn" onClick={() => updateCart(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
              
              <div className='removeItem' onClick={() => removeAllOfProduct(item.id)}><FontAwesomeIcon icon={faXmark}/></div>
            </div>
          ))}
      </div>
  )
}

export default Cart