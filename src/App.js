import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRouter from "./router";

import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCart } from "./redux/slices/cart";

function App() {
  const token = localStorage.getItem('token')
  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(getCart());
  },[token, dispatcher])
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
