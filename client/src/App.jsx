import React,{useEffect} from 'react';
import {Welcome,Navbar,Home,Donate,Request,NgoPage,SignIn,Support,Transactions} from './components';
import axios from 'axios';
import AOS from 'aos';
import "aos/dist/aos.css";
import {Toaster} from 'react-hot-toast';
axios.defaults.baseURL='https://humanitarian-exchange.onrender.com/';
axios.defaults.credentials=true;

const App=()=>{
  useEffect(()=>{
    AOS.init({
      offset:100,
      duration:700,
      easing:"ease-in",
      delay:100,
    });
  });
  return(
    <div>
      <Toaster position='bottom-right' toastOptions={{duration:2000}}/>
    <Welcome/>

  

    </div>

  )
}

export default App;
