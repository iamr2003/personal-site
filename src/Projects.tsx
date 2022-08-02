import { useState } from "react";
import { Group,Grid,Card,Text,AspectRatio,Image,Title,Chip,useMantineTheme,Badge } from "@mantine/core";

//use badges
export enum Label{
    Web = 'indigo', //should maybe break this up
    Robotics = 'yellow',
    Misc = 'violet',
    School = 'green',
    Research = 'red',
    // HighSchool = 'lime' I don't like this label, who care
  }
  

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
  export function Project(props:ProjInfo){
    return (
      <Grid.Col span={6} style={{maxWidth:"50ch"}}>
        <a href={props.projectURL} style={{ textDecoration: 'none',color:'inherit' }}>
          {/* style = {{minHeight:"400px"}} */}
        {/* could do a hard box si */}

        {/* what I want is to do minHeight by row */}
        {/* style={{minHeight:"10em"}} */}
        <Card  radius="lg" shadow="sm" > 
          <Card.Section>
            {/* Need to cap this better, maybe choose different images, or learn to tile better */}
            <AspectRatio ratio={1.35/1} sx={{ maxWidth: "50ch",minWidth:"30ch" }} mx="auto">
            <Image src={props.imageURL}></Image>
            </AspectRatio>
          </Card.Section>
            {/* figure out link */}
  
            <Title order={3}>{props.title}</Title>
  
          <Text>{props.body}</Text>
          
          <ListOfLabels list={props.labels}></ListOfLabels>
        </Card>
        </a>
        {/* </div> */}
      </Grid.Col>
    )
  }

  
  // needs more styling on subcomponents, but it works
  // I want to take this away from grid, and make something less uniform and more dynamic(splitting into colums and letting them waterfall a bit)
  function ProjectList(props:{projs:Array<ProjInfo>}){
    const projList = props.projs.map(Project);
  
    return (
      <Grid gutter={"xl"} justify="center" align="stretch">
        {projList}
      </Grid>
    )
  }
  
  //being annoying with array in stuff, so switching back to normal js---there is an easy normal way
  export function ProjectPanel(props){
    const mantineTheme = useMantineTheme();
    const dark = mantineTheme.colorScheme === 'dark';
  
    const [robotics, setRobotics] = useState(true);
    const [web, setWeb] = useState(true);
    const [misc, setMisc] = useState(true);
    const [school, setSchool] = useState(false);
  // would like to be able to generalize to labels
    const filteredProjs = props.projsInput.filter(proj => {
        return proj.labels.some(label => {
          if (label === Label.Robotics && robotics){
            return true;
          }
          if (label === Label.Web && web){
            return true;
          }
          if (label === Label.Misc && misc){
            return true;
          }
          if (label === Label.School && school){
            return true;
          }
          else{
            return false;
          }
        });
    });
  
    return (
      <>
      {/* need to style this card more */}
      <Group position='center' p="xs" >
      <Chip color ={dark?"yellow":"indigo"} checked={robotics} onChange={() =>setRobotics(!robotics)}>Robotics</Chip>
      <Chip color ={dark?"yellow":"indigo"} checked={web} onChange={() =>setWeb(!web)}>Web</Chip>
      <Chip color ={dark?"yellow":"indigo"} checked={misc} onChange={() =>setMisc(!misc)}>Misc</Chip>
      <Chip color ={dark?"yellow":"indigo"} checked={school} onChange={() =>setSchool(!school)}> School</Chip>
      </Group>
      {/* Idea: split into x columns(media query?) each can expand, there are more issues though*/}
      <ProjectList projs={filteredProjs}></ProjectList>
      </>
    )
  }

