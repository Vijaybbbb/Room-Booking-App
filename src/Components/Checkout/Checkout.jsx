import React, { useEffect, useState } from 'react'
import './Checkout.css'
import { useDispatch, useSelector } from 'react-redux'
import useFetch from '../../hooks/useFetch'
import { baseUrl } from '../../utils'
import axios from 'axios'
import useRazorpay from "react-razorpay";
import { addCheckout } from '../../Redux/checkoutSlice'

const Checkout = ({handleClose,reserve,setOpen}) => {

  const checkoutDetails  = useSelector(state => state.checkoutDetails)
  const userDetails = useSelector(state => state.userDetails)
  console.log(checkoutDetails);
  const hotelId = checkoutDetails.hotelId
  const rooms = checkoutDetails.rooms
  const [coupenInput, setCoupenInput] = useState('');
  const [successMessage,setSuccessMessage]  = useState()
    const [errorMessage,setErrorMessage] = useState()
 
  const [hotelName, setHotelName] = useState('');
  const [roomNames, setRoomNames] = useState([]);
  const [Razorpay] = useRazorpay();
  const [priceAfterCoupen,setPriceAfterCoupen] =  useState()
  const [userFullDetails,setUserFullDetails] = useState()
  const dates = checkoutDetails.dates
  
  //convert timestamps to dates 
  let newDates = []
  function formatDate(timestamp) {
         // Convert timestamp to milliseconds
         var date = new Date(timestamp);

         // Options for formatting the date
         var options = {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
         };

         // Format the date using toLocaleDateString method
         return date.toLocaleDateString('en-US', options);
  }

  dates.forEach(function (timestamp) {
         newDates.push(formatDate(timestamp))
  });



  useEffect(() => {
    async function fetchData() {
      //get hotel name
      try {
        const response = await axios.get(`${baseUrl}/hotels/${hotelId}`);
        setHotelName(response.data.name);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
     }


     async function fetchUserDetails() {
      //get hotel name
      try {
        const response = await axios.get(`${baseUrl}/user/singleUserDetails/${userDetails.userId}`);
        setUserFullDetails(response?.data);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
     }

    fetchData();
    fetchUserDetails()
 
    
  }, [hotelId,checkoutDetails]);

  //function verify payment 
  async function verifyPaymentSucess(response, bookingId) {
   
    await axios.post(`${baseUrl}/user/verifyPayment`,
     { response: response,
       bookingId: bookingId ,
      userId:userDetails.userId
      
      }, { withCredentials: true }).then((res) => {
        console.log(res);
        reserve()

    }).catch((err) => {

    })

  }


async function createOrder(){

    //close checkout page 
     handleClose()

     await axios.post(`${baseUrl}/user/createOrder`,{checkoutDetails,priceAfterCoupen},{withCredentials:true}).then((res)=>{
      setOpen(false)
      console.log(res)
      
      if(res){
        const options = {
          key: "rzp_test_9QHYCj7luW7qlw", // Enter the Key ID generated from the Dashboard
          amount:res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "GetYouRoom",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: res.data.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
          handler: function (response) {

            verifyPaymentSucess(response,res.data.bookingId)

          },
          prefill: {
            name: "vijay ram ",
            email: "youremail@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
      
        const rzp1 = new Razorpay(options);
      
        rzp1.on("payment.failed", function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });
      
        rzp1.open();
      }

     }).catch((err)=>{
       console.log(err);
     })
}

function getCoupenInput(e){
  e.preventDefault()
  setCoupenInput(e.target.value)
}

async function handleCoupen(e){
  e.preventDefault()

  await axios.post(`${baseUrl}/user/checkCoupenValid/${userDetails.userId}`,{coupenCode:coupenInput,price:checkoutDetails.price},{withCredentials:true}).then((res)=>{
      setSuccessMessage(response.data.message)
      setPriceAfterCoupen(res.data.finalPrice)

  }).catch((err)=>{
    setErrorMessage(err.response.data.message)
    console.log(err);
  })

}


  return (
    <div className='userCheckoutWindow'>

      <div className='userCheckoutWindowContainer'>


        <Product checkoutDetails={checkoutDetails} priceAfterCoupen={priceAfterCoupen}/>

        <div className="form-wrapper">
          <h2>Payment Checkout</h2>
          <form className="payment-form" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className='items'>
              <div>
                <label htmlFor="">Hotel Name</label>
                <input type="text" name="cvc" id="cvc" value={hotelName} />
              </div>
              <div>
                <label htmlFor="">User Name</label>
                <input type="text" name="cvc" id="cvc" value={userFullDetails?.username}/>
              </div>
              <div>
                <label htmlFor="">Contact</label>
                <input type="text" name="cvc" id="cvc" value={userFullDetails?.phone}/>
              </div>
              <div>
                <label htmlFor="">Email Id</label>
                <input type="text" name="cvc" id="cvc" value={userFullDetails?.email}/>
              </div>
            </div>
            <div className='coupenBox'>
                 <label htmlFor="">Have A Coupen code ? </label>
                 <input type="text" onChange={getCoupenInput} name="cvc" id="cvc" placeholder='code'/>
                 <button className='cpnbtn' onClick={handleCoupen}>Apply</button>
                 {
                  successMessage && (
                    <label className='sucess'>{successMessage}</label>
                  )
                 }
                  {
                  errorMessage && (
                    <label className='error'>{errorMessage}</label>
                  )
                 }
                    
                    
                 
            </div>
           
            <div className="control-group">
              <div className="input-control">
                <label htmlFor="expiration">Check-in Date</label><br />
                <div className="icon-input">
                  <input type="text" name="expiration" readOnly id="expiration"  value={newDates[0]}/>
                </div>
              </div>
              <div className="input-control">
                <label htmlFor="cvc">Check-out Date</label>
                <input type="text" name="cvc" id="cvc" value={newDates[newDates.length-1]} />
              </div>
            </div><br /><br />
    
            <button className="btn-order" onClick={(e) => {
              e.preventDefault()
              createOrder()
            }}

            >Proceed to Payment</button>

          </form>
        </div>

        <button className='closebuttoncheckout' onClick={() => {
          handleClose()
          setOpen(false)
        }}>back</button>
      </div>
    </div>
  )
}

const Product = ({checkoutDetails,priceAfterCoupen}) => (
       <div className="product">
         <div className="info">
           <p className="type">Grand Total</p>
           <h2 className="price">${priceAfterCoupen && priceAfterCoupen  || checkoutDetails.price}</h2>
         </div>
       </div>
     );



export default Checkout
