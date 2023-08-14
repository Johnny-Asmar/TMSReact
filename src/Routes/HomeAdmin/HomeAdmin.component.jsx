import React from "react"
import styled from "@emotion/styled"
import FullFeaturedCrudGrid from '../../Components/Table/Table.componenet'
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
const HomeAdmin = () => {
    return(
        <Grid>
        <Main>
        <Typography color="neutral" level="h1">Welcome to TMS</Typography>     
        <FullFeaturedCrudGrid />
        </Main>
        </Grid>
    )
}

export default HomeAdmin