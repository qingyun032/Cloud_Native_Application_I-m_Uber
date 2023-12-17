/**
 * Calculate the price of the given route information
 *
 * @param {number} distance - Distance from start to destination of a passenger.
 * @param {number} carBrand - The car brand of this journey.
 * @param {number} rating - The rating of the driver
 * @param {number} isElectric - The car is electrical or not.
 * @returns {number} The calculated price if this journey.
 */
const calculatePrice = (distance, carBrand, type, rating, isElectric) => {
    try{
      // Define impact factors for each variable
      const distanceFactor = 10;   // Adjust based on the actual impact on price
      
      // const ratingFactor = 1.2;    // Adjust based on the actual impact on price
      let electricFactor = 1.0;
      if(isElectric)
        electricFactor = 1.1;   // Adjust based on the actual impact on price

      let price = distance*distanceFactor*(1+carBrand/10)*electricFactor;;
      if(type === 'SUV'){
        price +=5;
      }
      // console.log(price)
      // Return the calculated price
      return Math.round( price );
    } catch(error){
      return null;
    }
}

module.exports = calculatePrice;
  // Example usage:
//   const inputDistance = 20;         // Example distance in miles
//   const inputCarBrand = 'Tesla';    // Example car brand
//   const inputRating = 4.8;          // Example driver rating
//   const inputIsElectric = true;     // Example whether the car is electric or not
  
//   const totalPrice = calculatePrice(inputDistance, inputCarBrand, inputRating, inputIsElectric);
//   console.log(`Total Price: $${totalPrice.toFixed(2)}`);
  