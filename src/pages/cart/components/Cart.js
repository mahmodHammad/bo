import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import axios from "axios"
import CartItem from "./CartItem"
// import { TimeToLeaveRounded } from '@material-ui/icons';j
import Button from "@material-ui/core/Button";
import Adder from "./Adder"
import handleCheckout from "./Strip"

const useStyles = makeStyles((theme) => ({
  root: {
    width: 380,
  },
  title:{
    // color: theme.palette.txt.title,

  },
  inline: {
    display: 'inline',
    // color: theme.palette.txt.body,
  },
  avLarge:{
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight:15,
    borderRadius: 5
  },
  listItemStyle:{
      paddingTop:20,
      paddingBottom:20,
    // background:"#f00"
  },
  dividerStyle:{
      background:"#fff3",
  },
  price:{
    top: "30%",
    transform: "translateY(0)"
  },
  totlaCost:{
    color:"#f00"
  },
lay:{
  padding:10
}

}));

export default function Cart({removeItem,setsize,increaseQuantitly,cartData,toggleDrawer}) {
  const classes = useStyles();
  const GetTotalCost  = ()=>{
    let totalCost = 0
    cartData.forEach(item=>{
      totalCost += item.price*item.quan
    })
    return totalCost
  }
  
  const formatforcheckout = ()=>{
  const formatted =   cartData.map(c=>{
      const name = `${c.title} ${c.size}`  
      const data = {
        name,
        amount: c.price,
        images:[c.avatar], 
        quantity:c.quan
      }
      return data
    })
    console.log("خد ياعم",formatted)
     return formatted
  }

  const callapi=()=>{
    console.log("cartData",cartData)
  const fdata = { 
    
    Title:"Allah akbar",
    Price: 17,
    Description:"Hello my product",
    AvatarImg: "https://images.unsplash.com/photo-1612151855475-877969f4a6cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGQlMjBpbWFnZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    Quantity: 1,
    Size: "L",
    Images: ["https://cdn.wallpapersafari.com/38/45/KftFVL.jpg"]}

    axios.get("https://nameless-falls-85436.herokuapp.com/products",fdata).then(r=>{
  console.log("WOOOOW",r) 
}).catch(e=>console.log("a7aaaa",e))}
  
// console.table([{title:"heloo",age:12},{title:"ffheloo",age:122},{title:"hffeloo",age:12},])
  return (
    <List className={classes.root}>
      {cartData.map((d,index)=><React.Fragment> 
          <CartItem removeItem={removeItem} size={d.size} setsize={setsize} increaseQuantitly={increaseQuantitly} productID={d.id} img={d.avatar} title={d.title} quantity={d.quan} price={d.price} />
          {index !==cartData.length-1?<Divider  component="li" className={classes.dividerStyle}/>:null
      }
      </React.Fragment>
    )}
    <div className={classes.lay}>

        <Typography className={classes.totlaCost}>
        Total Cost: {GetTotalCost()}
      </Typography>

      <Button
      className={classes.button}
      fontSize="large"
      color="secondary"
      variant="outlined"
      // startIcon={<OpenInNewIcon />}
      onClick={()=>{
        toggleDrawer( false)
        handleCheckout(formatforcheckout())
      }
      }
      >
      Checkout
      </Button> 
      <Button
      className={classes.button}
      fontSize="large"
      color="secondary"
      variant="outlined"
      // startIcon={<OpenInNewIcon />}
      onClick={()=>{
        toggleDrawer( false)}
      }
      >
      Close
      </Button> 
      </div>

    </List>
  );
}
