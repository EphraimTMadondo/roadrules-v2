import Icon from '@mui/material/Icon';

import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';

interface ToolbarComponentProps {
  drawerOpen: boolean;
  setDrawerOpen: ( newDrawerState: boolean ) => void;
  title: string;
  drawerWidth: number;
}

export function ToolbarComponent ( props: ToolbarComponentProps ) {

  const { drawerOpen, setDrawerOpen, title, drawerWidth } = props;

  function handleDrawerOpen () {
    setDrawerOpen( true );
  }

  return (
    <AppBar
      position="static"
      // style={{ backgroundColor: "#333" }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleDrawerOpen}
        >
          <Icon>menu</Icon>
        </IconButton>

        <Typography variant="h6" component="div" sx={{ color: "#fff", flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )

}