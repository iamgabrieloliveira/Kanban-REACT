import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { Column } from '../components/Column/index'
import { Task } from '../components/task'

const ResetGlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  font-family: 'Inter', sans-serif;
}
`
const Body = styled.main`
`
const Title = styled.h1`
  color: white;

  font-size: 50px;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  margin-top: 25px;
`
const ColumnWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;

  padding: 170px 0;
`

//Lista das Colunas

const Columnlist = [
  {
    id: 1,
    name: 'BackLog',
    quotes: [],
  },
  {
    id: 2,
    name: 'ToDo',
    quotes: [],
  },
  {
    id: 3,
    name: 'In Progress',
    quotes: [],
  },
  {
    id: 4,
    name: 'Finished',
    quotes: [],
  }
]

//Lista de Tarefas 
const TasksList = [];

export function Board() {

  const [ColumnListState, setColumnListState] = useState(Columnlist);

  // Relaciona Task com suas respectivas colunas
  useEffect(() => {
    let columns = [...Columnlist]
    for (let column of columns) {
      for (let task of TasksList) {
        if (task.columnId == column.id) {
          column.quotes.push(task)
        }
      }
    }

    setColumnListState(columns)
  }, [])

  return (
    <Body>
      <ResetGlobalStyle />
      <Title>Kanban</Title>
      <ColumnWrapper>
        <Column id={0} ColumnTitle={Columnlist[0].name} ColumnList={ColumnListState} setColumnList={setColumnListState} />
        <Column id={1} ColumnTitle={Columnlist[1].name} ColumnList={ColumnListState} setColumnList={setColumnListState} />
        <Column id={2} ColumnTitle={Columnlist[2].name} ColumnList={ColumnListState} setColumnList={setColumnListState} />
        <Column id={3} ColumnTitle={Columnlist[3].name} ColumnList={ColumnListState} setColumnList={setColumnListState} />
      </ColumnWrapper>
    </Body>
  )
}