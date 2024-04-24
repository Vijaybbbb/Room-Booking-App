import React from 'react'
import { useState } from 'react';
import './MyBookings.css'
import useFetch from '../../hooks/useFetch';
import { baseUrl } from '../../utils';
import { useSelector } from 'react-redux';
import Navbar from '../../Components/Navbar/Navbar';

const MyBookings = () => {

      
       const {userId}  = useSelector(state => state.userDetails)
       const { data, loading, error } = useFetch(`${baseUrl}/user/getAllBookings/${userId}`);
       console.log(data);
       const [showFilter, setShowFilter] = useState(false);
       const [filter, setFilter] = useState({
         company: '',
         items: '',
         exactDate: '',
         from: '',
         to: ''
       });


       const [filteredReceipts, setFilteredReceipts] = useState([]);


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


  return (
    <div className='myBookingsPage'>

       <Navbar/>
       <div id="app">
              <div>
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
              </div>
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
      {filteredReceipts && (
        <div>
          {filteredReceipts.length !== 0 ? (
            filteredReceipts.map((receipt, index) => (
              <div key={index} className="receipt__container">
                <p className="receipt__client">{findCompanyName(receipt)}</p>
                <p className="receipt__date">{receipt.date}</p>
                <p className="receipt__days">{receipt.items} items</p>
                <p className="receipt__cost">£{receipt.totalCost}</p>
              </div>
            ))
          ) : (
            <div>
              <p>There are no matching orders</p>
            <div className="receipt__container">
                <p className="receipt__client"></p>
                <p className="receipt__date"></p>
                <p className="receipt__days"> items</p>
                <p className="receipt__cost"></p>
              </div>
              <div className="receipt__container">
                <p className="receipt__client"></p>
                <p className="receipt__date"></p>
                <p className="receipt__days"> items</p>
                <p className="receipt__cost"></p>
              </div>
              <div className="receipt__container">
                <p className="receipt__client"></p>
                <p className="receipt__date"></p>
                <p className="receipt__days"> items</p>
                <p className="receipt__cost"></p>
              </div>
              <div className="receipt__container">
                <p className="receipt__client"></p>
                <p className="receipt__date"></p>
                <p className="receipt__days"> items</p>
                <p className="receipt__cost"></p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    </div>
    
   
  )
}

export default MyBookings
