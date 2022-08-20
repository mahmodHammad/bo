import React, { useEffect, useRef,useState } from "react";
import { sceneSetup, scene ,controls} from "./setup";
import { startAnimationLoop ,requestID} from "./Animate";
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer"

const useStyles = makeStyles((theme) => ({
  btnContainer:{
  },
  body:{
    overflow:"hidden",
    height:"100vh",
    width:"100vw",
    // border:"1px solid red",
    background:"#050505",
    display:"flex",
    alignItems:"center",
  }
}))
        

export default function Cat( ) {
  const classes = useStyles();
  const textInput = useRef(null);
  const [rotate,setrotate]=useState(true)
  useEffect(() => {
      if(scene){
        scene.clear()
      }
      if(rotate){
        startAnimationLoop();
        setrotate(false)
      }
      const canvasTarget = textInput.current;
      sceneSetup(canvasTarget);
    return () => {
      // Anything in here is fired on component unmount.
      window.cancelAnimationFrame(requestID);
          // controls.dispose();
  }
  },[]
    // window.cancelAnimationFrame(requestID)
  
  );

  return (
    <div className={classes.body}>
  

         
      <div ref={textInput} className="canvas"></div>
      {/* <Footer/> */}


  
    </div>
  );
}

//clean up to prevent memory leak
//   componentWillUnmount() {
//     window.cancelAnimationFrame(requestID);
//     controls.dispose();
//   }
