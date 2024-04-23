import React, { useEffect, useState } from 'react'
import './Checkout.css'
import { useSelector } from 'react-redux'
import useFetch from '../../hooks/useFetch'
import { baseUrl } from '../../utils'
import axios from 'axios'
import useRazorpay from "react-razorpay";

const Checkout = ({handleClose,reserve}) => {

  const checkoutDetails  = useSelector(state => state.checkoutDetails)
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

    // async function getRoomNames() {
    //   try {
    //     const responses = await Promise.all(rooms.map(async roomId => {
    //       try {
    //         const res = await axios.get(`${baseUrl}/rooms/singleRoom/${roomId}`);
    //         console.log(res);
    //         return res.data.title; // Assuming 'title' is the property containing the room name
    //       } catch (error) {
    //         console.error('Error fetching room data for room:', roomId, error);
    //         return null; // Or handle error as needed
    //       }
    //     }));
    
    //     const names = {};
    //     responses.forEach((title, index) => {
    //       const roomId = rooms[index];
    //       if (title !== null) {
    //         names[roomId] = title;
    //       }
    //     });
    
    //     setRoomNames(names);
    //   } catch (error) {
    //     console.error('Error fetching room data:', error);
    //   }
    // }
    

    fetchData();
 
    
  }, [hotelId]);

  //function verify payment 
  async function verifyPaymentSucess(response, order) {
   
    await axios.post(`${baseUrl}/user/verifyPayment`, { response: response, order: order }, { withCredentials: true }).then((res) => {

    }).catch((err) => {

    })

  }


async function createOrder(){

    //close checkout page 
     handleClose()

     await axios.post(`${baseUrl}/user/createOrder`,checkoutDetails,{withCredentials:true}).then((res)=>{
      console.log(res);
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

            verifyPaymentSucess(response,res.data.order_id)
            
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
       <button onClick={handleClose}>back</button>
              
       <Product checkoutDetails={checkoutDetails}/>

       <div className="form-wrapper">
    <h2>Payment Checkout</h2>
    <form className="payment-form" style={{display:'flex',flexDirection:'column'}}>
      <div className="input-control">
        <label htmlFor="cardholder">Hotel's Name</label>
        <label htmlFor="cardholder">{hotelName}</label>
       
      </div>
      {/* <div className="input-control">
        <label htmlFor="cardnumber">Room Numbers</label>
        {
          rooms.map((room)=>(
            <div className="icon-input">
        <label htmlFor="cardholder">{room}</label>
          
        </div>
          ))
        }
      </div> */}
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
      <button  className="btn-order" onClick={(e)=>{
       e.preventDefault()
       createOrder()
       }} 
       
       >Place Order</button>
    </form>
  </div>
       </div>
    </div>
  )
}

const Product = ({checkoutDetails}) => (
       <div className="product">
         <img src="https://raw.githubusercontent.com/fleepgeek/dailyui/master/002-checkout/images/beats.png" alt="product" />
         <div className="info">
           
           <p className="type">Grand Total</p>
           <h2 className="price">${checkoutDetails.price}</h2>
         </div>
       </div>
     );



export default Checkout
