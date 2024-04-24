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

       function handleClick(e){
        e.preventDefault()
        setOpenDetails(true)
       }
       
       function close(e){
        e.preventDefault()
        setOpenDetails(false)
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
                <img src={`../../../src/images/${order.images[0]}`} style={{height:'200px',width:'200px',borderRadius:'5px'}}/>
                </div>
                <div style={{paddingLeft:'100px'}}>
                  <p className="receipt__client">{order.hotelName}</p>
                  <div style={{display:'flex',gap:'5px'}}>
                    {
                      order?.bookedNumbers?.map((no)=>(
                        <div style={{width:"30px",height:'30px',background:'#003580'}}>
                          <label htmlFor="" style={{fontSize:'13px',}}>{no}</label>
                        </div>
                      ))
                    }
                  </div>
                 <p className="receipt__days">{order.status}</p>
                </div>
                <div style={{}}>
                  <button onClick={handleClick}>Order Details</button>
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
          <div>
             <div className="reserve">
              <div className="rContainer"  style={{width:"750px",height:'500px',borderRadius:'10px',marginLeft:"350px"}}>
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={close} />
                <span>Reservation Details</span>
               
                  <div className="rItem">
                    <div className="rItemInfo">
                     34wgrgerg
                    </div>
                    <div className="rSelectRooms">
                      
                        <div className="room" >
                          <label htmlFor=""></label>
                         
                        </div>
                    
                    </div>
                  </div>
            
             {/* //<button  className='rButton'>Reserve Now</button> */}
           </div>
        </div>
          </div>
        )
      }
    </div>
    </div>
    
   
  )
}

export default MyBookings
