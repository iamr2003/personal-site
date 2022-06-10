import { useState,FC } from 'react'
import logo from './logo.svg'
import './App.css'
import { AppShell, Stack,Navbar, Header,Button,Tabs,Card, Image,Text, Title, Anchor, Grid,ActionIcon, Badge, Group, Avatar } from '@mantine/core';
import { MantineProvider, ColorScheme } from '@mantine/core';
import { Sun, MoonStars} from 'tabler-icons-react';
// Manual inputs

//use badges
enum Label{
  Software = 'indigo', //should maybe break this up
  Robotics = 'yellow',
  Misc = 'violet'
}

const projsInput = [
  {
    title:'Fastr Food',
    imageURL:'images/Fastr_Food_Cropped.png',
    projectURL: 'https://devpost.com/software/fastr-food',
    body:'MHACKS 14 Submission',
    labels:[Label.Software]
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
  }
]

// interface labelStyleIn{
//   label:Label
// }

function LabelStyler(props:Label){
  let name:string = '';
  for (let key in Label){
    if (Label[key] === props){ //TS gets mad, but it's fine
      name = key;
    }
  }
  return (
    <Badge color={props}>{name}</Badge>//need to figure out this color stuff
  )
}

interface labelList{
  list:Array<Label>
}

function ListOfLabels(props:labelList){
  const comps = props.list.map(LabelStyler);
  return (
    <Group>{comps}</Group>
  )
}

//kinda want a little tags bumper
interface ProjInfo{
  title: string;
  imageURL:string;
  projectURL:string;  
  body:string;      
  labels:Array<Label>; 
  description?:string;
  startDate?:string; //eventually real date class
  endDate?:string;
}

//not sure which notation is better, this or the => one
function Project(props:ProjInfo){
  return (
    <Grid.Col span={5} style={{maxWidth:"500px"}}>
      <a href={props.projectURL} style={{ textDecoration: 'none',color:'inherit' }}>
      {/* <div style={{maxWidth:"500px"}}> */}
      <Card m ="lg" radius="lg" shadow="sm" style = {{minHeight:"400px"}}>
        <Card.Section>
          {/* make all images look sameish proportions */}
          <Image src={props.imageURL}></Image>
        </Card.Section>
          {/* figure out link */}

          <Title order={3}>{props.title}</Title>

        <ListOfLabels list={props.labels}></ListOfLabels>
        <Text>{props.body}</Text>
      </Card>
      </a>
      {/* </div> */}
    </Grid.Col>
  )
}

interface ProjListInfo{
  projs:Array<ProjInfo>
}

// needs more styling on subcomponents, but it works
function ProjectList(props:ProjListInfo){
  const projList = props.projs.map(Project);

  return (
    <Grid grow>
      {projList}
    </Grid>
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
          <Header height={60} p="xs">
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
                <Stack spacing="xs">
                  {/* image might just be better */}
                  <Avatar src='images/SeniorFace.jpg' size='xl' radius='xl'></Avatar>
                  <Title order={2}>Ibrahim Musaddequr Rahman</Title>
                  <Anchor href='https://www.linkedin.com/in/iamr2003/'>LinkedIn</Anchor>
                  <Anchor href='https://github.com/iamr2003'>Github</Anchor>
                </Stack>
              </Tabs.Tab>
              <Tabs.Tab label="Projects">
                <ProjectList projs={projsInput}></ProjectList>
              </Tabs.Tab>
              <Tabs.Tab label="Experimental">Third tab content</Tabs.Tab>              
            </Tabs>
        </AppShell>
      </MantineProvider>
  )
}

export default App
