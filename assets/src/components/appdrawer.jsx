import React, { useState, useSi } from "react";
import { Link } from 'react-router-dom';

//styles
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import { Button } from "@mui/material";

function AppDrawer() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const linkStye = {
        color:"#FFF",
        fontSize:"13px"

    };
    function toggleDrawer() {
        setIsDrawerOpen(!isDrawerOpen);
    }
    
    return (
        <React.Fragment key={"left"}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar variant="h6" component="div" sx={{ flexGrow: 1 }} >
                        <IconButton
                            onClick={toggleDrawer}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <Avatar ><VideogameAssetIcon /></Avatar>
                        </IconButton>
                        <Box color="text.primary">
                            <Button>
                                <Link style={linkStye} to="/">Home</Link>
                            </Button>
                            <Button>
                                <Link style={linkStye}  to="/about">About</Link>
                            </Button>
                            <Button>
                                <Link style={linkStye} to="/contact">Contact</Link>
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <Drawer
                anchor={"left"}
                open={isDrawerOpen}
                onClose={toggleDrawer}>
                <h2>nothing</h2>
            </Drawer>

        </React.Fragment>);
}

export default AppDrawer;