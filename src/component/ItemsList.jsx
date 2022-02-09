import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Container, List, Paper} from "@mui/material";
import { useSelector} from "react-redux";
import Typography from "@mui/material/Typography";



export default function VirtualizedList() {

    const {listData} = useSelector(({analyticData}) => ({listData: analyticData.listData}))

    return (
        <Container maxWidth="sm" sx={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <Typography variant="h5" component="h2" sx={{mt: '50px',textAlign:'center'}}>
                Your data
            </Typography>
            <Paper style={{maxHeight: 300, overflow: 'auto',maxWidth:'100%'}} sx={{mb: '50px', mt: '20px'}}>
                <List>
                    {listData.map(element => <ListItem key={element.id}>
                        <ListItemText>Элемент №{element.id + 1}: {element.item}</ListItemText>
                    </ListItem>)}
                </List>
            </Paper>
        </Container>
    );
}
