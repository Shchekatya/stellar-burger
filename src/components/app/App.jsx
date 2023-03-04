
import styles from "./app.module.css";
import { AppHeader } from "../app-header/AppHeader";


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register } from "../pages/register";
import { Reset } from "../pages/reset-password";
import { Login } from "../pages/login";
import { Page404 } from "../pages/404";
import { MainBurgers } from "../pages/main-burgers";





const App = () => {




  return (
    <div className={styles.app}>
      <header>
        <AppHeader />
      </header>
      <main>
   
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<MainBurgers />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="*" element={<Page404 />}/>
        <Route path="/reset-password" element={<Reset />}/>
        </Routes>
        </BrowserRouter>
      
      </main>
    </div>
  );
};

export default App;
