import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { AppShell, Navbar, Header,Button, ThemeIcon,Tabs } from '@mantine/core';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';

var globalTheme = {
  colorScheme: 'dark',
  colors: {
    // Add your color
    'deep-blue': ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
    // or replace default theme color
    blue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
  },

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
  }

function Nav(){
  return (
  <Navbar width={{ base: 300 }} height={1000} p="xs">{/* Navbar content */}</Navbar>
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
              <Tabs.Tab label="Projects">Second tab content</Tabs.Tab>
              <Tabs.Tab label="Experimental">Third tab content</Tabs.Tab>              
            </Tabs>
        </AppShell>
      </MantineProvider>
  )
}

export default App
