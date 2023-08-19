import './shop.scss'
import { PRODUCTS } from'../dummyData/product'
import { Product } from '../components/Product'

const Shop = () => {
  return (
    <div className='Shop'>
      <div className='products-container'>
        {PRODUCTS.map((product,index) => (
          <Product key={index} data={product} />
        ))}
      </div>
    </div>
  )
}

export default Shop