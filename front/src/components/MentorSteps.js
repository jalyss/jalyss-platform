import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import TrainingHeading from './TrainingHeading';
import { useNavigate } from "react-router-dom";
import curriculum from "../img/curriculum.png"
import record from "../img/record.png"
import launch from "../img/Launch.png"
import { awrapperMentor } from '../dummydata'

const MentorSteps = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const navigate = useNavigate();

  return (
    <>
    
      <TrainingHeading title="HOW TO BEGIN" />
    <section style={{ display: 'flex', justifyContent: 'center' }}>
      <div >
        <Tabs selectedIndex={activeTab} onSelect={handleTabClick}>
          <TabList style={{ display: 'flex', justifyContent: 'space-between' , fontWeight:'bold'}}>
            <Tab style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center',fontSize:"25px"}}>
                
                <div>Pick your curriculum</div>
              </div>
            </Tab>
            <Tab style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center',fontSize:"25px" }}>
                
                <div>Record your video</div>
              </div>
            </Tab>
            <Tab style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center',fontSize:"25px" }}>
                <div>Launch your course</div>
              </div>
            </Tab>
          </TabList>
          <TabPanel>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginRight: '16px' }}>
                <img   className = "imagesTab" src={curriculum} alt="Plan" />
              </div>
              <div className='paraTab'>Gather your first ratings and reviews by promoting your course through social media and your professional networks.
              <br/>

Your course will be discoverable in our marketplace where you earn revenue from each paid enrollment.</div>
            </div>
          </TabPanel>
          <TabPanel>
            <div style={{ display: 'flex', flexDirection:"row", alignItems: 'center' }}>
              <div style={{ marginRight: '16px' }}>
                <img  className = "imagesTab" src={record} alt="Record" />
              </div>
              <div  className='paraTab'>Use basic tools like a smartphone or a DSLR camera. Add a good microphone and you’re ready to start.<br/>

If you don’t like being on camera, just capture your screen. Either way, we recommend two hours or more of video for a paid course. </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginRight: '16px' }}>
                <img   className = "imagesTab" src={launch} alt="Launch" />
              </div>
              <div  className='paraTab' >You start with your passion and knowledge.<br/> Then choose a promising topic with the help of our Marketplace Insights tool.

The way that you teach — what you bring to it — is up to you.</div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </section>
    <section className='Mentorawrapper'>
        <div className='containermentor griddy'>
          {awrapperMentor.map((e) => {
            return (
              <div className='boxy-flex'>
                <div className='text'>
                  <h1>{e.data}</h1>
                  <h3>{e.title}</h3>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    <section className="sectionctaa" aria-label="workshop">
  

     
        <div className='tandbb'>

        <p className="section-subtitle">
        A <strong>teacher</strong> is akin to an <strong>apostle</strong> </p>

        <h2 className="h2 section-title">Become an instructor today.</h2>
</div>
        <p className="section-texty">
        Join one of the <strong>Tunisia’s largest online learning</strong> marketplaces.
        </p>

  
    <a href='#' className='teacher'>
    <span onClick={() => navigate(`/mentor`)} > Get started NOW</span> </a>
  </section>
  
    </>
  );
};

export default MentorSteps;