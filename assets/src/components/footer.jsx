import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';


function Copyright() {
    return (
        <Typography variant="body1" color="text.primary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Footer() {
    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: "primary.main",
            align: "center",
            color:"text.primary" ,
            mt: 2
        }} >
            <Grid container spacing={2}>
                <Grid item xs={12} xm={4}>
                    <Typography><a href="https://www.freepik.com/free-vector/set-vector-chronometers-timers-icons_10601700.htm#query=loading&from_query=loading%20sprite&position=47&from_view=search&track=sph">Image by macrovector</a> on Freepik</Typography>
                </Grid>
                <Grid item xs={12} xm={4}>
                    <Typography variant="body1" align="center" gutterBottom>
                        Footer
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        component="p"
                    >
                        Something here to give the footer a purpose!
                    </Typography>
                    <Copyright />
                </Grid>
                <Grid item xs={12} xm={4}></Grid>
            </Grid>
        </Box>);
}

export default Footer;