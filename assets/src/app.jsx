import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';


//pages and components
import About from "./pages/about";
import Main from "./layouts/main"
import Home from "./pages/home";
import Contact from "./pages/contact";



// use default theme
// const theme = createTheme();

// Or Create your Own theme:
const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#aa00d8',
        },
        secondary: {
            main: '#ffe082',
        },
        error: {
            main: '#f44336',
        },
        text: {
            primary: '#fff',
            secondary: '#000'
        }
    },
    typography: {
        button: {
            fontSize: '1.1rem',
        },
    },
});

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/about', element: <About /> },
            { path: '/contact', element: <Contact /> }
        ]
    },
]);


function App() {
    return (
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>)
}

export default App;