// import React from 'react'
// import { ResponsiveBar } from '@nivo/bar'
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { fetchCommandLine, fetchCommands } from '../../store/command';

// function Charts4() {
//     const dispatch = useDispatch()
//     const commandStore = useSelector((state) => state.command)
//     const [category, setCategory] = useState([])
//     const [branch, setBranch] = useState([])


//     useEffect(() => {
//         dispatch(fetchCommandLine())
//     }, [dispatch])

//     useEffect(() => {
//         if (commandStore.commandLines.items.length > 0) {
//             const branchs = commandStore.commandLines.items.map((e) => {
//                 const branch1 = e.articleByBranch.branch.name
//                 return `${branch1}`;
//             })
//             setBranch(branchs);
//         }
//     }, [commandStore.commandLines.items])
//     useEffect(() => {
//         if (commandStore.commandLines.items.length > 0) {
//             const categories = commandStore.commandLines.items.map((e) => {
//                 const category = e.articleByBranch.article.category.nameEn
//                 return `${category}`;
//             })
//             setCategory(categories);
//         }
//     }, [commandStore.commandLines.items])

//     console.log(category);
//     console.log(branch);

//     console.log(commandStore.commandLines.items);


//     const data = [
//         {
//             "branch": branch,
//             "Personnel development": 41,
//             "personnel developmentColor": "hsl(26, 70%, 50%)",
//             "Business": 33,
//             "businessColor": "hsl(10, 70%, 50%)",
//             "Psychology": 28,
//             "psychologyColor": "hsl(350, 70%, 50%)",
//             "Novels": 22,
//             "novelsColor": "hsl(253, 70%, 50%)",
//             "Philosophy": 11,
//             "philosophyColor": "hsl(63, 70%, 50%)",
//             "Awareness": 30,
//             "warenessColor": "hsl(46, 70%, 50%)"
//         },
//         {
//             "branch": "Marroc",
//             "Personnel development": 0,
//             "personnel developmentColor": "hsl(26, 70%, 50%)",
//             "Business": 0,
//             "businessColor": "hsl(10, 70%, 50%)",
//             "Psychology": 0,
//             "psychologyColor": "hsl(350, 70%, 50%)",
//             "Novels": 0,
//             "novelsColor": "hsl(253, 70%, 50%)",
//             "Philosophy": 0,
//             "philosophyColor": "hsl(63, 70%, 50%)",
//             "Awareness": 0,
//             "AwarenessColor": "hsl(46, 70%, 50%)"
//         },

//     ]
//     return (
//         <ResponsiveBar
//             data={data}
//             keys={[
//                 'Personnel development',
//                 'Business',
//                 'Psychology',
//                 'Novels',
//                 'Philosophy',
//                 'Awareness'
//             ]}
//             indexBy="branch"
//             margin={{ top: 50, right: 180, bottom: 50, left: 60 }}
//             padding={0.2}
//             valueScale={{ type: 'linear' }}
//             indexScale={{ type: 'band', round: true }}
//             colors={{ scheme: 'blue_purple' }}
//             defs={[
//                 {
//                     id: 'dots',
//                     type: 'patternDots',
//                     background: 'inherit',
//                     color: '#38bcb2',
//                     size: 4,
//                     padding: 1,
//                     stagger: true
//                 },
//                 {
//                     id: 'lines',
//                     type: 'patternLines',
//                     background: 'inherit',
//                     color: '#eed312',
//                     rotation: -45,
//                     lineWidth: 6,
//                     spacing: 10
//                 }
//             ]}
//             fill={[
//                 {
//                     match: {
//                         id: 'Philosophy'
//                     },
//                     id: 'dots'
//                 },
//                 {
//                     match: {
//                         id: 'Psychology'
//                     },
//                     id: 'lines'
//                 }
//             ]}
//             borderColor={{
//                 from: 'color',
//                 modifiers: [
//                     [
//                         'darker',
//                         1.6
//                     ]
//                 ]
//             }}
//             axisTop={null}
//             axisRight={null}
//             axisBottom={{
//                 tickSize: 5,
//                 tickPadding: 5,
//                 tickRotation: 0,
//                 legend: 'BRANCH',
//                 legendPosition: 'middle',
//                 legendOffset: 32
//             }}
//             axisLeft={{
//                 tickSize: 5,
//                 tickPadding: 5,
//                 tickRotation: 0,
//                 legend: 'CATEGORY',
//                 legendPosition: 'middle',
//                 legendOffset: -40
//             }}
//             labelSkipWidth={12}
//             labelSkipHeight={12}
//             labelTextColor={{
//                 from: 'color',
//                 modifiers: [
//                     [
//                         'darker',
//                         1.6
//                     ]
//                 ]
//             }}
//             legends={[
//                 {
//                     dataFrom: 'keys',
//                     anchor: 'bottom-right',
//                     direction: 'column',
//                     justify: false,
//                     translateX: 120,
//                     translateY: 0,
//                     itemsSpacing: 2,
//                     itemWidth: 100,
//                     itemHeight: 20,
//                     itemDirection: 'left-to-right',
//                     itemOpacity: 0.85,
//                     symbolSize: 20,
//                     effects: [
//                         {
//                             on: 'hover',
//                             style: {
//                                 itemOpacity: 1
//                             }
//                         }
//                     ]
//                 }
//             ]}
//             role="application"
//             ariaLabel="Nivo bar chart demo"
//             barAriaLabel={e => e.id + ": " + e.formattedValue + " in branch: " + e.indexValue}
//         />
//     )

// }

// export default Charts4

