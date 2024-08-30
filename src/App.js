// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.css";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
// import InputGroup from "react-bootstrap/InputGroup";
// import FormControl from "react-bootstrap/FormControl";
// import ListGroup from "react-bootstrap/ListGroup";
// import Form from "react-bootstrap/Form";
// import { v4 as uuidv4 } from 'uuid';
// import "./App.css";

// const App = () => {
//     // Initialize state with data from localStorage
//     const [userInput, setUserInput] = useState("");
//     const [list, setList] = useState(() => {
//         // Load list from localStorage if available
//         const savedList = localStorage.getItem('todoList');
//         return savedList ? JSON.parse(savedList) : [];
//     });

//     // Save list to localStorage whenever it changes
//     useEffect(() => {
//         localStorage.setItem('todoList', JSON.stringify(list));
//     }, [list]);

//     const addItem = () => {
//         if (userInput.trim() !== "") {
//             setList([...list, {
//                 id: uuidv4(),
//                 value: userInput,
//                 dueDate: null,
//                 status: "Pending"
//             }]);
//             setUserInput("");
//         }
//     };

//     const deleteItem = (id) => {
//         setList(list.filter(item => item.id !== id));
//     };

//     const editItem = (index) => {
//         const editedTodo = prompt('Edit the todo:');
//         if (editedTodo !== null && editedTodo.trim() !== '') {
//             const updatedList = [...list];
//             updatedList[index].value = editedTodo;
//             setList(updatedList);
//         }
//     };

//     const handleDueDateChange = (index, date) => {
//         const updatedList = [...list];
//         updatedList[index].dueDate = date;
//         setList(updatedList);
//     };

//     const setStatus = (index, status) => {
//         const updatedList = [...list];
//         updatedList[index].status = status;
//         setList(updatedList);
//     };

//     return (
//         <Container>
//             <Row
//                 style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     fontSize: "3rem",
//                     fontWeight: "bolder",
//                 }}
//             >
//                 TODO LIST
//             </Row>

//             <hr />
//             <Row>
//                 <Col md={{ span: 5, offset: 4 }}>
//                     <InputGroup className="mb-3">
//                         <FormControl
//                             placeholder="Add item . . . "
//                             size="lg"
//                             value={userInput}
//                             onChange={(e) => setUserInput(e.target.value)}
//                             aria-label="Add something"
//                             aria-describedby="basic-addon2"
//                         />
//                         <InputGroup>
//                             <Button
//                                 variant="dark"
//                                 className="mt-2"
//                                 onClick={addItem}
//                             >
//                                 ADD
//                             </Button>
//                         </InputGroup>
//                     </InputGroup>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col md={{ span: 11, offset: 1 }} sm={{ span: 12, offset: 0 }}>
//                     <ListGroup>
//                         {list.map((item, index) => (
//                             <div key={item.id}>
//                                 <ListGroup.Item
//                                     variant="dark"
//                                     className="plxg"
//                                     style={{
//                                         display: "flex",
//                                         justifyContent: "space-between",
//                                     }}
//                                 >
//                                     <span className="box1">{item.value}</span>
//                                     <span className="box2">
//                                         <Button
//                                             style={{ marginRight: "10px" }}
//                                             variant="light"
//                                             onClick={() => deleteItem(item.id)}
//                                         >
//                                             Delete
//                                         </Button>
//                                         <Button
//                                             style={{ marginRight: "10px" }}
//                                             variant="light"
//                                             onClick={() => editItem(index)}
//                                         >
//                                             Edit
//                                         </Button>
//                                         <Form.Control
//                                             type="date"
//                                             style={{ marginRight: "10px", display: "inline-block", width: "auto" }}
//                                             value={item.dueDate || ''}
//                                             placeholder="Due Date"
//                                             onChange={(e) => handleDueDateChange(index, e.target.value)}
//                                         />
//                                         <Form.Select
//                                             style={{ display: "inline-block", width: "auto" }}
//                                             value={item.status}
//                                             onChange={(e) => setStatus(index, e.target.value)}
//                                         >
//                                             <option value="Pending">Pending</option>
//                                             <option value="Finished">Finished</option>
//                                         </Form.Select>
//                                     </span>
//                                 </ListGroup.Item>
//                                 <p style={{ marginLeft: "15px" }}>
//                                     <b>Due Date:</b> {item.dueDate || "Not set"} | <b>Status:</b> {item.status}
//                                 </p>
//                             </div>
//                         ))}
//                     </ListGroup>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default App;
