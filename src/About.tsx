import { Stack,Avatar,Title,Group,Text,Card, Grid } from "@mantine/core"
import {AiFillLinkedin,AiFillGithub,AiFillWindows,AiFillApple,AiFillHtml5} from 'icons-react/ai';
import {FaUbuntu,FaFedora} from 'icons-react/fa';
import {SiCplusplus,SiPython,SiJava,SiJavascript,SiCss3,SiLabview,SiBootstrap,SiFirebase,SiJquery,SiReact} from 'react-icons/si';

// this whole page needs way more color
export function Profile(props:{}){
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
        
      {/* Add some WORK info */}
  
    </Stack>
    )
  }
  
// only include relevant classes
export interface ClassInfo{
classCode:string
className:string
school:string
// logo maybe?
}

// now needs styling
function Class(props:ClassInfo){
    return(
    <Grid.Col span={4}>
        <Card radius="lg" shadow="sm" style={{maxWidth:"40ch",minHeight:"14ch"}}>
            <Stack spacing="xs">
            <Title order={4}>{props.classCode}: {props.className}</Title>
        <Text>{props.school}</Text> {/* I would like this to be at bottom more */}
            </Stack>
        </Card>
    </Grid.Col>
    )
}
// get the thing to wrap
export function ClassList(props:{classes:Array<ClassInfo>}){
    return(
    <Grid justify="center" grow style={{maxWidth:"60em"}}>
        {props.classes.map((classIn)=>{
            return(
                <Class classCode={classIn.classCode} className={classIn.className} school={classIn.school}/>
            )
        }
        )}
    </Grid>
    )
}

export interface JobInfo{
    organization:string
    position:string
    startDate?:string
    endDate?:string
    description:string
}

// also needs styling
function Job(props:JobInfo){
    return(
    <Grid.Col span={6}>
        <Card radius={"lg"} style={{maxWidth:"60ch"}}>
            <Stack spacing="xs">
            <Text>{props.organization}</Text>
            <Text>{props.position}</Text>
            <Text>{props.startDate} - {props.endDate}</Text>
            <Text>{props.description}</Text>
            </Stack>
        </Card>
    </Grid.Col>
    )
}

// when code is getting this repeatable, a bit eh
export function JobList(props:{jobs:Array<JobInfo>}){
    return(
        // expanding beyond 60 em gets strange,need to fix
    <Grid grow justify="center" style={{maxWidth:"60em"}}>
        {props.jobs.map((jobIn)=>{
            return(
                <Job organization={jobIn.organization} position={jobIn.position} startDate={jobIn.startDate} endDate={jobIn.endDate} description={jobIn.description}/>
            )
        }
        )}
    </Grid>
    )
}