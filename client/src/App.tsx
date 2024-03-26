import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loading from "./components/loader/Loading";
import Signin from "./pages/Signin";
import AppProvider from "./context/Context";
import { SidebarData } from "./constants/Sidebar";
import GlobalLayout from "./components/dashboard/GlobalLayout";
import { UserOptions } from "./constants/Users";
import WrongUrl from "./pages/WrongUrl";
import Divorce from "./components/pdf/divorce";

function App() {
  return (
    <>
      <AppProvider>
        <Router />
      </AppProvider>
    </>
  );
}

function Router() {
  // const { user: currentUser } = React.useContext(AppContext);
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/sign-in" element={<Signin />} />
          
            <Route path="/wrong-url" element={<WrongUrl />} />
            <Route path="/dashboard/pdf" element={<Divorce/>}/>

            {SidebarData.map((item, index) => {
              // if (item.title === "Users" && currentUser.role !== "admin")
              //   return null;
              return (
                <Route
                  key={index}
                  path={item.path}
                  element={
                    <GlobalLayout>
                      <item.Element />
                    </GlobalLayout>
                  }
                />
              );
            })}

            {UserOptions.map((item, index) => {
              return (
                <Route
                  key={index}
                  path={item.path}
                  element={
                    <GlobalLayout>
                      <item.Element />
                    </GlobalLayout>
                  }
                />
              );
            })}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
