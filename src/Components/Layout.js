import { useEffect } from "react";

function Layout({ children, darkMode }) {

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return <>{children}</>;
}

export default Layout;
