import axios from "axios";

//axios configuration

const sampleUrl="http://localhost:3000"

export const tokenRequest=axios.create({
       baseURL:sampleUrl,  
})