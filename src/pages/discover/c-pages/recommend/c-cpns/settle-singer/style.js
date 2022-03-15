import styled from "styled-components";

export const SettleWrapper = styled.div`
    width: 100%;
    height: 455px;
    margin-bottom: 20px;
    .content{
        width: 210px;
        margin: 18px auto;

        .topText{
            display: flex;
            justify-content:space-between;
            border-bottom: 1px solid rgb(204,204,204);
            padding-bottom: 5px;
       }

       .center{
           margin-top: 15px;
       }

       .bot{
           
            background-position-x: right;
            background-position-y: -100px;
            background-position:0 -140px;

           .bot-a{
               display: inline-block;
               width: 100%;
               height: 31px;
               /* background-position:0 -140px; */
               padding: 0 5px 0 0;
               text-align: center;
               line-height: 31px;
               text-decoration: none;
               background-position-x: right;
               background-position-y: -181px;
               
           }
           
       }
    }
    
`