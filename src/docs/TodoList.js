import React, { useState, useEffect } from "react";
  
import {
  Container,
  Row,
  Col,
  Input,
  InputGroup,
  Button,
  ListGroup,
  ListGroupItem,
  Badge,
} from "reactstrap";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import NavBar from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStar, faEdit } from "@fortawesome/free-solid-svg-icons";
import { AiOutlinePlus } from "react-icons/ai"; 
import todolist from "./todolist.css";

const firebaseConfig = {
  apiKey: "AIzaSyBkapxEwhLRDpETdBPOVkWrvfmx3aLj4bQ",
  authDomain: "fir-react-app-a024a.firebaseapp.com",
  projectId: "fir-react-app-a024a",
  storageBucket: "fir-react-app-a024a.appspot.com",
  messagingSenderId: "1074738748573",
  appId: "1:1074738748573:web:bf9abce6b6d22a5b5a0874",
  measurementId: "G-JHTGZJW9SL",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const TodoList = () => {
  const [user, setUser] = useState(null);
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(firestore, "users", user.email, "todos"),
        orderBy("createdAt", "desc")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newTodos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(newTodos);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [firestore, user]);

  const handleLogin = () => {
    // Login işlemleri
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleAddTodo = async () => {
    if (newTodo.trim() === "") {
      return;
    }

    try {
      if (user) {
        const collectionRef = collection(
          firestore,
          "users",
          user.email,
          "todos"
        );
        const todo = {
          text: newTodo,
          isCompleted: false,
          createdAt: new Date(),
        };
        const docRef = await addDoc(collectionRef, todo);
        const newTodoItem = { id: docRef.id, ...todo }; // Yeni todo dökümanının id'sini de içeren bir nesne oluştur
        setTodos([newTodoItem, ...todos]); // Yeni todo'yu listenin başına ekle
        setNewTodo("");
        console.log("Todo added successfully");
      } else {
        console.log("You need to login to add a todo");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      if (user) {
        const todoRef = doc(firestore, "users", user.email, "todos", todoId);
        await deleteDoc(todoRef);
        console.log("Todo deleted successfully");
      } else {
        console.log("You need to login to delete a todo");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteTodo = async (todoId, isCompleted) => {
    try {
      if (user) {
        const todoRef = doc(firestore, "users", user.email, "todos", todoId);
        await updateDoc(todoRef, { isCompleted: !isCompleted });
        console.log("Todo updated successfully");
      } else {
        console.log("You need to login to complete a todo");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleStarTodo = async (todoId, isStarred) => {
    try {
      if (user) {
        const todoRef = doc(firestore, "users", user.email, "todos", todoId);
        await updateDoc(todoRef, { isStarred: !isStarred });
        console.log("Todo updated successfully");
      } else {
        console.log("You need to login to star a todo");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTodo = async (todoId, newText) => {
    try {
      if (user) {
        const todoRef = doc(firestore, "users", user.email, "todos", todoId);
        await updateDoc(todoRef, { text: newText });
        console.log("Todo updated successfully");
        const updatedTodos = todos.map((todo) => {
          if (todo.id === todoId) {
            return { ...todo, text: newText };
          }
          return todo;
        });
        setTodos(updatedTodos);
      } else {
        console.log("You need to login to edit a todo");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavBar
        user={user}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />

      <Container className="mt-5">
        <Row>
          <Col md={{ size: 6, offset: 3 }}>
          <InputGroup>
      <Input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo"
      />
      <Button color="primary" onClick={handleAddTodo}>
        <AiOutlinePlus /> 
      </Button>
    </InputGroup>

            <div
              style={{
                maxHeight: "500px",
                overflowY: "scroll",
                marginTop: "10px",
              }}
            >
              <ListGroup className="mt-5">
                {todos.map((todo) => (
                  <ListGroupItem key={todo.id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <Button
                          size="sm"
                          color={todo.isCompleted ? "success" : "danger"}
                          className="mr-2"
                          onClick={() =>
                            handleCompleteTodo(todo.id, todo.isCompleted)
                          }
                          style={{
                            fontSize:"12px",
                            width: "80px",
                            height: "20px",
                            borderRadius: "15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {todo.isCompleted ? "Completed" : "Incomplete"}
                        </Button>
                        <span
                          style={{
                            display: "inline-block",
                            width: "90%",
                            whiteSpace: "pre-wrap",
                            wordWrap: "break-word",
                            margin: "10px 0",
                            marginLeft: "60px",
                            textDecoration: todo.isCompleted
                              ? "line-through"
                              : "none",
                            color: todo.isCompleted ? "grey" : "inherit",
                          }}
                        >
                          {todo.text
                            .split("")
                            .map((char, index) => {
                              return index % 50 === 0 && index !== 0
                                ? "-\n" + char
                                : char;
                            })
                            .join("")}
                        </span>
                      </div>
                      <div className="d-flex">
                        <FontAwesomeIcon
                          id="my-icon"
                          icon={faStar}
                          style={{ fontSize: 20 }}
                          className={`mr-2 ${
                            todo.isStarred ? "text-warning" : "text-muted"
                          }`}
                          onClick={() =>
                            handleStarTodo(todo.id, todo.isStarred)
                          }
                        />
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="mr-2 edit"
                          style={{ fontSize: 20, marginLeft: "10px" }}
                          color="orange"
                          onClick={() => {
                            const newText = prompt("Edit Todo", todo.text);
                            if (newText !== null && newText !== todo.text) {
                              handleEditTodo(todo.id, newText);
                            }
                          }}
                        />

                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ fontSize: 20, marginLeft: "10px" }}
                          className="text-danger"
                          onClick={() => handleDeleteTodo(todo.id)}
                        />
                      </div>
                    </div>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TodoList;
