import React from 'react'
import { useState } from 'react';
import './MyBookings.css'
import useFetch from '../../hooks/useFetch';
import { baseUrl } from '../../utils';
import { useSelector } from 'react-redux';
import Navbar from '../../Components/Navbar/Navbar';
import Header from '../../Components/Header/Header';
import { Center } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';



const MyBookings = () => {

      
       const {userId}  = useSelector(state => state.userDetails)
       const { data, loading, error } = useFetch(`${baseUrl}/user/getAllBookings/${userId}`);
       const [openDetails,setOpenDetails] = useState(false)
       console.log(data.bookings);
       const [showFilter, setShowFilter] = useState(false);
       const [filter, setFilter] = useState({
         company: '',
         items: '',
         exactDate: '',
         from: '',
         to: ''
       });


       const [bookings] = useState(data.bookings);
       const [selectedBooking,setSelectedBooking] = useState()
       console.log(selectedBooking);

       const [companies, setCompanies] = useState([]); // Assuming you have a state for companies
       const [filterInUse, setFilterInUse] = useState(false); // Assuming you have a state for filterInUse
     
       const toggleFilter = () => {
         setShowFilter(!showFilter);
       };
     
       const applyFilter = () => {
         // Logic to apply filter
         setFilterInUse(true);
         // You need to set filteredReceipts state based on your filter logic
       };
     
       const clearFilter = () => {
         // Logic to clear filter
         setFilter({
           company: '',
           items: '',
           exactDate: '',
           from: '',
           to: ''
         });
         setFilterInUse(false);
         // You might want to reset filteredReceipts state as well
       };
     
       const findCompanyName = (receipt) => {
         // Logic to find company name based on receipt
         // You need to implement this function
       };

       function handleClick(e,order){
        setSelectedBooking(order)
        e.preventDefault()
        setOpenDetails(true)
       }
       
       function close(e){
        e.preventDefault()
        setOpenDetails(false)
       }
       
       

       async function cancelOrder(orderId){
          await axios.post(`${baseUrl}/user/cancelOrder`,{
            orderId:orderId,
            userId:userId,
            rooms:selectedBooking.rooms,
            hotelId:selectedBooking.hotel,
            allDates:selectedBooking.allDates
          },{withCredentials:true}).then((res)=>{

          }).catch((err)=>{
            console.log(err);
          })
       }
       

  return (
    <div className='myBookingsPage'>

       <Navbar/>
       <Header type='list'/>
       <div id="app">
              {/* <div>
              <div className="listSearch">
                  <h1 className="isTitle">Search</h1>
                  <div className="lsItem">
                      <label htmlFor="">Designation</label>
                      <input type="text" />
                   </div>
                 <div className="lsItem">
                    <label htmlFor="">Check-in Date</label>
                  
                 </div>
                 <div className="lsItem">
                      <label htmlFor="">Options</label>
                      <div className="lsOptions">
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Min price <small> per night</small></span>
                        <input type="text" className='lsOptionInput'/>
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Max price <small> per night</small></span>
                        <input type="text" className='lsOptionInput'/>
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText">Adults</span>
                        <input type="number" className='lsOptionInput' />
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText" >Children</span>
                        <input type="number" className='lsOptionInput'  />
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText" >Room</span>
                        <input type="number" className='lsOptionInput'  />
                      </div>
                      </div>

                   </div>
                   <button >Search</button>
             </div>
              </div> */}
        <div>
      
        <h1>YOUR ORDERS</h1>
        <button onClick={toggleFilter} className="receipt__filter--toggle btn">
          Filter
        </button>
        {showFilter && (
          <div className="receipt__filter">
            <div>
              <select
                value={filter.company}
                onChange={(e) => setFilter({ ...filter, company: e.target.value })}
                label="Company"
              >
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="text"
                name="items"
                value={filter.items}
                onChange={(e) => setFilter({ ...filter, items: e.target.value })}
                label="number of items"
              />
            </div>
            {/* Remaining filter inputs */}
            {filterInUse && (
              <div>
                <button className="btn" onClick={applyFilter}>
                  Apply
                </button>
                <button className="btn" onClick={clearFilter}>
                  Clear
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {data.bookings && (
        <div>
          {data.bookings !== 0 ? (
            data.bookings.reverse().map((order, index) => (
              <div key={index} className="receipt__container">
                <div>
                <img src={`../../../src/images/${order.images[0]}`} />
                </div>
                <div style={{paddingLeft:'100px'}}>
                  <p className="receipt__client">{order.hotelName}</p>
                  <div style={{display:'flex',gap:'5px'}}>
                    {
                      order?.bookedNumbers?.map((no)=>(
                        <div className='roombox' >
                          <label htmlFor="">{no}</label>
                        </div>
                      ))
                    }
                  </div>
                 <p className="receipt__days">{order.status}</p>
                </div>
                <div className='btnContainer'>
                  <button onClick={()=>{handleClick(event,order)}}>Order Details</button>
                </div>
              </div>
              
            ))
          ) : (
            <div>
              <p>There are no matching orders</p>
           </div>
           
          )}
        </div>
      )}

      {
        openDetails&&(
            <div >
              <div className="reserve">
                <div className="rContainer" style={{ width: "750px", height: '500px', borderRadius: '10px', marginLeft: "350px" }}>
                  <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={close} />
                 
                  <div className='detailsBoxView'>
                    <div className="">
                      <h2 className="name">Details</h2>
                     

                      {/* Order info */}
                      <div className="order">
                        <p>Order No: 1234567890</p>
                        <p>Date: 4/5/2020</p>
                        <p>Shipping Address: My sweet home</p>
                      </div>

                      <hr />

                      {/* Details */}
                      <div className="details">
                        <h3>Details</h3>

                        <div className="product">


                          <div className="info">
                            <h4>{selectedBooking.hotelName}</h4>
                            <p>
                            {
                             selectedBooking?.bookedNumbers.map((no)=>(
                              <label htmlFor="">{no}{'  '}</label>
                             )) 
                            }
                            </p>
                            <p>Payment Method : Online Payment</p>
                          </div>
                        </div>

                        <p>128 $</p>
                      </div>

                      {/* Sub and total price */}
                      <div className="totalprice">
                        <p className="sub">Subtotal <span>{selectedBooking.totalPrice} $</span></p>
                        <p className="del">Tax <span>0 $</span></p>
                        <hr />
                        <p className="tot">Total <span>{selectedBooking.totalPrice} $</span></p>
                      </div>

                      {/* Footer */}
                      <footer>Lorem ipsum dolor sit amet consectetur adipisicing.</footer>
                    </div>
                  </div>

                  <div className="rSelectRooms">

                    <button>View Invoice</button>

                    <button onClick={() => {
                      cancelOrder(selectedBooking._id)
                    }}>Cancel Order</button>

                  </div>
                </div>

                {/* //<button  className='rButton'>Reserve Now</button> */}
              </div>
            </div>
      
        )
      }
    </div>

    </div>
    
   
  )
}

export default MyBookings
