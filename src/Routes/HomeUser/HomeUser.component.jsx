import React from "react"
import styled from "@emotion/styled"
import TableView from "../../Components/TableView/TableView.component"
import Typography from '@mui/joy/Typography';

const Grid = styled.div`
display: flex;
justify-content: center;
@media (max-width: 1056px) {
    flex-direction: column;
  }
`
const Main = styled.div`
`
const HomeUser = () => {
    return(
        <Grid>
        <Main>
        <Typography color="neutral" level="h1">Welcome to TMS</Typography>     
        <TableView />
        </Main>
        </Grid>
    )
}

export default HomeUser