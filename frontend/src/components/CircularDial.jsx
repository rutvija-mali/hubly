import {
    CircularProgressbar,
    buildStyles
  } from 'react-circular-progressbar';
  import 'react-circular-progressbar/dist/styles.css';
  import {getPercentage} from '../services/TicketService'
import { useEffect, useState } from 'react';
  
  export default function CircularDial() {
    const [percentage,setPercentage] = useState(0)
    useEffect(()=>{
      getPercentage(setPercentage)
    },[])
  
    return (
      <div style={{ width: 73.73, height: 73.73}}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: "#000000",       // Center text color
            pathColor: "#00D907",       // Green progress stroke
            trailColor: "#e6f0e6",      // Light grey background trail
            textSize: "18px",           // Font size of percentage
            strokeLinecap: "round"
          })}
        />
      </div>
    );
  }
  