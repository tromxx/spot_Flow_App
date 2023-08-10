import React, { useContext } from 'react';
import { UserContext } from '../../context/UserStore';
import styled, { css } from 'styled-components';

const FollowerCounterDiv = styled.div`
    display: flex;
    gap: 50px;
    margin-top: 30px;
    cursor: pointer;
`;

const CounterItem = styled.p`
    margin: 0;
    padding-bottom: 3px;
    cursor: pointer;
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;    
        width: 0;
        height: 2px;
        background-color: black;
        transition: width 0.3s ease; 
    }

    ${props =>
        props.selected &&
        css`
            &::before {
                width: 100%; 
            }
        `}
`;

const FollowCounter = ({ selected, onSelectCounter }) => {
    const { follower, following } = useContext(UserContext);
    return (
        <FollowerCounterDiv>
            <CounterItem selected={selected === 'follower'} onClick={() => onSelectCounter('follower')}>
                Follower : {follower}
            </CounterItem>
            <CounterItem selected={selected === 'following'} onClick={() => onSelectCounter('following')}>
                Following : {following}
            </CounterItem>
        </FollowerCounterDiv>
    );
};

export default FollowCounter;
