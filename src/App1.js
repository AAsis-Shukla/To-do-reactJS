import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Collapse from "react-bootstrap/Collapse";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";

const App = () => {
    const [userInput, setUserInput] = useState("");
    const [list, setList] = useState(() => {
        const savedList = localStorage.getItem('todoList');
        return savedList ? JSON.parse(savedList) : [];
    });
    const [sortOrder, setSortOrder] = useState("Latest to Oldest");

    // Filter states
    const [filterContent, setFilterContent] = useState("");
    const [filterAddedDate, setFilterAddedDate] = useState("");
    const [filterDueDate, setFilterDueDate] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    const [open, setOpen] = useState(false); // Default to collapsed

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(list));
    }, [list]);

    const addItem = () => {
        if (userInput.trim() !== "") {
            setList(prevList => {
                const newItem = {
                    id: uuidv4(),
                    value: userInput,
                    dueDate: null,
                    status: "Pending",
                    timestamp: Date.now(),
                    taskAddedDate: new Date().toISOString().split('T')[0]
                };
                const newList = [...prevList, newItem];
                return sortByTimestamp(newList, sortOrder);
            });
            setUserInput("");
        }
    };

    const deleteItem = (id) => {
        setList(list.filter(item => item.id !== id));
    };

    const editItem = (index) => {
        const editedTodo = prompt('Edit the todo:');
        if (editedTodo !== null && editedTodo.trim() !== '') {
            const updatedList = [...list];
            updatedList[index].value = editedTodo;
            setList(sortByTimestamp(updatedList, sortOrder));
        }
    };

    const handleDueDateChange = (index, date) => {
        const updatedList = [...list];
        updatedList[index].dueDate = date;
        setList(updatedList);
    };

    const setStatus = (index, status) => {
        const updatedList = [...list];
        updatedList[index].status = status;
        setList(updatedList);
    };

    const sortByTimestamp = (list, order) => {
        if (order === "Latest to Oldest") {
            return list.sort((a, b) => b.timestamp - a.timestamp);
        } else {
            return list.sort((a, b) => a.timestamp - b.timestamp);
        }
    };

    const handleSortOrderChange = (e) => {
        const newOrder = e.target.value;
        setSortOrder(newOrder);
        setList(sortByTimestamp([...list], newOrder));
    };

    const getFilteredTasks = () => {
        return list.filter(item => {
            const matchContent = item.value.toLowerCase().includes(filterContent.toLowerCase());
            const matchAddedDate = filterAddedDate ? item.taskAddedDate === filterAddedDate : true;
            const matchDueDate = filterDueDate ? item.dueDate === filterDueDate : true;
            const matchStatus = filterStatus ? item.status === filterStatus : true;

            return matchContent && matchAddedDate && matchDueDate && matchStatus;
        });
    };

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
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            aria-label="Add something"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup>
                            <Button
                                variant="dark"
                                className="mt-2"
                                onClick={addItem}
                            >
                                ADD
                            </Button>
                            <Button
                                variant="secondary"
                                className="mt-2 ms-2"
                                onClick={() => setOpen(!open)}
                            >
                                {open ? "Collapse" : "Expand"}
                            </Button>
                        </InputGroup>
                    </InputGroup>
                </Col>
            </Row>

            <Collapse in={open}>
                <div>
                    {/* Sorting Order Selection */}
                    <Row className="mb-3">
                        <Col md={{ span: 5, offset: 4 }}>
                            <Form.Label><b>Sort By</b></Form.Label>
                            <Form.Select
                                value={sortOrder}
                                onChange={handleSortOrderChange}
                            >
                                <option value="Latest to Oldest">Latest to Oldest</option>
                                <option value="Oldest to Latest">Oldest to Latest</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    {/* Filter Options */}
                    <Row className="mb-3">
                        <Col md={{ span: 5, offset: 4 }}>
                            <Form.Label><b>Filter By</b></Form.Label>
                            <InputGroup className="mb-2">
                                <FormControl
                                    placeholder="Filter by content..."
                                    value={filterContent}
                                    onChange={(e) => setFilterContent(e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Filter by task added date</Tooltip>}
                                >
                                    <FormControl
                                        type="date"
                                        placeholder="Filter by task added date..."
                                        value={filterAddedDate}
                                        onChange={(e) => setFilterAddedDate(e.target.value)}
                                    />
                                </OverlayTrigger>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Filter by due date</Tooltip>}
                                >
                                    <FormControl
                                        type="date"
                                        placeholder="Filter by due date..."
                                        value={filterDueDate}
                                        onChange={(e) => setFilterDueDate(e.target.value)}
                                    />
                                </OverlayTrigger>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <Form.Select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="">Filter by status...</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Finished">Finished</option>
                                </Form.Select>
                            </InputGroup>
                        </Col>
                    </Row>
                </div>
            </Collapse>

            <Row>
                <Col md={{ span: 11, offset: 1 }} sm={{ span: 12, offset: 0 }}>
                    <ListGroup>
                        {getFilteredTasks().map((item, index) => (
                            <div key={item.id}>
                                <ListGroup.Item
                                    variant="dark"
                                    className="plxg"
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span className="box1">
                                        {item.value}
                                    </span>
                                    <span className="box2">
                                        <Button
                                            style={{ marginRight: "10px" }}
                                            variant="light"
                                            onClick={() => deleteItem(item.id)}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            style={{ marginRight: "10px" }}
                                            variant="light"
                                            onClick={() => editItem(index)}
                                        >
                                            Edit
                                        </Button>
                                        <Form.Control
                                            type="date"
                                            style={{ marginRight: "10px", display: "inline-block", width: "auto" }}
                                            value={item.dueDate || ''}
                                            placeholder="Due Date"
                                            onChange={(e) => handleDueDateChange(index, e.target.value)}
                                        />
                                        <Form.Select
                                            style={{ display: "inline-block", width: "auto" }}
                                            value={item.status}
                                            onChange={(e) => setStatus(index, e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Finished">Finished</option>
                                        </Form.Select>
                                    </span>
                                </ListGroup.Item>
                                <p style={{ marginLeft: "15px" }}>
                                    <b>Added Date:</b> {item.taskAddedDate} | <b>Due Date:</b> {item.dueDate || "Not set"} | <b>Status:</b> {item.status}
                                </p>
                            </div>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default App;
