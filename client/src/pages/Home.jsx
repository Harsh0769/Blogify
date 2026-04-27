import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Blog from '../components/Blog'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <div className='overflow-hidden'>
            <Navbar />
            <Hero />
            <Blog />
            <Footer />
        </div>
    )
}

export default Home