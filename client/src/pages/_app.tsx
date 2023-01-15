import axios from "axios";
import "tailwindcss/tailwind.css";
import "../../styles/globals.css";

axios.defaults.baseURL = "https://localhost:8000/"

//This is one of the important file of the next js. It is basically heart of the nextjs
// Every component renders through this pageprops 
function MyApp({ Component, pageProps }) {
  return (
    <div className= "h-screen font-serif bg-gray-900 text-white grid place-item-center ">
      <div>
    <Component {...pageProps} />;
    </div> 
  </div>
  )
}

export default MyApp;
