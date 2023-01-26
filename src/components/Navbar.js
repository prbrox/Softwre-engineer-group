import { AppBar, Button, IconButton, Toolbar } from '@mui/material';

export default function Navbar() {
    return (
        <>
            <AppBar position="static" >
                <Toolbar>
                    <IconButton size='large' edge='start' color='inherit' aria-label='logo'>

                    </IconButton>
                    <Button variant="contained" size='large' href="/databaseControls" color="success" style={{ margin: 20 }}>
                        Controls
                    </Button>
                    <Button variant="contained" size='large' href="/" color="success" style={{ margin: 20 }}>
                        Home
                    </Button>

                </Toolbar>
            </AppBar>
        </>
    )
}