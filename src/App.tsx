import { useState,FC, useContext } from 'react'
import logo from './logo.svg'
import './App.css'
import { Affix,AppShell, Stack,Navbar, Header,Button,Tabs,Card, Image,Text, Title, Anchor, Grid,ActionIcon, Badge, Group, Avatar, AspectRatio, Checkbox, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { MantineProvider, ColorScheme, Chip} from '@mantine/core';
import { Sun, MoonStars} from 'tabler-icons-react';
import {AiFillLinkedin,AiFillGithub,AiFillWindows,AiFillApple,AiFillHtml5} from 'icons-react/ai';
import {FaUbuntu,FaFedora} from 'icons-react/fa';
import {SiCplusplus,SiPython,SiJava,SiJavascript,SiCss3,SiLabview,SiBootstrap,SiFirebase,SiJquery,SiReact} from 'react-icons/si';
import {ProjectPanel,Label} from './Projects'


// Manual inputs


// original order is by recency
// in general, descriptions are too long, abstract out to pages, more images = better
// goal is to create a forever listicle, with some amount of filtering
const projsInput = [
  {
    title:'Personal Site',
    imageURL:'images/PicOfSite.png',
    projectURL: '',
    body:'You\'re looking at it. Built in React+TS+Mantine. Built in modular fashion, responsive and scalable. Goals to rewrite in a few frameworks, a playground for my web development curiosities.',
    labels:[Label.Web]
  },
  {
    title:'Fastr Food',
    imageURL:'images/Fastr_Food_Cropped.png',
    projectURL: 'https://devpost.com/software/fastr-food',
    body:'MHACKS 14 Submission. Webapp to crowdsource dining hall wait times, and factor in commute distances to recommend locations. Built with Firebase and Bootrap.',
    labels:[Label.Web]
  },
  {
    title:'Simulating Robot-Based Pollination',
    imageURL: 'images/PollinationSimPics.png',
    projectURL: 'https://github.com/wvu-robotics/workspace-pollination-sim',
    body:'WORDS is a nice time to explore testing with larger amounts of text, jsut to see how different things respond',
    labels:[Label.Robotics]
  },
  {
    title:'FRC Autonomous Development',
    imageURL: 'https://images.unsplash.com/photo-1516569422572-d9e0514b9598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2xhY2llcnxlbnwwfHwwfHw%3D&w=1000&q=80',
    projectURL: 'dummy.com',
    body:'This is a nice time to explore testing with larger amounts of text, jsut to see how different things respond',
    labels:[Label.Robotics]
  },
  {
    title:'Retaining Ampitheater',
    imageURL: 'https://images.unsplash.com/photo-1516569422572-d9e0514b9598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2xhY2llcnxlbnwwfHwwfHw%3D&w=1000&q=80',
    projectURL: 'https://docs.google.com/presentation/d/1aP3j4olLRgYe2YNnLTBH73c660270TyJfuQBbBDXpQ4/edit?usp=sharing',
    body:'This is a nice time to explore testing with larger amounts of text, jsut to see how different things respond',
    labels:[Label.Misc]
  },

  // I feel a bit icky padding things with school projects, but I'll just not make them display initially, and only include the most interesting
  {
    title:'Seam Carving Algorithm',
    imageURL: 'https://images.unsplash.com/photo-1516569422572-d9e0514b9598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2xhY2llcnxlbnwwfHwwfHw%3D&w=1000&q=80',
    projectURL: '',
    body:'EECS 280 Project: Implemented seam carving algorithm to resize images intelligently, eliminating less important information first.',
    labels:[Label.School]    
  },
  {
    title:'Piazza Post Classification',
    imageURL: 'https://images.unsplash.com/photo-1516569422572-d9e0514b9598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2xhY2llcnxlbnwwfHwwfHw%3D&w=1000&q=80',
    projectURL: '',
    body:'EECS 280 Project: Utilized a simple bayesian classifier to do natural language processing and determine a post\'s topic based on the body.',
    labels:[Label.School]    
  },
  {
    title:'SQL recreation',
    imageURL: 'https://images.unsplash.com/photo-1516569422572-d9e0514b9598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2xhY2llcnxlbnwwfHwwfHw%3D&w=1000&q=80',
    projectURL: '',
    body:'EECS 281 Project: Implement a portion of the Standard Querying Language(SQL) to create, query, and modify a database.',
    labels:[Label.School]    
  },
  {
    title:'FRC Scouting Data Acquistion and Analysis System',
    imageURL: 'https://images.unsplash.com/photo-1516569422572-d9e0514b9598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2xhY2llcnxlbnwwfHwwfHw%3D&w=1000&q=80',
    projectURL: 'dummy.com',
    body:' Used to gather data about other teams at competition, and develop strategic insights. Written with JS, JQuery, Bootstrap and Firebase, integrated with Google Sheets.',
    labels:[Label.Web]
  }
]

function Profile(props){
  return(
  <Stack spacing="xs">
    {/* image might just be better */}
    <Avatar src='images/SeniorFace.jpg' size='xl' radius='xl'></Avatar>
    <Title order={2}>Ibrahim Musaddequr Rahman</Title>
    {/* add some more text, edu, skills, maybe unis/companies, as logo as possible */}
    <Text>Some words about my bio, etc.</Text>

    {/* Github and linked in */}
    <Group>
      {/* make an anchor no style  component*/}
      {/* ADD A NORMAL RESUME LINK */}
    <a href='https://www.linkedin.com/in/iamr2003/' style={{ textDecoration: 'none',color:'inherit' }}><AiFillLinkedin size={70}/></a>
    <a href='https://github.com/iamr2003' style={{ textDecoration: 'none',color:'inherit' }}><AiFillGithub size={70}/></a>
    <Text>RESUME</Text>
    </Group>

    {/* OS's, skills, frameworks(would like links on icons eventually) */}
    {/* I'm gonna need colors eh, probably a whole icon component */}
    <Group>
      {/* add garuda */}
      <Text>OSs:</Text><AiFillWindows size={30}/><AiFillApple size={30}/><FaUbuntu size={30}/><FaFedora size={30}/>
    </Group>
    
    {/* need to find a lot of these on their own */}
    {/* consider eventually a filtering of the projects by these icons */}
    <Group>
      <Text>Languages:</Text>
      <SiCplusplus size={30}/>
      <SiPython size={30}/>
      <SiJava size={30}/>
      <SiJavascript size={30}/>
      <AiFillHtml5 size={38}/>
      <SiCss3 size={30}/>
      {/* Do I even include? */}
      <SiLabview size={30}/> 
    </Group>
    
    <Group>
      {/* add ROS,Gazebo */}
      <Text>Frameworks & Tools:</Text> <SiBootstrap size={30}/><SiFirebase size={30}/><SiJquery size={30}/><SiReact size={30}/>
    </Group>

    {/* Add some EDUCATION info */}
    
    {/* Add some WORK info */}

  </Stack>
  )
}

// only include relevant classes
interface ClassInfo{
  classCode:string
  className:string
  description:string
  logo?:string //just adding for future plans
}

function Class(props:ClassInfo){
  return(
    <Stack spacing="xs">
      <Text>{props.classCode}</Text>
      <Text>{props.className}</Text>
      <Text>{props.description}</Text>
    </Stack>
  )
}

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme == 'dark' ? 'light' : 'dark'));
  const dark = colorScheme === 'dark';
  
  const [activeTab, setActiveTab] = useState(1);


  return (
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: colorScheme,
          colors:{
            brand : dark ? ['#413F54','#355691'] : ['#2B2118','#6F1A07']
          },
          primaryColor: 'brand',
          shadows: {
            // other shadows (xs, sm, lg) will be merged from default theme
            md: '1px 1px 3px rgba(0,0,0,.25)',
            xl: '5px 5px 3px rgba(0,0,0,.25)',
          },
        
          headings: {
            fontFamily: 'Roboto, sans-serif',
            sizes: {
              h1: { fontSize: 30 },
            },
          },        
          }}
      >
        <AppShell
          padding="md"
          // navbar={<Nav/>}
          header={ 
          // need to freeze the header on scrolls, issue with them going on top of each other
          // fixed  position={{ top: 0, left: 0 }}
          <Header height={60} p="xs" >
            {/* make it my favorite icons later */}
            <ActionIcon
              variant="outline"
              color={dark ? 'yellow' : 'blue'}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <Sun size={18} /> : <MoonStars size={18} />}
            </ActionIcon>
          </Header>
        }
          styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
          })}
        >
            {/* I'm not sure if I like this layout, can switch it a bit later, maybe to the vertical scrolling style */}
            <Tabs active={activeTab} onTabChange={setActiveTab} color={dark?"orange":"indigo"}>
              <Tabs.Tab label="About">
                {/* This looks kinda disgusting, should use avatar for face */}
                <Profile></Profile>
              </Tabs.Tab>
              <Tabs.Tab label="Projects">
                {/* <ProjectList projs={projsInput}></ProjectList> */}
                <ProjectPanel projsInput={projsInput}></ProjectPanel>
              </Tabs.Tab>
              <Tabs.Tab label="Experimental">Third tab content</Tabs.Tab>              
            </Tabs>
        </AppShell>
      </MantineProvider>
  )
}

export default App
