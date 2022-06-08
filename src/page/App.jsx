import { useState } from 'react'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { Card } from '../components/card/index'

// RESET CSS 
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

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;

  padding: 170px 0;
`

export function App() {

  return (
    <Body>
      <ResetGlobalStyle/>
       <Title>Kanban</Title>
       <CardWrapper>
        <Card title="Backlog"/>
        <Card title="To Do"/>
        <Card title="In Progress"/>
        <Card title="Finished"/>
       </CardWrapper>
    </Body>
  )
}