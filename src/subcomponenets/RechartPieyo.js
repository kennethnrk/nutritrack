import React from 'react';
import { PieChart, Pie, Tooltip, } from 'recharts';



export default function RechartPieyo(props) {

        return (
                <PieChart width={300} height={300}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={props.data}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    />
                    <Tooltip />
                </PieChart>
        );

}
