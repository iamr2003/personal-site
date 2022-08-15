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
      {/* <Text>Some words about my bio, etc.</Text> EVENTUALLY PUT SOMETHING WITTY */}
  
      {/* Github and linked in */}
      <Group>
        {/* make an anchor no style  component*/}
        {/* maybe a email icon*/}
        {/* need to figure out how to do white backgrounds on icons*/}
      <a href='https://www.linkedin.com/in/iamr2003/' style={{ textDecoration: 'none',color:'inherit' }}><AiFillLinkedin size={70} color="#0A66C2"/></a>
      <a href='https://github.com/iamr2003' style={{ textDecoration: 'none',color:'inherit' }}><AiFillGithub size={70}/></a>
      <Text style={{fontSize:'3rem'}} weight={600} component="a" href="https://docs.google.com/document/d/1u5HjXHUiJ0p5Jyi-8QZgck5e4Q8vj06T/edit?usp=sharing&ouid=106784774117684805101&rtpof=true&sd=true">CV</Text>
      </Group>
  
      {/* OS's, skills, frameworks(would like links on icons eventually) */}
      {/* I'm gonna need colors eh, probably a whole icon component */}
        {/* I could automate this, but it's just a single list so I'm not that worried rn */}
        {/* I'll create a class with links eventually too */}

      <Group>
        {/* add garuda */}
        <Text>OSs:</Text>
        <AiFillWindows size={30} color="#0078D6"/>
        <AiFillApple size={30}/>
        <FaUbuntu size={30} color="#E95420" />
        <FaFedora size={30} color="#51A2DA"/>
      </Group>
      
      {/* need to find a lot of these on their own */}
      {/* consider eventually a filtering of the projects by these icons */}
      <Group>
        <Text>Languages:</Text>
        <SiCplusplus size={30} color="#00599C" />
        <SiPython size={30} color="#3776AB"/>
        <SiJava size={30}/>
        <SiJavascript size={30} color="#F7DF1E"/>
        <AiFillHtml5 size={38} color="#E34F26"/>
        <SiCss3 size={30} color="#1572B6"/>
        {/* Do I even include? */}
        <SiLabview size={30} color="#FFDB00"/> 
      </Group>
      
      <Group>
        {/* add ROS,Gazebo */}
        <Text>Frameworks & Tools:</Text> 
        <SiBootstrap size={30} color="#7952B3"/>
        <SiFirebase size={30} color="#FFCA28"/>
        <SiJquery size={30} color="#0769AD"/>
        <SiReact size={30} color="#61DAFB"/>
      </Group>
        
  
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
    <Grid justify="center" grow style={{maxWidth:"60em"}} >
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
    <Grid.Col span={5}>
        <Card radius={"lg"} >
            <Stack spacing="xs">
            <Title order={4}>{props.position}</Title>
            <Text>{props.organization}</Text>
            <Text>{props.startDate} - {props.endDate}</Text>
            {/* <Text>{props.description}</Text> */}
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