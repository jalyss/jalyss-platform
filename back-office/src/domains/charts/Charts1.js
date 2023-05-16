import React from 'react'
import { ResponsivePie } from '@nivo/pie'

function Charts1() {
    const data = [
        {
            "id": "Docteur",
            "label": "Docteur",
            "value": 51,
            "color": "hsl(100, 70%, 50%)"
          },
          {
            "id": "Formateur",
            "label": "Formateur",
            "value": 90,
            "color": "hsl(11, 70%, 50%)"
          },
          {
            "id": "Etudiant",
            "label": "Etudiant",
            "value": 75,
            "color": "hsl(183, 70%, 50%)"
          },
          {
            "id": "Journaliste",
            "label": "Journaliste",
            "value": 82,
            "color": "hsl(177, 70%, 50%)"
          },
          {
            "id": "Ingénieur",
            "label": "Ingénieur",
            "value": 31,
            "color": "hsl(110, 70%, 50%)"
          },
          
    ]
    return (
          <ResponsivePie
        data={data}
        margin={{ top: 100, right: 90, bottom: 100, left: 90 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Etudiant'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'Docteur'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 90,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
    )

}

export default Charts1

