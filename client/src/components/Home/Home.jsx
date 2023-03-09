import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import styles from "./Home.module.css";
import Contents from './Contents/Contents';

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Contents />
      <Footer />
    </div>
  )
}
export default Home;