import './total.scss'
import useCartStore from '../store/useCartStore';
import useDiscountCalulation from '../hooks/useDiscountCalulation';

const Total = () => {

  const { cartItems } = useCartStore();
  const { normalPrice,
          totalDiscount,
          couponDiscount,
          onTopDiscount,
          seasonalDiscount,
          updatePrice } = useDiscountCalulation()

  return (
    <div className='Total'>
      <table border="1">
        <thead>
            <tr>
              <th>Item</th>
              <th>QTY</th>
              <th>Unit Price</th>
              <th>Amount</th>
            </tr>
        </thead>
        <tbody>
        {cartItems.map((item, index) => (
          <tr key={index}>
            <td className='td-name'>{item.productName}</td>
            <td className='td-qty'>{item.quantity}</td>
            <td className='td-price'>฿{item.price}</td>
            <td className='td-amount'>฿{item.quantity*item.price}</td>
          </tr>
        ))}
          <tr >
            <td colSpan="2">&nbsp;&nbsp;</td>
            <td className='left'>Normal Price</td>
            <td className='td-right'>฿{normalPrice}</td>
          </tr>
          {couponDiscount > 0 &&
            <tr >
              <td colSpan="2">&nbsp;&nbsp;</td>
              <td className='left'>Coupon</td>
              <td className='td-right'>-฿{couponDiscount}</td>
            </tr>
          }
          {onTopDiscount > 0 &&
            <tr >
              <td colSpan="2">&nbsp;&nbsp;</td>
              <td className='left'>On Top</td>
              <td className='td-right'>-฿{onTopDiscount}</td>
            </tr>
          }
          {seasonalDiscount > 0 &&
            <tr >
              <td colSpan="2">&nbsp;&nbsp;</td>
              <td className='left'>Seasonal</td>
              <td className='td-right'>-฿{seasonalDiscount}</td>
            </tr>
          }
          {totalDiscount > 0 &&
            <tr >
              <td colSpan="2">&nbsp;&nbsp;</td>
              <td className='left'>Total Discount</td>
              <td className='td-right'>-฿{parseFloat(totalDiscount)}</td>
            </tr>
          }
          <tr >
            <td colSpan="2">&nbsp;&nbsp;</td>
            <td className='total'>Total</td>
            <td className='td-right total'>฿{updatePrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Total