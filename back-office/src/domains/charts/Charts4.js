import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

function Charts4() {
    const data = [
        {
            "branch": "Tunisia",
            "personnel development": 193,
            "personnel developmentColor": "hsl(150, 70%, 50%)",
            "business": 108,
            "businessColor": "hsl(321, 70%, 50%)",
            "psychology": 35,
            "psychologyColor": "hsl(285, 70%, 50%)",
            "novels": 136,
            "novelsColor": "hsl(25, 70%, 50%)",
            "philosophy": 167,
            "philosophyColor": "hsl(270, 70%, 50%)",
            "civilization": 75,
            "civilizationColor": "hsl(85, 70%, 50%)"
        },
        {
            "branch": "Marroc",
            "personnel development": 124,
            "personnel developmentColor": "hsl(26, 70%, 50%)",
            "business": 44,
            "businessColor": "hsl(10, 70%, 50%)",
            "psychology": 60,
            "psychologyColor": "hsl(350, 70%, 50%)",
            "novels": 34,
            "novelsColor": "hsl(253, 70%, 50%)",
            "philosophy": 3,
            "philosophyColor": "hsl(63, 70%, 50%)",
            "civilization": 114,
            "civilizationColor": "hsl(46, 70%, 50%)"
        },

    ]
    return (
        <ResponsiveBar
            data={data}
            keys={[
                'personnel development',
                'business',
                'psychology',
                'novels',
                'philosophy',
                'civilization'
            ]}
            indexBy="branch"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.2}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'philosophy'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'psychology'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'branch',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'category',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={e => e.id + ": " + e.formattedValue + " in branch: " + e.indexValue}
        />
    )

}

export default Charts4

