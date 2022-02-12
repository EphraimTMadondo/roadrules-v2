import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { styled, ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';
import * as React from 'react';
import { theme } from '../lib/material-theme';
import ResponsiveDrawer from './drawer';
import { DrawerHeader } from "./drawer-header";
import { ToolbarComponent } from './toolbar';

const drawerWidth = 240;

interface MainProps {
  open?: boolean;
}

const Main = styled(
  'main',
  { shouldForwardProp: ( prop ) => prop !== 'open' }
)<MainProps>(
  ( { theme, open } ) => ( {
    flexGrow: 1,
    padding: theme.spacing( 3 ),
    transition: theme.transitions.create( 'margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    } ),
    marginLeft: `-${ drawerWidth }px`,
    ...( open && {
      transition: theme.transitions.create( 'margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      } ),
      marginLeft: 0,
    } ),
  } )
);

interface LayoutProps {
  noScaffolding?: boolean;
  children: any;
}

export default function Layout ( props: LayoutProps ) {

  const { noScaffolding, children } = props;

  const [ open, setOpen ] = React.useState( false );

  const handleDrawerClose = () => {
    setOpen( false );
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="column start-stretch">

        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Zimbabwe provisional driving license test question papers, learners licence & road traffic rules app!" />
          <meta name="og:title" content="Road Rules" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <Box sx={{ display: 'flex' }}>
          <CssBaseline />

          {
            !noScaffolding &&
            <ToolbarComponent
              drawerOpen={open}
              setDrawerOpen={setOpen}
              title="Road Rules"
              drawerWidth={drawerWidth}
            />
          }

          {
            !noScaffolding &&
            <ResponsiveDrawer
              drawerOpen={open}
              handleDrawerClose={handleDrawerClose}
              drawerWidth={drawerWidth}
            />
          }

          {
            !noScaffolding &&
            <Main open={open}>

              <DrawerHeader />
              <div className="column start-stretch">
                {children}
              </div>
            </Main>
          }
          {
            noScaffolding &&
            <div
              className="column start-stretch" style={{ width: "100%" }}>
              {children}
            </div>
          }

        </Box>

      </div>
    </ThemeProvider>
  )

}