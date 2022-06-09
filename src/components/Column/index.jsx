import styled from 'styled-components'

import { useDrag } from 'react-dnd'

import React, { useEffect } from 'react'

import { useState } from 'react'

import { UilPlus } from '@iconscout/react-unicons'

import { Task } from '../task'

const RainbowColors = ['#D93535', '#6A6DCD', '#00A88B', '#307FE2'];

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

const AddTaskButton = styled.div`
  color: white;
  background: none;
  border: none;
  position: absolute;
  display: flex;
  align-items: center;
  gap: 5;
  cursor: pointer;
`
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

  background: #262626;
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

export function Column(props) {

  //Armazena dados dos inputs
  const [AddNewTaskTitle, setAddNewTaskTitle] = useState("Title");
  const [AddNewTaskDescription, setAddNewTaskDescription] = useState("Description");

  //Modal Visibility Control
  const [AddTaskModalVisibility, setAddTaskModalVisibility] = useState(false);

  //Gerencia modal de adicionar Task
  function HandleAddTaskModal() {
    if (AddTaskModalVisibility) {
      setAddTaskModalVisibility(false)
    } else {
      setAddTaskModalVisibility(true)
    }
  }

  //Cria nova Task
  function CreateNewTask() {

    HandleAddTaskModal()

    const NewTask = {
      title: AddNewTaskTitle,
      description: AddNewTaskDescription,
      columnId: props.id,
    }

    props.ColumnList[props.id].quotes.push(NewTask)
  }


  return (
  
      <CardContainer>
        <Title>
          {props.ColumnTitle}
        </Title>

        <AddTaskModalRoot>
          <AddTaskButton
            onClick={HandleAddTaskModal}
          >
            <UilPlus />
            <p>Add Task</p>
          </AddTaskButton>

          {AddTaskModalVisibility &&
            <>
              <AddTaskOverlay
                onClick={HandleAddTaskModal}
              />

              <AddTaskContent>
                <AddTaskContentInputs>

                  <TitleInput
                    placeholder='Title'
                    onChange={(e) => setAddNewTaskTitle(e.target.value)}
                  />

                  <DescriptionInput
                    placeholder='Description'
                    onChange={(e) => setAddNewTaskDescription(e.target.value)}
                  />

                  <SendTaskButton
                    onClick={CreateNewTask}
                  >
                    Send
                  </SendTaskButton>

                </AddTaskContentInputs>
              </AddTaskContent>
            </>
          }
        </AddTaskModalRoot>

        <TaskWrapper>
          {
            props.ColumnList[props.id].quotes.map((Colum, i) =>
                <Task
                  id={i}
                  ColumnId={props.id}

                  TaskColor={RainbowColors[i]}
                  TaskTitle={props.ColumnList[props.id].quotes[i].title}
                  TaskDescription={props.ColumnList[props.id].quotes[i].description}

                  ColumnList={props.ColumnList}
                  setColumnList={props.setColumnList}

                />
              )
          }
        </TaskWrapper>

      </CardContainer>
    
  )

}