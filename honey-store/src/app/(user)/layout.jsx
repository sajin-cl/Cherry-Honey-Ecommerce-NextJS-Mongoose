import Footer from '@/components/layouts/(user)/Footer'
import Navbar from '@/components/layouts/(user)/Navbar'
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