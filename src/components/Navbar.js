import { AppBar, Button, Toolbar } from "@mui/material";

export default function Navbar() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button
            variant="contained"
            size="large"
            href="/databaseControls"
            color="secondary"
            style={{ margin: 20 }}
          >
            Menu
          </Button>
          <Button
            variant="contained"
            size="large"
            href="/"
            color="secondary"
            style={{ margin: 20 }}
          >
            Home
          </Button>
          <Button
            variant="contained"
            size="large"
            href="/LayoutForm"
            color="secondary"
            style={{ margin: 20 }}
          >
            Checkout
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
