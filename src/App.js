// App.js File
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import "./App.css"
class App extends Component {
    constructor(props) {
        super(props);

        // Setting up state
        this.state = {
            userInput: "",
            list: [],
        };
    }

    // Set a user input value
    updateInput(value) {
        this.setState({
            userInput: value,
        });
    }

    // Add item if user input is not empty
    addItem() {
        if (this.state.userInput !== "") {
            const userInput = {
                // Add a random id which is used to delete
                id: Math.random(),

                // Add a user value to list
                value: this.state.userInput,

                // Add default due date and status
                dueDate: null,
                status: "Pending",
            };

            // Update list
            const list = [...this.state.list];
            list.push(userInput);

            // reset state
            this.setState({
                list,
                userInput: "",
            });
        }
    }

    // Function to delete item from list use id to delete
    deleteItem(key) {
        const list = [...this.state.list];

        // Filter values and leave the value which we need to delete
        const updateList = list.filter((item) => item.id !== key);

        // Update list in state
        this.setState({
            list: updateList,
        });
    }

    // Function to edit item
    editItem = (index) => {
        const todos = [...this.state.list];
        const editedTodo = prompt('Edit the todo:');
        if (editedTodo !== null && editedTodo.trim() !== '') {
            let updatedTodos = [...todos];
            updatedTodos[index].value = editedTodo;
            this.setState({
                list: updatedTodos,
            });
        }
    }

    // Function to handle due date change
    handleDueDateChange = (index, date) => {
        const todos = [...this.state.list];
        todos[index].dueDate = date;
        this.setState({
            list: todos,
        });
    }

    // Function to set status
    setStatus = (index, status) => {
        const todos = [...this.state.list];
        todos[index].status = status;
        this.setState({
            list: todos,
        });
    }

    render() {
        return (
            <Container>
                <Row
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "3rem",
                        fontWeight: "bolder",
                    }}
                >
                    TODO LIST
                </Row>

                <hr />
                <Row>
                    <Col md={{ span: 5, offset: 4 }}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Add item . . . "
                                size="lg"
                                value={this.state.userInput}
                                onChange={(item) =>
                                    this.updateInput(item.target.value)
                                }
                                aria-label="Add something"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup>
                                <Button
                                    variant="dark"
                                    className="mt-2"
                                    onClick={() => this.addItem()}
                                >
                                    ADD
                                </Button>
                            </InputGroup>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 11, offset: 1}} sm={{span: 12, offset:0}}>
                        <ListGroup>
                            {/* Map over and print items */}
                            {this.state.list.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <ListGroup.Item
                                            variant="dark"
                                            className="plxg"
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }} 
                                        >
                                            <span className="box1">{item.value}</span>
                                            <span className="box2" >
                                                <Button
                                                    style={{ marginRight: "10px" }}
                                                    variant="light"
                                                    onClick={() => this.deleteItem(item.id)}>
                                                    Delete
                                                </Button>
                                                <Button
                                                    style={{ marginRight: "10px" }}
                                                    variant="light"
                                                    onClick={() => this.editItem(index)}>
                                                    Edit
                                                </Button>
                                                <Form.Control
                                                    type="date"
                                                    style={{ marginRight: "10px", display: "inline-block", width: "auto" }}
                                                    value={item.dueDate || ''}
                                                    placeholder="Due Date"
                                                    onChange={(e) => this.handleDueDateChange(index, e.target.value)}
                                                />
                                                <Form.Select
                                                    style={{ display: "inline-block", width: "auto" }}
                                                    value={item.status}
                                                    onChange={(e) => this.setStatus(index, e.target.value)}>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Finished">Finished</option>
                                                </Form.Select>
                                            </span>
                                        </ListGroup.Item>
                                        <p style={{ marginLeft: "15px" }}>
                                            <b>Due Date:</b> {item.dueDate || "Not set"} | <b>Status:</b> {item.status}
                                        </p>
                                    </div>
                                );
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
