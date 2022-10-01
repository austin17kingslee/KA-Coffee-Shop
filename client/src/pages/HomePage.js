import React,{useEffect} from 'react';
import Hero from '../components/Hero/Hero';
import SliderEvent from '../components/SliderEvent';
import EventList from '../components/EventList/EventList';
import ProductList from '../components/ProductList/ProductList';
import Footer from '../components/Footer/Footer';

import {motion} from "framer-motion"
import { useDispatch } from 'react-redux';
import { getEvent } from '../redux/actions/event';

function HomePage() {

const dispatch = useDispatch();
useEffect(() => {
  handleScrollPosition();
  dispatch(getEvent());
}, []);

  //function to maintain scroll position of productList on the HomePage
  const handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      sessionStorage.removeItem("scrollPosition");
    }
  }

  //click event passed to view button on product card on Homepage
  const handleClick = (e) => {
    sessionStorage.setItem("scrollPosition", window.pageYOffset);
  };
  return (
    <motion.div exit={{opacity:0}} initial={{opacity:0}} animate={{opacity:1}}>
      <main>
        {/* <Hero /> */}
        <SliderEvent />
        <EventList />
        <ProductList handleClick={ handleClick}/>
        <Footer />
      </main>
    </motion.div>
  );
}

export default HomePage
