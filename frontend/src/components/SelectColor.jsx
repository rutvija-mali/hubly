import React from 'react';
import ChatBotModel from './ChatBotModel';
import styles from '../styles/SelectColor.module.css';


const SelectColor = ({heading,setSelectedColor, selectedColor}) => {
  const colors = ['#FFFFFF', '#000000', '#33475B'];


  return (
    <ChatBotModel >
        <div className={styles.selectColorContainer}>
          <h5 className={styles.head}>{heading}</h5>
          {colors.map((color, index) => (
            <button
              type="button"
              key={index}
              className={styles.selectColors}
              style={{ backgroundColor: color }}
              onClick={()=>setSelectedColor(color)}
            />
          ))}

          <div className={styles.colorSelector}>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              style={{ marginBottom: "20px",backgroundColor:selectedColor }}
            />
            <div className={styles.colorSelectorDiv}>
              {selectedColor}
            </div>
          </div>
        </div>
    </ChatBotModel>
  );
};

export default SelectColor;
