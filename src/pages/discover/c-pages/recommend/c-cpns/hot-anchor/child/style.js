import styled from "styled-components";

export const ChildWarrper = styled.div`
    display: flex;
    margin:10px 0;
    .img{
        width: 40px;
        height: 40px;
    }
    .text{
        padding: 4px 0 0 10px;

        p:last-child{
            width: 150px;
            color: rgb(102,102,102);
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }    
    }
    
    
`