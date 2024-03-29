import { useState, useEffect, useRef } from 'react'
import logo from './logo.svg'
import './App.css'
import { Affix, AppShell, Stack, Navbar, Header, Button, Tabs, Card, Image, Text, Title, Anchor, Grid, ActionIcon, Badge, Group, Avatar, AspectRatio, Checkbox, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { MantineProvider, ColorScheme, Chip } from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';

import { ProjectPanel, Label } from './Projects';
import { Profile, ClassList, JobList } from './About';
import { BorderRadiusAnimation } from './Experiments';

// Manual inputs


// original order is by recency
// in general, descriptions are too long, abstract out to pages, more images = better
// goal is to create a forever listicle, with some amount of filtering
// quite a bit of formatting work needed
const projsInput = [
  {
    title: 'Swarm Imitation Learning', //might clean up name for real learning people-- technically behavioral cloning
    imageURL: 'images/swarmBoundaryCircling.gif', //get a nice gif here-- (alternatives of fish or the robots or just Boids)
    projectURL: '', //let's move things to a dedicated repo too
    body: // can workshop this a bit, Combines a variety of simpler methods(genetic algorithm, linear regression, nonlinear optimization) to model a variety of aspects. was included, might just need a page
      "Machine learning pipeline to imitate a swarm's behavior. Written in Python, uses Numpy, Scipy, plotly, pygad, and sklearn. Research funded by National Science Foundation.",
    labels: [Label.Robotics, Label.Research]
  },
  {
    title: 'Personal Site',
    imageURL: 'images/PicOfSite.png',
    projectURL: '',
    body: 'You\'re looking at it. Built in React+TS+Mantine. Built in modular fashion, responsive and scalable. Goals to rewrite in a few frameworks, a playground for my web development curiosities.',
    labels: [Label.Web]
  },
  {
    title: 'Fastr Food',
    imageURL: 'images/Fastr_Food_Cropped.png',
    projectURL: 'https://devpost.com/software/fastr-food',
    body: 'MHACKS 14 Submission. Webapp to crowdsource dining hall wait times, and factor in commute distances to recommend locations. Built with Firebase and Bootstrap.',
    labels: [Label.Web]
  },
  {
    title: 'Simulating Robot-Based Pollination',
    imageURL: 'images/PollinationReCut.png', //just pick bottom image
    projectURL: 'https://github.com/wvu-robotics/workspace-pollination-sim',
    body: 'High-fideliy simulation to test pollination robot during the COVID-19 pandemic. Built with ROS+Gazebo. Research out of WVU Interactive Robotics Lab.',
    labels: [Label.Robotics, Label.Research]
  },
  {
    title: 'FRC Autonomous Development',
    imageURL: 'images/marsShootingWhileMoving.gif',
    projectURL: '',
    body: 'Programmed a robot to track and shoot balls in target while moving, to compete in FIRST Robotics. Written in LabView, utilized computer vision and PID control with lookup tables.',
    labels: [Label.Robotics]
  },
  {
    title: 'Retaining Ampitheater',
    imageURL: 'images/RetainingAmpitheater.jpg',
    projectURL: 'https://docs.google.com/presentation/d/1aP3j4olLRgYe2YNnLTBH73c660270TyJfuQBbBDXpQ4/edit?usp=sharing',
    body: 'Built a Retaining Wall capped with benches for Eagle Scout Project. 18\' by 10\' could seat 60 people packed, or 45 socially distanced.',
    labels: [Label.Misc]
  },

  // I feel a bit icky padding things with school projects, but I'll just not make them display initially, and only include the most interesting
  {
    title: 'Seam Carving Algorithm',
    imageURL: 'https://images.unsplash.com/photo-1516569422572-d9e0514b9598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2xhY2llcnxlbnwwfHwwfHw%3D&w=1000&q=80',
    projectURL: '',
    body: 'EECS 280 Project: Implemented seam carving algorithm to resize images intelligently, eliminating less important information first. Written in C++.',
    labels: [Label.School]
  },
  {
    title: 'Piazza Post Classification',
    imageURL: 'images/piazzaPic.png',
    projectURL: '',
    body: 'EECS 280 Project: Utilized a simple bayesian classifier to do natural language processing and determine a post\'s topic based on the body. Written in C++.',
    labels: [Label.School]
  },
  {
    title: 'SQL recreation',
    imageURL: 'images/sillyQLlogo.svg',
    projectURL: '',
    body: 'EECS 281 Project: Implement a portion of the Standard Querying Language(SQL) to create, query, and modify a database. Written in C++.',
    labels: [Label.School]
  },
  {
    title: 'FRC Scouting Data Acquistion and Analysis System',
    imageURL: 'images/marsScouting2020.png',
    projectURL: 'https://github.com/MARSProgramming/Scouting-2020',
    body: ' Used to gather data about other teams at competition, and develop strategic insights in FIRST Robotics. Written with JS, JQuery, Bootstrap and Firebase, integrated with Google Sheets.',
    labels: [Label.Web]
  }
]

const education = [
  // Fall 2022 Classes, add Stats maybe too- put it in when semester starts
  {
    classCode: 'Math 217',
    className: 'Linear Algebra',
    school: 'University of Michigan'
  },  
  {
    classCode: 'EECS 376',
    className: 'Foundations in Computer Science',
    school: 'University of Michigan'
  },  
  {
    classCode: 'EECS 370',
    className: 'Intro to Computer Organization',
    school: 'University of Michigan'
  },  
  {
    classCode: 'EECS 281',
    className: 'Data Structures & Algorithms',
    school: 'University of Michigan'
  },
  {
    classCode: 'Math 215',
    className: 'Multivariable Calculus',
    school: 'University of Michigan'

  },
  {
    classCode: 'EECS 203',
    className: 'Discrete Math',
    school: 'University of Michigan'
  }
]

// let's make sure to link Gu/pereira as advisor
// I think I will display without descriptions for right now, since not great formatting 
const work_xp = [
  {
    organization: 'University of Michigan',
    position: 'Resident Advisor, SubFree Theme',
    startDate: 'August 2022',
    endDate: 'Present',
    description: ""
  },
  {
    organization: 'National Science Foundation',
    position: 'REU Student Researcher',
    startDate: 'May 2022',
    endDate: 'July 2022',
    description: "Imitated Swarm behavior using machine learning methods."
  },
  { //need to differentiate both times
    organization: 'West Virginia University, Interactive Robotics Lab',
    position: 'Undergraduate Researcher',
    startDate: 'June 2020',
    endDate: 'October 2021',
    description: 'Wrote simulations to assist research on a variety of projects, especially robot-based pollination. Developed control code for Fast Traverse Robot'
  },
]
// next is work xp
// function scrolledToBottom() {
//   if()
// }

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme == 'dark' ? 'light' : 'dark'));
  const dark = colorScheme === 'dark';

  const [activeTab, setActiveTab] = useState<string | null>('About');
  // console.log(elementRef.current?.clientHeight);
  const listInnerRef = useRef(null);

  // I can probably adjust this better for top and bottom
  // const [currentScroll, setCurrentScroll] = useState(-20);
  // const [scrollDirection, setScrollDirection] = useState('down');

  // double event call issue -- do timing latch eventually
  // continuous content is probably the actual way, I'm being stubborn tho
  // const handleScroll = () => {
  //   // console.log("scrolling");
  //   const position = window.pageYOffset;
  //   if (currentScroll == position) {
  //     console.log('same',scrollDirection);
  //     if(scrollDirection == 'down'){
  //       setActiveTab((activeTab + 1)%3);
  //     }
  //     else if(scrollDirection == 'up'){
  //       setActiveTab((activeTab - 1)%3);
  //     }

  //     // setScrollDirection('up'); //this case is going to be weird
  //   }
  //   else if (currentScroll < position) {
  //     setScrollDirection('down');

  //   }
  //   else {
  //     setScrollDirection('up');
  //   }
  //   setCurrentScroll(position);
  // };

  // useEffect(() => {
  //   window.addEventListener('wheel', handleScroll,{ passive: true });
  //   return () => {
  //     window.removeEventListener('wheel', handleScroll);
  //   }
  // });
  // console.log("scroll position",scrollPosition);
  // console.log("Inner height:",window.innerHeight);
  // if(scrollPosition >= elementRef.current?.clientHeight - window.innerHeight) {
  //   // console.log('scrolled to bottom');
  //   // if (activeTab <2){
  //   //   // setActiveTab(activeTab + 1);
  //   //   setScrollPosition(0);
  //   // }
  // }

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: colorScheme,
        colors: {
          brand: dark ? ['#413F54', '#355691'] : ['#2B2118', '#6F1A07']
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
          <Header height={60} p="xs" fixed>
            <Group>
              {/* these need to shrink with size I think */}
              {/* hacky solution to deal with putting tabs in the top */}
              {/* I like the pills, do specific styling via styles API later*/}
              <Tabs value={activeTab} onTabChange={setActiveTab} color={dark ? "gray" : "indigo"} variant="pills">
                <Tabs.List>
                  <Tabs.Tab value="About">About</Tabs.Tab>
                  <Tabs.Tab value="Projects">Projects</Tabs.Tab>
                  <Tabs.Tab value="Experimental">Experimental</Tabs.Tab>
                </Tabs.List>
              </Tabs>
              {/* optimally want this on the far right, I'll figure out later */}
              <ActionIcon
                variant="outline"
                color={dark ? 'yellow' : 'blue'}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
                size={24}
              >
                {dark ? <Sun size={18} /> : <MoonStars size={18} />}
              </ActionIcon>
            </Group>
          </Header>
        }
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
      >
        {/* <div ref={listInnerRef} onScroll={onScroll} key="specific"> */}
        {/* I'm not sure if I like this layout, can switch it a bit later, maybe to the vertical scrolling style */}
        <Tabs value={activeTab} onTabChange={setActiveTab} color={dark ? "orange" : "indigo"}>
        {/* <Tabs.List> */}
          <Tabs.Panel value="About">
            {/* This looks kinda disgusting, should use avatar for face */}
            <Profile />
            <Title order={2} mb="xs">Education</Title>
            <ClassList classes={education} />
            <Title order={2} mt="xs" mb="xs">Work Experience</Title>
            <JobList jobs={work_xp} />
          </Tabs.Panel>
          <Tabs.Panel value="Projects" >
            {/* <ProjectList projs={projsInput}></ProjectList> */}
            <ProjectPanel projsInput={projsInput}></ProjectPanel>
          </Tabs.Panel>
          {/* first experiment, use border radius to make a weird animation */}
          <Tabs.Panel value="Experimental">
            <Title order={4}>Deep Experiments in Progress!</Title>
            <BorderRadiusAnimation />
          </Tabs.Panel>
          {/* </Tabs.List> */}
        </Tabs>
        {/* </div> */}
      </AppShell>
    </MantineProvider>
  )
}

export default App
