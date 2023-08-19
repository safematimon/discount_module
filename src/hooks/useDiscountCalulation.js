import useCartStore from '../store/useCartStore';
import useDiscountStore from '../store/useDiscountStore';


const useDiscountCalulation = () => {
  const { cartItems } = useCartStore();
  const { selectedCoupon, selectedOnTop, selectedSeasonal } = useDiscountStore();
  
  const getCategoryTotal = (cartItems, category) => {
    let total = cartItems.filter(item => item.category === category)
    .reduce((acc, item) => acc + item.price * item.quantity, 0);
    return total;
  };
  
  // sum of all catagorie
  let normalPrice = 0 
  
  const totalCost = {}; // ei {clothing: 500, accessories: 250, electronics: 0}

  for (let category of ["clothing", "accessories", "electronics"]) {
    normalPrice += getCategoryTotal(cartItems, category);
    totalCost[category] = getCategoryTotal(cartItems, category);
  }
  
  // console.log(normalPrice,totalCost);
  
  const calculateDiscount = () => {
    let couponDiscount = 0
    let onTopDiscount = 0
    let seasonalDiscount = 0

    // init 
    let tempPrice = normalPrice
    // let tempPrice = parseFloat(normalPrice)

    // coupon Zone 
    // coupon reduce by total value not reduce each category equally.
    if (selectedCoupon?.amount) {
      couponDiscount =  selectedCoupon.amount;
      // prevent coupon > price
      if (couponDiscount > tempPrice){
        couponDiscount = tempPrice
      }
    } else if (selectedCoupon?.percent) {
      couponDiscount = (selectedCoupon.percent / 100) * tempPrice;
    } 

    tempPrice = tempPrice - couponDiscount
    
    // on Top Zone
    // check tepmprice not zero 
    if(tempPrice && selectedOnTop){
      let category = selectedOnTop.category
      // coin capped is calclution from (price - couponDiscount )
      if(category === 'coin'){
        onTopDiscount = parseFloat(selectedOnTop.amount)
        let discountCapped = tempPrice * 0.2;
        if(selectedOnTop.amount > discountCapped){
          onTopDiscount = parseFloat(discountCapped)
        }
      }
      // category amount case 
      else if(selectedOnTop.amount){
        onTopDiscount = selectedOnTop.amount
        if(onTopDiscount > totalCost[category]){
          onTopDiscount = totalCost[category]
        }
        // prevent negative
        if(onTopDiscount >= tempPrice){
          onTopDiscount = tempPrice
        }
      }
      // category percent case 
      // cal base on total of category
      // If cal from discounted price, it cannot be done
      // cuz hard to calculated separately in some cases.
      else if(selectedOnTop.percent){ 
        onTopDiscount = (selectedOnTop.percent / 100) * totalCost[category];
        // prevent negative
        if(onTopDiscount >= tempPrice){
          onTopDiscount = tempPrice
        }
      }
    }

    tempPrice = tempPrice - onTopDiscount

    // seasonal case
    // check tepmprice not zero 
    if(tempPrice && selectedSeasonal){
      seasonalDiscount = Math.floor((normalPrice - couponDiscount - onTopDiscount) / selectedSeasonal.every) *selectedSeasonal.discount
    }

    tempPrice = tempPrice - seasonalDiscount

    // console.log(couponDiscount,onTopDiscount,seasonalDiscount)
    
    return {couponDiscount,onTopDiscount,seasonalDiscount,tempPrice}
  };
    
    const {couponDiscount,onTopDiscount,seasonalDiscount,tempPrice} = calculateDiscount()
    
    const totalDiscount = couponDiscount + onTopDiscount + seasonalDiscount
    
    const updatePrice = tempPrice

    return {normalPrice,totalDiscount,updatePrice,couponDiscount,onTopDiscount,seasonalDiscount}
  }
  
  export default useDiscountCalulation
  