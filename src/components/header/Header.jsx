import React from 'react';
import styled from 'styled-components';
import { Tab } from './Tab';

export const HeaderComponent = () => {
    return (
        <Header>

            <LogoContainer>
                Inmunizate-RD
            </LogoContainer>

            <TabsContainer>
                
                <Tab route = '/new-register' title = 'Nuevo Registro'/>
                <Tab route = '/' title = 'Consultas'/>                
                <Tab route = '/settings' title = 'Settings'/>                            

            </TabsContainer>

        </Header>
    )
}

const Header = styled.header`
  background-color: #03256C;
  color: #f5f6fa;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 15px;  
  min-height: 60px;
`;

const TabsContainer = styled.nav`

    display: flex;
    flex: 1;
    justify-content: space-between;
    font-size: 18px;
    font-weight: bold;

    a {
        background-color: white;
        color: #03256C;
        padding: 5px 20px;
        border-radius: 10px;
        text-decoration: none;
    }

`;

const Button = styled.input`
    color: #03256C;
    background-color: white;
    font-weight: bold;
    padding: 5px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;

    &:hover{
        color: green;
        transition: 1s;
    }
`;

const LogoContainer = styled.div`
    flex: 1;
`;
