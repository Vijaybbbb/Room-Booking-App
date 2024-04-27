import axios from "axios";
import { baseUrl } from "../utils";



export async function genrateInvoice(orderId, userId,option) {
       await axios.post(`${baseUrl}/user/generateInvoiceHandler/${userId}`, { orderId: orderId }, { withCredentials: true,responseType:'blob' }).then((response) => {
           
              
              if(option == 'download'){
                     const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
              const url = window.URL.createObjectURL(pdfBlob);
              
              // Create a temporary <a> element to trigger the download
              const a = document.createElement('a');
              a.href = url;
              a.download = 'invoice.pdf';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              
              // Revoke the object URL to free up memory
              window.URL.revokeObjectURL(url);
              }
              else{
                     const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
               const url = window.URL.createObjectURL(pdfBlob);
              window.open(url, '_blank'); // Open PDF in a new tab
              }
              

       }).catch((err) => {
              console.log(err);
       })
}


