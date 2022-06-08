import styled from 'styled-components'

import { useState } from 'react';

import { UilEdit, UilTrashAlt, UilCheckCircle, UilAngleDoubleRight  } from '@iconscout/react-unicons'

const TaskContainer = styled.div`
  height: 140px;

  background: #C340A1;

  border-radius: 8px;
  border: none;
  
  padding: 25px 20px;

  display: flex;
  flex-direction: column;
  gap: 15px;
`
const TaskTitle = styled.h1`
  font-size: 20px;
  color: white;
  font-weight: normal;
`
const TaskDescription = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.75);

  font-weight: 400;
`
const UtilitysButtons = styled.div`
  display: flex;
  gap: 9px;

  position: absolute;
  margin-left: 230px;
  margin-top: -15px;

  &:first-child:hover{
    transform: translateY(5px);
  }
`
const UtilityButtonStyle = {
    color: "white",
    cursor: "pointer",
    width: 22,
    height: 22,
}
const RigthStageStyle = {
    color: "white",
    cursor: "pointer",
    width: 30,
    height: 30,
    position: "absolute",
    marginLeft: 257,
    marginTop: 81,
}
const ButtonReset = {
  background: "none",
  border: "none",
}

const TitleInput = styled.input`
  color: white;
  font-size: 20px;

  background: none;

  border: none;

  &:focus{
    outline: 0;
  }

  &::placeholder{
    color: white;
  }
`

const DescriptionInput = styled.input`
  color:rgba(255, 255, 255, 0.75);
  font-size: 16px;

  background: none;
  font-weight: 400;

  border: none;

  &:focus{
    outline: 0;
  }

  &::placeholder{
    color: white;
  }
`

export function Task(props) {

  const [CurrentIcon, setCurrentIcon] = useState(true);
  const [EditedTask, setEditedTask] = useState(true);

  const [TitleEditInput, setTitlEditInput] = useState(props.tasktitle);
  const [DescriptionEditInput, setDescriptionInput] = useState(props.taskDescription);


  function DeleteTask(tasks, taskid) {
    tasks.splice(taskid, 1)
    props.settasklist([...tasks])
  }

  function EditTask(tasks, taskid) {
    if(EditedTask){
      setEditedTask(false)
      setCurrentIcon(false)
    }else{
      setEditedTask(true)
      setCurrentIcon(true)


      tasks[taskid].title = TitleEditInput
      tasks[taskid].description = DescriptionEditInput

      props.settasklist([...tasks])
    }
  }

  function ChangeTaskStage(taskid) {
    const NewTaskStage = {
      taskid: taskid
    }

    props.setTaskStage(prevState => [prevState, NewTaskStage])
    console.log(props.TaskStage)
  }

  
  return( 
    <TaskContainer style={{background: props.taskcolor}} >
      {EditedTask ? 
      <TaskTitle>
        {props.tasktitle}
        </TaskTitle> : 
      <TitleInput 
      autoFocus
      type="text"
      placeholder={props.tasktitle}
      onChange={(e) => setTitlEditInput(e.target.value)}
       />}
      {EditedTask ? <TaskDescription> 
        {props.taskdescription}
      </TaskDescription> :
       <DescriptionInput
       placeholder={props.taskDescription}
       onChange={(e) => setDescriptionInput(e.target.value)}     
       />}
      <UtilitysButtons>
       {CurrentIcon ? <UilEdit
        onClick={EditTask}
        style={UtilityButtonStyle}/> :
         <UilCheckCircle
         onClick={() => EditTask(props.taskList, props.id)}
         style={UtilityButtonStyle}
         />}
        <button 
        style={ButtonReset}
        >
        <UilTrashAlt 
        onClick={() => DeleteTask(props.taskList, props.id)}
        style={UtilityButtonStyle}
        />
        </button>
      </UtilitysButtons>
      <UilAngleDoubleRight
        style={RigthStageStyle}
        onClick={() => ChangeTaskStage(props.id)}
        />
    </TaskContainer>
  )
}