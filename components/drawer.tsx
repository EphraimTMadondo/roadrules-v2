import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import * as React from 'react';
import { addKeys, K } from '../lib/keys';
import { DrawerHeader } from "./drawer-header";

interface Props {
  drawerOpen: boolean;
  handleDrawerClose: () => void;
  drawerWidth: number;
}

interface DrawerItem {
  icon: string;
  text: string;
  onClick: () => void;
}

export default function ResponsiveDrawer ( props: Props ) {

  const { drawerOpen, handleDrawerClose, drawerWidth } = props;

  const theme = useTheme();

  const [ primaryDrawerItems ] = React.useState<K<DrawerItem>[]>( addKeys( [
    {
      icon: "description",
      text: "Notes",
      onClick: () => {
      }
    },
    {
      icon: "school",
      text: "Practice",
      onClick: () => {
      }
    },
    {
      icon: "quiz",
      text: "Mock Test",
      onClick: () => {
      }
    }, 
    {
      icon: "timeline",
      text: "Progress",
      onClick: () => {
      }
    }
  ] ) );

  const [ secondaryDrawerItems ] = React.useState<K<DrawerItem>[]>( addKeys( [
    {
      icon: "account_circle",
      text: "Update Profile",
      onClick: () => {
      }
    },
    {
      icon: "share",
      text: "Tell A Friend",
      onClick: () => {
      }
    },
    {
      icon: "facebook",
      text: "Invite Friends via Facebook",
      onClick: () => {
      }
    }, 
    {
      icon: "help",
      text: "Rate Us",
      onClick: () => {
      }
    },
    {
      icon: "star",
      text: "Request Assistance",
      onClick: () => {
      }
    },
    {
      icon: "lock",
      text: "Log Out",
      onClick: () => {
      }
    }
  ] ) );

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={drawerOpen}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {
            theme.direction === 'ltr' ?
              <i className="material-icons">
                chevron_left
              </i> :
              <i className="material-icons">
                chevron_right
              </i>
          }
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {
          primaryDrawerItems
            .map( drawerItem => (
              <ListItem button key={drawerItem.key}>
                <ListItemIcon>
                  <i className="material-icons">
                    {drawerItem.icon}
                  </i>
                </ListItemIcon>
                <ListItemText primary={drawerItem.text} />
              </ListItem>
            ) )
        }
      </List>
      <Divider />
      <List>
        {
          secondaryDrawerItems
            .map( drawerItem => (
              <ListItem button key={drawerItem.key}>
                <ListItemIcon>
                  <i className="material-icons">
                    {drawerItem.icon}
                  </i>
                </ListItemIcon>
                <ListItemText primary={drawerItem.text} />
              </ListItem>
            ) )
        }
      </List>
    </Drawer>
  );

}
