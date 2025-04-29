import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import Topbar from '../components/Topbar'
import heroSectionImg from '../assets/heroImg.svg'
import { IoArrowForward } from "react-icons/io5";
import videoSvg from '../assets/videoSvg.svg'
import adobeSvg from '../assets/adobeSvg.svg'
import elasticSvg from '../assets/elasticSvg.svg'
import opendoorSvg from '../assets/opendoorSvg.svg'
import airtableSvg from '../assets/airTableSvg.svg'
import framerSvg from '../assets/FramerSvg.svg'
import multiplePlatformImg from '../assets/multiplePlatformImg.svg'
import { Card } from '../components/Card';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import msgSVG from '../assets/Floating Action Button.svg'
import ChatbotBubble from '../components/ChatbotBubble';
import ChatBox from '../components/ChatBox';
import crossSvg from '../assets/Floating Action Cross (1).svg'


const Home = () => {
  const platformFeatures = [
    {
      heading: "MULTIPLE PLATFORMS TOGETHER!",
      point: "Email communication is a breeze with our fully integrated, drag & drop email builder."
    },
    {
      heading: "CLOSE",
      point: "Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!"
    },
    {
      heading: "NURTURE",
      point: "Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!"
    }
  ];

  const partnerLogos = [
    { src: adobeSvg, alt: "Adobe logo" },
    { src: elasticSvg, alt: "Elastic logo" },
    { src: opendoorSvg, alt: "Opendoor logo" },
    { src: airtableSvg, alt: "Airtable logo" },
    { src: elasticSvg, alt: "Elastic logo" },
    { src: framerSvg, alt: "Framer logo" }
  ];
  const pricingCards = [
    {
      heading: "STARTER",
      info: "Best for local businesses needing to improve their online reputation.",
      money: 199,
      includedIcons: [
        "Unlimited Users",
        "GMB Messaging",
        "Reputation Management",
        "GMB Call Tracking",
        "24/7 Award Winning Support"
      ]
    },
    {
      heading: "GROW",
      info: "Best for all businesses that want to take full control of their marketing automation and track their leads, click to close.",
      money: 399,
      includedIcons: [
        "Pipeline Management",
        "Marketing Automation Campaigns",
        "Live Call Transfer",
        "GMB Messaging",
        "Embed-able Form Builder",
        "Reputation Management",
        "24/7 Award Winning Support"
      ]
    }
  ];
  const [isInitialMsg,setIsInitialMsg] = useState(true)
  const [welcomeMsg, setWelcomeMsg] = useState("👋 Want to chat about Hubly? I'm an chatbot here to help you find your way.")
  const [isChatOpen , setIsChatOpen] = useState(false)
  const navigate = useNavigate();
  
  return (
    <div className={styles.homeMainContainer}>
       <Topbar/>
       <div className={styles.heroSection}>
          <div className={styles.leftHeroSection}>
             <h1>Grow Your Business Faster with Hubly CRM</h1>
             <p>Manage leads, automate workflows, and close deals effortlessly—all in one powerful platform</p>
             <div className={styles.heroSectionBtns}>
                <button className={`${styles.HeroBtns} ${styles.startBtn}`} onClick={()=>navigate('/signup')}>
                  Get started
                  <IoArrowForward/>
                </button>
                <button className={`${styles.HeroBtns} ${styles.videoBtn}`}>
                 <img src={videoSvg} alt="" />
                  Watch Video
                </button>                 
             </div>
          </div>
          <div className={styles.imgContainer}>
            <img src={heroSectionImg} alt="" />
          </div>
       </div>
        <div className={styles.mediaSection}>
          {partnerLogos.map((logo, index) => (
            <img key={index} src={logo.src} alt={logo.alt} className={styles.partnerLogo} />
          ))}

        </div>
        <div className={styles.middleSection}>
          <div className={styles.topSection}>
              <h2>At its core, Hubly is a robust CRM solution</h2>
              <p>Hubly helps businesses streamline customer interactions, track leads, and automate tasks—saving you time and maximizing revenue. Whether you’re a startup or an enterprise, Hubly adapts to your needs, giving you the tools to scale efficiently</p>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.leftSection}>
                <ul>
                  {platformFeatures.map((item,index)=>(
                    <li key={index}>
                      <h3>{item.heading}</h3>
                      <p>{item.point}</p>
                    </li>
                  ))}
                </ul>

            </div>
            <img src={multiplePlatformImg} alt="" />
          </div>

        </div>
         <div className={styles.planSection}>
            <div className={styles.headingSection}>
              <h2>We have plans for everyone!</h2>
              <p>We started with a strong foundation, then simply built all of the sales and marketing tools ALL businesses need under one platform</p>
            </div>
            <div className={styles.pricingSection}>
              {pricingCards.map((card,index)=>(
                  <Card
                  key={index}
                  heading={card.heading}
                  info={card.info}
                  money={card.money}
                  includedIcons={card.includedIcons}
                />
              ))}
            </div>           
         </div>
         {isInitialMsg && 
           <div className={styles.chatbotMsg}><ChatbotBubble welcomeMsg={welcomeMsg} onClick={()=>setIsInitialMsg(false)}/>
          </div>}
          {!isInitialMsg && isChatOpen && 
             <div className={styles.chatbox}>
                <ChatBox/>
             </div>
          }
         <div className={styles.chatbot}>
            {isChatOpen?
              <img src={crossSvg} alt=""  onClick={()=>setIsChatOpen(false)}/>
              :<img src={msgSVG} alt=""  onClick={()=>setIsChatOpen(true)}/>
            }
         </div>
        <Footer/>
    </div>
  )
}

export default Home