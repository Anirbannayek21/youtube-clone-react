import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Catagory from '../../components/catagory/Catagory'
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import Homescreen from '../homeScreen/Homescreen'
import "./_main.scss"

const Main = () => {
    const [toggleSidebar, settoggleSidebar] = useState(false)

    const handleToggleSidebar = () => settoggleSidebar(!toggleSidebar)

    const handleOff = () => settoggleSidebar(false);
    return (
        <>
            <Header handleToggleSidebar={handleToggleSidebar} />
            <div className="app_container ">
                <div className="app_sidebar">
                    <Sidebar sidebar={toggleSidebar} handleOff={handleOff} notShow={false} />
                </div>
                <Container fluid className="app_main ">
                    <Catagory />
                    <Homescreen sidebar={toggleSidebar} />
                </Container>
            </div>
        </>
    )
}

export default Main
