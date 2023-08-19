import './product.scss'
import useCartStore from '../store/useCartStore';

export const Product = (props) => {

  const { productName, price, productImage } = props.data;
  const { addToCart } = useCartStore();
  
  return (
    <div className="Product">
      <img src={productImage} alt={productImage}/>
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> ฿{price}</p>
      </div>
      <button 
        className="addToCartBttn" 
        onClick={() => addToCart(props.data)}
      >
        Add To Cart 
      </button>
    </div>
  )
}
