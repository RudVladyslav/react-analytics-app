import React from 'react';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import {Container} from "@mui/material";

const Graphic = () => {
    const {graphicData} = useSelector(({analyticData}) => (({graphicData: analyticData.graphicData})))

    return (
        <Container maxWidth="lg">
            <Typography variant="h5" component="h2" sx={{mt: '50px', mb: '20px', textAlign: 'center'}}>
                Line graph
            </Typography>
            <ResponsiveContainer width={'100%'} height={300}>
                <LineChart
                    width={500}
                    height={300}
                    data={graphicData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="id"/>
                    <YAxis/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="amount" stroke="#82ca9d"/>
                </LineChart>
            </ResponsiveContainer>
        </Container>
    );
};

export default Graphic;