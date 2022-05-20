import { useState,FC } from 'react'
import logo from './logo.svg'
import './App.css'
import { AppShell, Navbar, Header,Button,Tabs,Card, Image,Text, Title, Anchor, Grid } from '@mantine/core';
import { MantineProvider, ColorScheme } from '@mantine/core';


interface ProjInfo{
  title: string;
  imageURL:string;
  projectURL:string;  
  body:string;       
  description?:string;
  startDate?:string; //eventually real date class
  endDate?:string;
}

//not sure which notation is better, this or the => one
function Project(props:ProjInfo){
  return (
    <Grid.Col span={5} style={{maxWidth:"500px"}}>
      {/* <div style={{maxWidth:"500px"}}> */}
      <Card m ="lg" radius="lg" shadow="sm" style = {{minHeight:"400px"}}>
        <Card.Section>
          {/* make all images look sameish proportions */}
          <Image src={props.imageURL}></Image>
        </Card.Section>
          {/* figure out link */}
        <Title order={3}>{props.title}</Title>
        <Text>{props.body}</Text>
      </Card>
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



// Manual inputs
const projsInput = [
  {
    title:'Fastr Food',
    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwKS__3aeYLOiN8j1Le-GtHt2zI33vYTNQysiewAEC_w&s',
    projectURL: 'dummy.com',
    body:'MHACKS 14 Submission'
  },
  {
    title:'Random',
    imageURL: 'https://images.unsplash.com/photo-1516569422572-d9e0514b9598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2xhY2llcnxlbnwwfHwwfHw%3D&w=1000&q=80',
    projectURL: 'dummy.com',
    body:'This is a nice time to explore testing with larger amounts of text, jsut to see how different things respond'
  },
  {
    title:'Random',
    imageURL: 'https://images.unsplash.com/photo-1516569422572-d9e0514b9598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2xhY2llcnxlbnwwfHwwfHw%3D&w=1000&q=80',
    projectURL: 'dummy.com',
    body:'This is a nice time to explore testing with larger amounts of text, jsut to see how different things respond'
  },
  {
    title:'Random',
    imageURL: 'https://images.unsplash.com/photo-1516569422572-d9e0514b9598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2xhY2llcnxlbnwwfHwwfHw%3D&w=1000&q=80',
    projectURL: 'dummy.com',
    body:'This is a nice time to explore testing with larger amounts of text, jsut to see how different things respond'
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
          <Header height={60} p="xs">
            {/* make it my favorite icons later */}
            <Button color = {dark ? "yellow":"indigo"} onClick={()=>toggleColorScheme()}> Light/Dark </Button>
            {/* <Button styles={{outline:{color:"lightblue"}}}>Highlight</Button> */}

          </Header>
        }
          styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme == 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
          })}
        >
            {/* I'm not sure if I like this layout, can switch it a bit later, maybe to the vertical scrolling style */}
            <Tabs active={activeTab} onTabChange={setActiveTab} color={dark?"orange":"indigo"}>
              <Tabs.Tab label="About">First tab content</Tabs.Tab>
              <Tabs.Tab label="Projects">
                <ProjectList projs={projsInput}></ProjectList>
                {/* <Project body = "this is a thing" title='food' projectURL='https://mantine.dev/core/title/' imageURL='https://images.unsplash.com/photo-1516569422572-d9e0514b9598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z2xhY2llcnxlbnwwfHwwfHw%3D&w=1000&q=80'></Project> */}
              </Tabs.Tab>
              <Tabs.Tab label="Experimental">Third tab content</Tabs.Tab>              
            </Tabs>
        </AppShell>
      </MantineProvider>
  )
}

export default App
