import { useState,FC, useContext } from 'react'
import logo from './logo.svg'
import './App.css'
import { Affix,AppShell, Stack,Navbar, Header,Button,Tabs,Card, Image,Text, Title, Anchor, Grid,ActionIcon, Badge, Group, Avatar, AspectRatio, Checkbox, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { MantineProvider, ColorScheme, Chip} from '@mantine/core';
import { Sun, MoonStars} from 'tabler-icons-react';

import {ProjectPanel,Label} from './Projects'
import {Profile,ClassList} from './About'

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

const education = [
  {
    classCode: 'EECS 281',
    className: 'Data Structures and Algorithms',
    school: 'University of Michigan'
  },
  {
    classCode: 'Math 215',
    className: 'Linear Algebra',
    school: 'University of Michigan'

  },
  {
    classCode: 'EECS 203',
    className: 'Discrete Math',
    school: 'University of Michigan'
  }
]


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
                <Profile/>
                <Title order={3}>Education:</Title>
                <ClassList classes={education}/>
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
