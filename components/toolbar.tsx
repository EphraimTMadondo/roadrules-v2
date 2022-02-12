import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { CustomCenter } from './custom-center';

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

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }

  const AppBar = styled( MuiAppBar, {
    shouldForwardProp: ( prop ) => prop !== 'open',
  } )<AppBarProps>( ( { theme, open } ) => ( {
    transition: theme.transitions.create( [ 'margin', 'width' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    } ),
    ...( open && {
      width: `calc(100% - ${ drawerWidth }px)`,
      marginLeft: `${ drawerWidth }px`,
      transition: theme.transitions.create( [ 'margin', 'width' ], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      } ),
    } ),
  } ) );

  return (
    <AppBar
      position="fixed"
      open={drawerOpen}
      style={{ backgroundColor: "#333" }}
    >
      <Toolbar>
        <IconButton
          size="large"
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerOpen}
          sx={{ mr: 2, ...( drawerOpen && { display: 'none' } ) }}
        >
          <i className="material-icons">
            menu
          </i>
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )

}