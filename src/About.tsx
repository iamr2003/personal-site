import { Stack,Avatar,Title,Group,Text,Card, Grid } from "@mantine/core"
import {AiFillLinkedin,AiFillGithub,AiFillWindows,AiFillApple,AiFillHtml5} from 'icons-react/ai';
import {FaUbuntu,FaFedora} from 'icons-react/fa';
import {SiCplusplus,SiPython,SiJava,SiJavascript,SiCss3,SiLabview,SiBootstrap,SiFirebase,SiJquery,SiReact} from 'react-icons/si';


export function Profile(props){
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
export interface ClassInfo{
classCode:string
className:string
school:string
// logo maybe?
}

// now needs styling
function Class(props:ClassInfo){
    return(
    <Grid.Col>
        <Card>
            <Stack spacing="xs">
            <Text>{props.classCode}</Text>
            <Text>{props.className}</Text>
            <Text>{props.school}</Text>
            </Stack>
        </Card>
    </Grid.Col>
    )
}

export function ClassList(props:{classes:Array<ClassInfo>}){
    return(
    <Grid>
        {props.classes.map((proj)=>{
            return(
                <Class classCode={proj.classCode} className={proj.className} school={proj.school}/>
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