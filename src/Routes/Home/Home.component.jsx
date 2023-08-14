import React from "react"
import MainTMS from "../../Components/MainTMS/MainTMS.component"
import styled from "@emotion/styled"
const Grid = styled.div`
display: flex;
justify-content: center;
@media (max-width: 1056px) {
    flex-direction: column;
  }
`
const Home = () => {
    return(
        <Grid>
            <MainTMS />
        </Grid>
    )
}

export default Home