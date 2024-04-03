import axios from "axios";
import Cookies from 'js-cookie';

const cookieName = 'access_tocken';
const cookieValue = Cookies.get(cookieName); 

if (cookieValue) {
    console.log("Cookie value found:", cookieValue);
} else {
    console.log("Cookie not found or inaccessible.");
}

const sampleUrl="http://localhost:3000"


export const tokenRequest=axios.create({
       baseURL:sampleUrl,  
})