import Footer from '@/components/layouts/Footer'
import Navbar from '@/components/layouts/Navbar'
import React from 'react'

const UserLayout = ({ children }) => {
    return (
        <>
            <header> <Navbar /> </header>
            <main> {children} </main>
            <Footer />
        </>
    )
}

export default UserLayout