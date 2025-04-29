import React from 'react'
import styles from '../styles/Footer.module.css'
import Logo from './Logo';
import emailSvg from '../assets/emailSvg.svg';
import linkedinSvg from '../assets/linkedinSvg.svg';
import twitterSvg from '../assets/twitterSvg.svg';
import YtSvg from '../assets/YtSvg.svg';
import discordSvg from '../assets/discordSvg.svg';
import figmaSvg from '../assets/figmaSvg.svg';
import instaSvg from '../assets/instaSvg.svg';

const Footer = () => {
    const socialIcons = [
        { name: 'Email', icon: emailSvg },
        { name: 'LinkedIn', icon: linkedinSvg },
        { name: 'Twitter', icon: twitterSvg },
        { name: 'YouTube', icon: YtSvg },
        { name: 'Discord', icon: discordSvg },
        { name: 'Figma', icon: figmaSvg },
        { name: 'Instagram', icon: instaSvg },
      ];
      const footerLinks = [
        {
          heading: "Product",
          links: [
            "Universal checkout",
            "Payment workflows",
            "Observability",
            "UpliftAI",
            "Apps & integrations"
          ]
        },
        {
          heading: "Why Primer",
          links: [
            "Expand to new markets",
            "Boost payment success",
            "Improve conversion rates",
            "Reduce payments fraud",
            "Recover revenue"
          ]
        },
        {
          heading: "Developers",
          links: [
            "Primer Docs",
            "API Reference",
            "Payment methods guide",
            "Service status",
            "Community"
          ]
        },
        {
          heading: "Resources",
          links: [
            "Blog",
            "Success stories",
            "News room",
            "Terms",
            "Privacy"
          ]
        },
        {
          heading: "Company",
          links: [
            "Careers"
          ]
        }
      ];
      
  return (
   <div className={styles.footerContainer}>
        <div className={styles.logoSection}>
          <Logo/>
        </div>
        <div className={styles.linkSection}>
           {footerLinks.map((item)=>(
            <div key={item.heading} className={styles.footerLinkSection}>
                <h4>{item.heading}</h4>
                <ul>
                    {item.links.map((link)=>(
                        <li>
                            <a href="#">{link}</a>
                        </li>
                    ))}
                </ul>
            </div>
           ))}
           <div className={styles.footerLinkSection}>
                <div className={styles.SocialMediaIcons}>
                    {socialIcons.map((icon)=>(
                       <a href="#">
                        <img src={icon.icon} alt={icon.name} />
                       </a>
                    ))}
                </div>
           </div>

        </div>
   </div>
  )
}

export default Footer