import FileDetails from '@components/FileDetails'
import axios from 'axios'
import { IFile } from 'library/types'
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import fileDownload from 'js-file-download'

const index: NextPage<{file: IFile}> = ({ file: { format, name, sizeInBytes, id } }) => {

    const handleDownload = async () => {
        const { data } = await axios.get(`http://localhost:8000/api/files/${id}/download`, {
            responseType: "blob",
        })

        let _name =name.toString()
        fileDownload(data, _name);
    }

    return (
        <div className='flex flex-col items-center justify-center py-3 space-y-4 bg-gray-800 rounded-md shadow-xl w-96'>
            {!id ?
                <span> Oops! File not found!</span> : <>
                    <img src="/images/file-download.png" alt="" className="w-16 h-16" />
                    <h1 className='text-xl'>Your file is downloaded!</h1>
                    <FileDetails file={{ format, name, sizeInBytes }} />
                    <button className="button" onClick={handleDownload}> Download</button>
                </>
            }
        </div>
    )
}

export default index

export async function getServerSideProps(context: any) {
    const { id } = context.query;
    let file;
    try {
        const { data } = await axios.get(`http://localhost:8000/api/files/${id}`)
        file = data
    } catch (error) {
        console.log(error.response.data)
        file = {}
    }
    return {
        props: {
            file,
        } //will be passed to the page component as props 
    }
}


// import { useState, useEffect } from "react";
// import TreeView from "@material-ui/lab/TreeView";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import Checkbox from "@material-ui/core/Checkbox";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import TreeItem from "@material-ui/lab/TreeItem";
// import data from "./data.json";

// //BFS algorithm to find node by his ID
// const bfsSearch = (graph, targetId) => {
//   const queue = [...graph];

//   while (queue.length > 0) {
//     const currNode = queue.shift();
//     if (currNode.id === targetId) {
//       return currNode;
//     }
//     if (currNode.children) {
//       queue.push(...currNode.children);
//     }
//   }
//   return []; // Target node not found
// };

// export default function App() {
//   const [selectedNodes, setSelectedNodes] = useState([]);
//   useEffect(() => {
//     console.log("Selected Nodes:");
//     console.log(JSON.stringify(selectedNodes, null, 4));
//   }, [selectedNodes]);

//   // Retrieve all ids from node to his children's
//   function getAllIds(node, idList = []) {
//     idList.push(node.id);
//     if (node.children) {
//       node.children.forEach((child) => getAllIds(child, idList));
//     }
//     return idList;
//   }
//   // Get IDs of all children from specific node
//   const getAllChild = (id) => {
//     return getAllIds(bfsSearch(data, id));
//   };

//   // Get all father IDs from specific node
//   const getAllFathers = (id, list = []) => {
//     const node = bfsSearch(data, id);
//     if (node.parent) {
//       list.push(node.parent);

//       return getAllFathers(node.parent, list);
//     }

//     return list;
//   };

//   function isAllChildrenChecked(node, list) {
//     const allChild = getAllChild(node.id);
//     const nodeIdIndex = allChild.indexOf(node.id);
//     allChild.splice(nodeIdIndex, 1);

//     return allChild.every((nodeId) =>
//       selectedNodes.concat(list).includes(nodeId)
//     );
//   }

//   const handleNodeSelect = (event, nodeId) => {
//     event.stopPropagation();
//     const allChild = getAllChild(nodeId);
//     const fathers = getAllFathers(nodeId);

//     if (selectedNodes.includes(nodeId)) {
//       // Need to de-check
//       setSelectedNodes((prevSelectedNodes) =>
//         prevSelectedNodes.filter((id) => !allChild.concat(fathers).includes(id))
//       );
//     } else {
//       // Need to check
//       const ToBeChecked = allChild;
//       for (let i = 0; i < fathers.length; ++i) {
//         if (isAllChildrenChecked(bfsSearch(data, fathers[i]), ToBeChecked)) {
//           ToBeChecked.push(fathers[i]);
//         }
//       }
//       setSelectedNodes((prevSelectedNodes) =>
//         [...prevSelectedNodes].concat(ToBeChecked)
//       );
//     }
//   };

//   const handleExpandClick = (event) => {
//     // prevent the click event from propagating to the checkbox
//     event.stopPropagation();
//   };

//   const renderTree = (nodes) => (
//     <TreeItem
//       key={nodes.id}
//       nodeId={nodes.id}
//       onClick={handleExpandClick}
//       label={
//         <>
//           <Checkbox
//             checked={selectedNodes.indexOf(nodes.id) !== -1}
//             tabIndex={-1}
//             disableRipple
//             onClick={(event) => handleNodeSelect(event, nodes.id)}
//           />
//           {nodes.name}
//         </>
//       }
//     >
//       {Array.isArray(nodes.children)
//         ? nodes.children.map((node) => renderTree(node))
//         : null}
//     </TreeItem>
//   );

//   return (
//     <TreeView
//       multiSelect
//       defaultCollapseIcon={<ExpandMoreIcon />}
//       defaultExpandIcon={<ChevronRightIcon />}
//       selected={selectedNodes}
//     >
//       {data.map((node) => renderTree(node))}
//     </TreeView>
//   );
// }

