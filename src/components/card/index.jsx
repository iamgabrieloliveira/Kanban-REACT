import styled from 'styled-components'

import React, { useEffect } from 'react'

import { useState } from 'react'

import { UilPlus } from '@iconscout/react-unicons'

import { Task } from '../task'


const RainbowColors =['#D93535', '#6A6DCD', '#00A88B', '307FE2'];

const CardContainer = styled.div`
  width: 360px;

  background-color: #262626;

  border-radius: 16px;

  padding: 24px;
`

const Title = styled.h1`
  color: #ffffff;
  font-size: 40px;
`
const AddTaskModalRoot = styled.div``

const AddTaskButtonStyle = {
  color: "white",
  background: "none",
  border: "none",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  gap: 5,
  cursor: "pointer"
}
const AddTaskOverlay = styled.div`
  position: absolute;
  z-index: 100;
  inset: 0;
  background: rgb(0 0 0 / 83%);
`
const AddTaskContent = styled.div`
  position: absolute;

  width: 420px;
  height: 200px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 1000;

  padding: 35px;

  border: none;
  border-radius: 6px;
  
  display: flex;
  flex-direction: column;

  text-align: center;
`
const AddTaskContentInputs = styled.div`
  display: flex;  
  flex-direction: column;
  gap: 17px;

  input:focus{
    outline: 0;
  }
`

const TitleInput = styled.input`
  color: white;
  font-size: 26px;

  background: none;

  border: none;

  &::placeholder{
    color: white;
  }
`

const DescriptionInput = styled.input`
  color: rgba(255, 255, 255, 0.75);

  background: none;
  border: none;

  font-size: 20px;

  &::placeholder{
    color: rgba(255, 255, 255, 0.75);
  }
`

const SendTaskButton = styled.button`
  background: none;

  color: white;

  border: 1px solid white;

  width: 79px;
  height: 35px;

  border-radius: 1px;

  cursor: pointer;

  margin-top: 5px;

  transition: .6s;

  &:hover{
    background: white;
    color: black
  }
`

const TaskWrapper = styled.div`
  display: flex; 
  flex-direction: column;
  gap: 15px;

  margin-top: 34px;
`

var count = 0;
var color = RainbowColors[0];

export function Card(props) {

  

  const [AddTaskModal, setAddTaskModal] = useState(false);

  const [TaskTitle, setTaskTitle] = useState("Title");

  const [TaskDescription, setTaskDescription] = useState("Description");

  const [TaskColor, setTaskColor] = useState("#000");

  const [Tasks, setTasks] = useState([]);

  const [TaskStage, setTaskStage] = useState([]);
  
  
  useEffect(() => {
    count ++ 
    
    if(count === RainbowColors.length + 1){
      count = 0;
    }
    color = RainbowColors[count]

    setTaskColor(color)
    

  }, [AddTaskModal])

  function HandleCreateDataTask() {
    HandleShowAddTaskModal()
    const NewTask = { 
      title: TaskTitle,
      description: TaskDescription,
      color: TaskColor,
    }

    setTasks(prevState => [...prevState, NewTask])
  }

  function HandleShowAddTaskModal() {
    if(AddTaskModal){
      setAddTaskModal(false)
    }else{
      setAddTaskModal(true)
    }
  }

  return (
    <CardContainer>
      <Title>
        {props.title}
      </Title>
        <AddTaskModalRoot>
        <div 
        style={AddTaskButtonStyle}
        onClick={HandleShowAddTaskModal}
        >
          <p>Add Task</p>
          <UilPlus/>
        </div>
        
          {AddTaskModal &&
          <>
          <AddTaskOverlay onClick={HandleShowAddTaskModal}></AddTaskOverlay>
          <AddTaskContent style={{background: "#262626"}}>
            <AddTaskContentInputs>
                <TitleInput
                type="text"
                placeholder='Title'
                onChange={(e) => setTaskTitle(e.target.value)}
                  />
                <DescriptionInput 
                type="text"
                placeholder='Description' 
                onChange={(e) => setTaskDescription(e.target.value)}
                  />
              <SendTaskButton
              onClick={HandleCreateDataTask}
              >Send</SendTaskButton>
            </AddTaskContentInputs>
          </AddTaskContent>
          </>
          }
        </AddTaskModalRoot>

        <TaskWrapper>
          {Tasks.map((task, i) => <Task 
          key={i} id={i}
          tasktitle={task.title} 
          taskdescription={task.description} 
          taskcolor={task.color}
          taskList={Tasks}
          settasklist={setTasks}
          settasktitle={setTaskTitle}
          taskDescription={task.description}
          setTaskStage={setTaskStage}
          TaskStage={TaskStage}
          />
          )
          }
        </TaskWrapper>

    </CardContainer> 
  )}