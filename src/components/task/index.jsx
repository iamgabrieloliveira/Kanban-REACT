import styled from 'styled-components'

import { useState } from 'react';

import { UilEdit, UilTrashAlt, UilCheckCircle, UilAngleDoubleRight, UilAngleDoubleLeft } from '@iconscout/react-unicons'

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

const LeftStageStyle = {
  color: "white",
  cursor: "pointer",
  width: 30,
  height: 30,
  position: "absolute",
  marginTop: 81,
  marginLeft: -13,
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
    color: rgba(255, 255, 255, 0.75);
  }
`
export function Task(props) {


  const [TaskEditingState, setTaskEditingState] = useState(false);

  const [TitleEditInput, setTitleEditInput] = useState(props.TaskTitle);
  const [DescriptionEditInput, setDescriptionEditInput] = useState(props.TaskDescription);

  //Edita a TASK
  function EditTask() {
    if (TaskEditingState) {
      setTaskEditingState(false)
      props.ColumnList[props.ColumnId].quotes[props.id].title = TitleEditInput
      props.ColumnList[props.ColumnId].quotes[props.id].description = DescriptionEditInput
      props.setColumnList([...props.ColumnList])
    }
    else {
      setTaskEditingState(true)
    }
  }

  //Delete a TASK 
  function DeleteTask() {
    props.ColumnList[props.ColumnId].quotes.splice(props.id, 1)

    props.setColumnList([...props.ColumnList])
  }

  //Trocar Stage 
  function MoveTaskToRight() {

    if (props.ColumnId == props.ColumnList.length - 1) {
      let changed = props.ColumnList[props.ColumnId].quotes.splice(props.id, 1);
      props.ColumnList[0].quotes.push(changed[0])
      props.setColumnList([...props.ColumnList])
    } else {

      let Changed = props.ColumnList[props.ColumnId].quotes.splice(props.id, 1);
      props.ColumnList[props.ColumnId + 1].quotes.push(Changed[0])

      props.setColumnList([...props.ColumnList])
    }
  }
  function MoveTaskToLeft() {

    if (props.ColumnId == 0) {
      let changed = props.ColumnList[props.ColumnId].quotes.splice(props.id, 1);
      props.ColumnList[props.ColumnList.length - 1].quotes.push(changed[0])
      props.setColumnList([...props.ColumnList])
    } else {

      let Changed = props.ColumnList[props.ColumnId].quotes.splice(props.id, 1);
      props.ColumnList[props.ColumnId - 1].quotes.push(Changed[0])

      props.setColumnList([...props.ColumnList])
    }
  }

  return (
    <TaskContainer
      style={{ background: props.TaskColor }}
      draggable="true">
      {TaskEditingState ?
        <>
          <TitleInput
            onChange={(e) => setTitleEditInput(e.target.value)}
            placeholder={props.TaskTitle} />
          <DescriptionInput
            onChange={(e) => setDescriptionEditInput(e.target.value)}
            placeholder={props.TaskDescription}
          />
        </>
        :
        <>
          <TaskTitle>
            {props.TaskTitle}
          </TaskTitle>
          <TaskDescription>
            {props.TaskDescription}
          </TaskDescription>
        </>
      }
      <UtilitysButtons>
        {TaskEditingState ?
          <UilCheckCircle
            onClick={EditTask}
            style={UtilityButtonStyle}
          />
          :
          <UilEdit
            onClick={EditTask}
            style={UtilityButtonStyle}
          />}
        <UilTrashAlt
          style={UtilityButtonStyle}
          onClick={DeleteTask}
        />
      </UtilitysButtons>
      <UilAngleDoubleRight
        onClick={MoveTaskToRight}
        style={RigthStageStyle}
      />
      <UilAngleDoubleLeft
        style={LeftStageStyle}
        onClick={MoveTaskToLeft}
      />
    </TaskContainer>
  )
}