import React from "react"
import FullFeaturedCrudGrid from '../Table/Table.componenet'
import Typography from '@mui/joy/Typography';
import styled from "@emotion/styled"

const Main = styled.div`
`



const MainTMS = () => {
    return(
        <Main>
        <Typography color="neutral" level="h1">Welcome to TMS</Typography>     
        <FullFeaturedCrudGrid />
        </Main>

    )
}

export default MainTMS