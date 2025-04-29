import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Dot
  } from 'recharts';
  import {getMissedChatsPerWeek} from '../services/ChatService'
import { useEffect, useState } from 'react';
  
  
  const CustomDot = (props) => {
    const { cx, cy } = props;  
    return (
      <circle cx={cx} cy={cy} r={5} fill="#000" stroke="#fff" strokeWidth={2} />
    );
  };
  
  export default function MissedChatsChart() {
    const [data ,setData] = useState([])
    useEffect(()=>{
        getMissedChatsPerWeek(setData)
    },[])

    if (!data.length) {
      return <div>Loading...</div>; 
    }
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            labelFormatter={() => ''}
            formatter={(value) => [`${value}`, 'Chats']}
          />
          <Line
            type="monotone"
            dataKey="chats"
            stroke="#00cc00"
            strokeWidth={3}
            dot={<CustomDot />}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  