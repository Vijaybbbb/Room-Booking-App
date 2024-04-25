import React, { useEffect, useState } from 'react'
import './Checkout.css'
import { useSelector } from 'react-redux'
import useFetch from '../../hooks/useFetch'
import { baseUrl } from '../../utils'
import axios from 'axios'
import useRazorpay from "react-razorpay";

const Checkout = ({handleClose,reserve,setOpen}) => {

  const checkoutDetails  = useSelector(state => state.checkoutDetails)
  const userDetails = useSelector(state => state.userDetails)
console.log(checkoutDetails);
  const hotelId = checkoutDetails.hotelId
  const rooms = checkoutDetails.rooms

  const [hotelName, setHotelName] = useState('');
  const [roomNames, setRoomNames] = useState([]);
  const [Razorpay] = useRazorpay();

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

    fetchData();
 
    
  }, [hotelId]);

  //function verify payment 
  async function verifyPaymentSucess(response, bookingId) {
   
    await axios.post(`${baseUrl}/user/verifyPayment`,
     { response: response,
       bookingId: bookingId ,
      userId:userDetails.userId
      
      }, { withCredentials: true }).then((res) => {

        reserve()

    }).catch((err) => {

    })

  }


async function createOrder(){

    //close checkout page 
     handleClose()

     await axios.post(`${baseUrl}/user/createOrder`,checkoutDetails,{withCredentials:true}).then((res)=>{
      setOpen(false)
      
      
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


  return (
    <div className='userCheckoutWindow'>

      <div className='userCheckoutWindowContainer'>


        <Product checkoutDetails={checkoutDetails} />

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
                <input type="text" name="cvc" id="cvc" />
              </div>
              <div>
                <label htmlFor="">Contact</label>
                <input type="text" name="cvc" id="cvc" />
              </div>
            </div>
            <div className="control-group">
              <div className="input-control">
                <label htmlFor="expiration">Check-in Date</label><br />
                <div className="icon-input">
                  <input type="text" name="expiration" readOnly id="expiration" />
                </div>
              </div>
              <div className="input-control">
                <label htmlFor="cvc">Check-out Date</label>
                <input type="text" name="cvc" id="cvc" />
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

const Product = ({checkoutDetails}) => (
       <div className="product">
         <div className="info">
           <p className="type">Grand Total</p>
           <h2 className="price">${checkoutDetails.price}</h2>
         </div>
       </div>
     );



export default Checkout
