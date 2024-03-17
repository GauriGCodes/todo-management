import './App.css'
import ListTodosComponent from './components/ListTodosComponent';
import AddUpdateTodoComponent from './components/AddUpdateTodoComponent';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthenticatedRoute from './components/AuthenticatedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LoginComponent />}></Route>
          <Route path="/todos" element={
          <AuthenticatedRoute>
          <ListTodosComponent />
          </AuthenticatedRoute>
          }></Route>
          <Route path="/add-todo" element={
           <AuthenticatedRoute>
          <AddUpdateTodoComponent />
          </AuthenticatedRoute>
          }></Route>
          <Route path="/update-todo/:id" element={
           <AuthenticatedRoute>
          <AddUpdateTodoComponent />
          </AuthenticatedRoute>
          }></Route>
          <Route path="/register" element={<RegisterComponent />}></Route>
          <Route path="/login" element={<LoginComponent />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
