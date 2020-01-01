import React from 'react';

import styled from 'styled-components';

const Container = getStyledContainer();
const Img = getStyledImage();
const Infos = getStyledInfos();
const Login = getStyledLogin();
const FullName = getStyledFullName();

export function ProfilePage(props) {
  return (
    <Container>
      <Img src={props.avatarUrl} />
      <Infos>
        <FullName>
          {props.name}
        </FullName>
        <Login>
          {props.login}
        </Login>
        <p>
          {props.bio || 'No biography.'}
        </p>
      </Infos>
    </Container>
  );
}

function getStyledLogin() {
  return styled.span`
    font-size: 1.5rem;
    line-height: 1.5rem;
    font-style: normal;
    font-weight: 300;
    color: #666;
  `;
}

function getStyledFullName() {
  return styled.span`
    display: block;
    font-size: 2rem;
    line-height: 2rem;
    font-weight: 600;
  `;
}

function getStyledImage() {
  return styled.img`
    height: 240px;
    width: 240px;
    flex: content;
    margin: 0.5rem;
    @media (max-width: 959px) and (min-width: 480px) {
      width: 160px;
      height: 160px;
    }
    @media (max-width: 479px) {
      width: 100px;
      height: 100px;
    }
  `;
}

function getStyledInfos() {
  return styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0.5rem;
    min-width: 180px;
  `;
}
function getStyledContainer() {
  return styled.div`
    margin: -0.5rem;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  `;
}
