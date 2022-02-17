import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { addKeys, K } from '../lib/keys';

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

  const { drawerOpen, handleDrawerClose } = props;

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
      anchor="left"
      open={drawerOpen}
      onClose={handleDrawerClose}
    >
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
