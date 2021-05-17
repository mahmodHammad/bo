import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import CartItem from "../../pages/checkout/components/Cart"

const useStyles = makeStyles({
    root:{
    },
  list: {
    width: 250,
  },
  fullList: {
    width: '100vw',
  }
});

export default function TemporaryDrawer({draweOpen,toggleDrawer,cartData}) {
  const classes = useStyles();
  return (
    <Drawer className={classes.root} anchor="right" open={draweOpen} onClose={toggleDrawer( false)}>
        <CartItem cartData={cartData}/>
    </Drawer>
  );
}
