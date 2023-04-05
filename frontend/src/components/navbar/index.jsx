import { Tooltip, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';

export function Navbar() {
    return (
        <AppBar 
            position='absolute'
            style={{
                padding: '2vh',
            }}
        >
            <Tooltip>
                <Typography variant="h6" color="inherit" component="div">
                    Dashboard
                </Typography>
            </Tooltip>
        </AppBar>
    )
}