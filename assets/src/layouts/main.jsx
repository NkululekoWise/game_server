import React from "react";
import {Outlet} from "react-router-dom"
import AppDrawer from "./../components/appdrawer";
import Footer from './../components/footer'
import Container from '@mui/material/Container';



function Main() {
    return (
        <React.Fragment>
            <AppDrawer />
            <Container >
                <Outlet />
            </Container>
            <Footer />
        </React.Fragment>
    )
}

export default Main;