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
import NavBar from "./docs/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStar, faEdit } from "@fortawesome/free-solid-svg-icons";
import { AiOutlinePlus } from "react-icons/ai";
import todolist from "./docs/todolist.css";

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

const PersonalPage = () => {
  const [user, setUser] = useState(null);
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [starredTodos, setStarredTodos] = useState([]);
  const [deletedTodos, setDeletedTodos] = useState([]);

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
        setCompletedTodos(todos.filter((todo) => todo.completed === true));
        setStarredTodos(newTodos.filter((todo) => todo.starred === true));
        setDeletedTodos(newTodos.filter((todo) => todo.deleted === true));
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const handleNewTodo = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = async () => {
    if (newTodo.trim() !== "") {
      try {
        const docRef = await addDoc(
          collection(firestore, "users", user.email, "todos"),
          {
            text: newTodo,
            createdAt: new Date(),
            completed: false,
            starred: false,
            deleted: false,
          }
        );
        setNewTodo("");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const handleDeleteTodo = async (todo) => {
    try {
      await deleteDoc(doc(firestore, "users", user.email, "todos", todo.id));
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const handleCompleteTodo = async (todo) => {
    try {
      await updateDoc(doc(firestore, "users", user.email, "todos", todo.id), {
        completed: !todo.completed,
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleStarTodo = async (todo) => {
    try {
      await updateDoc(doc(firestore, "users", user.email, "todos", todo.id), {
        starred: !todo.starred,
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleDeleteAllCompletedTodos = async () => {
    try {
      const batch = firestore.batch();
      completedTodos.forEach((todo) => {
        batch.delete(doc(firestore, "users", user.email, "todos", todo.id));
      });
      await batch.commit();
    } catch (error) {
      console.error("Error removing documents: ", error);
    }
  };

  const handleDeleteAllDeletedTodos = async () => {
    try {
      const batch = firestore.batch();
      deletedTodos.forEach((todo) => {
        batch.delete(doc(firestore, "users", user.email, "todos", todo.id));
      });
      await batch.commit();
    } catch (error) {
      console.error("Error removing documents: ", error);
    }
  };

  return (
   <>hello world</>
  )
};
export default PersonalPage;
