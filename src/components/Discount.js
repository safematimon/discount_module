import { useState } from 'react'
import { DISCOUNTS } from'../dummyData/discount'
import { PRODUCTS } from'../dummyData/product'
import useDiscountStore from '../store/useDiscountStore';
import './discount.scss';

const Discount = () => {
  
  const {
    selectedCoupon,
    selectedOnTop,
    selectedSeasonal,
    setSelected,
  } = useDiscountStore();
  
  const [discountData, setDiscountData] = useState(DISCOUNTS)
  const [addDiscountType, setAddDiscountType] = useState("");

  // for add coupon
  const [couponName, setCouponName] = useState("");
  const [couponValue, setCouponValue] = useState("");
  const [couponType, setCouponType] = useState("");
  
  // for add optop
  const categories = [...new Set(PRODUCTS.map(product => product.category))];

  const [newCoinAmount, setNewCoinAmount] = useState("");

  const [optopName, setOptopName] = useState("");
  const [optopValue, setOptopValue] = useState("");
  const [optopCatagory, setOptopCatagory] = useState("");
  const [optopType, setOptopType] = useState("");

// for seasonal
  const [seasonalName, setSeasonalName] = useState("");
  const [seasonalEvery, setSeasonalEvery] = useState("");
  const [seasonalDiscount, setSeasonalDiscount] = useState("");

  const getNextId = (array) => {
    const maxId = array.reduce((max, current) => Math.max(max, current.id), 0);
    return maxId + 1;
  };

  const addCoupon = (e) => {
    e.preventDefault();

    const newCoupon = {
      id: getNextId(discountData.coupon),
      name: couponName,
      [couponType]: parseFloat(couponValue)
    };

    setDiscountData(prevData => ({
      ...prevData,
      coupon: [...prevData.coupon, newCoupon]
    }));

    setCouponName("");
    setCouponValue("");
    setCouponType("")
  };

  const addOntop = (e) => {
    e.preventDefault();

    const newOntop = {
      id: getNextId(discountData.onTop),
      name: optopName,
      [optopType]: parseFloat(optopValue),
      category:optopCatagory
    };

    setDiscountData(prevData => ({
      ...prevData,
      onTop: [...prevData.onTop, newOntop]
    }));

    setOptopName("");
    setCouponValue("")
    setOptopType("")
    setOptopCatagory("");
  };

  const updateCoinAmount = (e) => {
    e.preventDefault();

    const updatedCoin = discountData.onTop.map((discount) =>
      discount.name === 'Use Your coin' ? { ...discount, amount: newCoinAmount } : discount
    );

    setDiscountData((prevData) => ({
      ...prevData,
      onTop: updatedCoin,
    }));
  };

  const addSeasonal = (e) => {
    e.preventDefault();

    const newSeasonal = {
      id: getNextId(discountData.seasonal),
      name: seasonalName,
      every: seasonalEvery,
      discount: seasonalDiscount,
    };

    setDiscountData(prevData => ({
      ...prevData,
      seasonal: [...prevData.seasonal, newSeasonal]
    }));

    setSeasonalName("");
    setSeasonalEvery("")
    setSeasonalDiscount("")
  };

  return (
    <div className='Discount'>
      
      <div className='add-discount'>
        <label>Select Discount Type to Add</label>
        <select value={addDiscountType} onChange={e => setAddDiscountType(e.target.value)}>
          <option value="" disabled hidden>Select Type</option>
          <option value="" >---</option>
          <option value="coupon">coupon</option>
          <option value="ontop">ontop</option>
          <option value="seasonal">seasonal</option>
        </select>
        {addDiscountType === 'coupon' 
          && 
        <div className='add-coupon'>
          <form onSubmit={addCoupon} >
            <div className='input-container'>
              <input type="text" value={couponName} placeholder='Name' required
              onChange={e => setCouponName(e.target.value)} />
              <input type="number" min="1"  max={couponType === "percent" ? 100 : undefined}
              className='input-no-arrow' placeholder='Value' required
              value={couponValue} onChange={e => setCouponValue(e.target.value)} />
              <select value={couponType} onChange={e => setCouponType(e.target.value)} required>
                <option value="" disabled hidden>Type</option>
                <option value="amount">฿</option>
                <option value="percent">%</option>
              </select>
            </div>
            <button type="submit">Add</button>
          </form>
        </div>}

        {addDiscountType === 'ontop' 
          && 
          <div className='add-ontop' >
            <form onSubmit={addOntop} className='update-ontop-form'>
            <div className='input-continer'>
              <input type="text" value={optopName} placeholder='Name' required
                onChange={e => setOptopName(e.target.value)} />
              <input type="number" min="1" max={optopType === "percent" ? 100 : undefined}
                value={optopValue}  placeholder='Value' required
                className='input-no-arrow'onChange={e => setOptopValue(e.target.value)} />
              <select value={optopCatagory} onChange={e => setOptopCatagory(e.target.value)} required>
                <option value="" disabled hidden>Category</option>
                {categories?.map((category,index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select value={optopType} onChange={e => setOptopType(e.target.value)} required>
                <option value="" disabled hidden>Type</option>
                <option value="amount">฿</option>
                <option value="percent">%</option>
              </select>
            </div>
              <button type="submit">Add</button>
            </form>

            <form onSubmit={updateCoinAmount} className='update-coin-form'>
              <input
                type="number" min="0"
                placeholder="New Coin Amount"
                value={newCoinAmount}
                onChange={e => setNewCoinAmount(e.target.value)}
              />
              <button type='submit'>Update Coin </button>
            </form>
          </div>
        }

        {addDiscountType === 'seasonal' 
          && 
          <div className='add-seasonal'>
            <form onSubmit={addSeasonal} >
              <div className='input-container'>
                <input type="text" value={seasonalName} placeholder='Name' required
                onChange={e => setSeasonalName(e.target.value)} />
                <input type="number" min="1" 
                  placeholder='Every' required
                  value={seasonalEvery} onChange={e => setSeasonalEvery(e.target.value)} />
                <input type="number" min="1"  
                  placeholder='Discount' required value={seasonalDiscount} 
                  onChange={e => {
                    const newDiscount = parseInt(e.target.value);
                    if (!isNaN(newDiscount) && newDiscount < seasonalEvery) {
                      setSeasonalDiscount(newDiscount);
                    }
                  }}/> 
              </div>
              <button type="submit">Add</button>
            </form>
          </div>
          }

      </div>

      {/* Display Discount */}
      <div className='discount-type-container'>
        <div className='discount-type-label'>select coupon discount</div>
        <div className='discount-type-content'>
          {discountData.coupon.map((coupon,index) => (
            <div 
            key={coupon.id}
            className={`discount-item ${selectedCoupon === coupon ? 'selected' : ''}`}
            onClick={() => setSelected('Coupon', coupon)}
            >
              <div>{coupon.name}</div>
              {coupon.amount && <div>{coupon.amount}฿</div>}
              {coupon.percent && <div>{coupon.percent}%</div>}
            </div>
          ))}
        </div>
      </div>

      <div className='discount-type-label'>select on top discount</div>
      <div className='discount-type-content'>
        {discountData.onTop.map((ontop,index) => (
          <div 
          key={ontop.id}
          className={`discount-item ${selectedOnTop === ontop ? 'selected' : ''}`}
          onClick={() => setSelected('OnTop', ontop)}
          >
            <div>{ontop.name}</div>
            {ontop.amount && <div>{ontop.category}{` : `}{ontop.amount}฿</div>}
            {ontop.percent && <div>{ontop.category}{` : `}{ontop.percent}%</div>}
          </div>
        ))}
      </div>

      <div className='discount-type-label'>select seasonal discount</div>
      <div className='discount-type-content'>
        {discountData.seasonal.map((ss,index) => (
          <div 
          key={ss.id}
          className={`discount-item ${selectedSeasonal === ss ? 'selected' : ''}`}
          onClick={() => setSelected('Seasonal', ss)}
          >
            <div>{ss.name}</div>
            {ss.every && <div>every: {ss.every}฿</div>}
            {ss.discount && <div>discount: {ss.discount}฿</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Discount

