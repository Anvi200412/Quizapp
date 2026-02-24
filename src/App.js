import { useState } from "react";
import Home from "./Pages/Home";
import Layout from "./Components/Layout";
import ModeToggle from "./Components/ModeToggle";
import "./index.css";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Layout darkMode={darkMode}>
      <ModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <Home />
    </Layout>
  );
}

export default App;
