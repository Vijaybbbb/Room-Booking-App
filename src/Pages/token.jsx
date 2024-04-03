import axios from "axios";

const sampleUrl="http://localhost:3000"


export const tokenRequest=axios.create({
       baseURL:sampleUrl,  
})