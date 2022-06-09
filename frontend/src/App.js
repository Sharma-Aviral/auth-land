import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./Components/UI/Header/Header";
import Signin from "./Components/Auth/Signin/Signin";
import Signup from "./Components/Auth/Signup/Signup";
import Profile from "./Components/Profile/Profile";
import Phone from "./Components/Auth/verify/Phone/Phone";
import Email from "./Components/Auth/verify/email/Email";
import toast, { Toaster } from "react-hot-toast";

import { isEmpty } from "lodash";

import store from "store";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [signoutRedirect, setSignoutRedirect] = useState(false);

  useEffect(() => {
    if (store.get("user") && !isEmpty(store.get("user"))) {
      const user = store.get("user");
      const token = store.get("token");
      setCurrentUser(user);
      setToken(token);
      toast.success(`Welcome ${user.firstName}`);
    }
  }, []);

  const signout = () => {
    store.remove("user");
    store.remove("token");
    setCurrentUser(null);
    setToken(null);
    setSignoutRedirect(true);
    toast("Bye Bye ", {
      icon: "👋 ",
    });
  };

  return (
    <div className="App">
      <div>
        <Toaster />
      </div>
      <Router>
        <Header
          signoutRedirect={signoutRedirect}
          signout={signout}
          currentUser={currentUser}
        />
        <Routes>
          <Route
            path="signin"
            exact
            element={
              <Signin
                setToken={setToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              ></Signin>
            }
          ></Route>

          <Route
            path="signup"
            exact
            element={
              <Signup
                setToken={setToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              ></Signup>
            }
          ></Route>

          <Route
            path="/"
            exact
            element={
              <Profile
                setToken={setToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              ></Profile>
            }
          />

          <Route
            path="profile"
            exact
            element={
              <Profile
                setToken={setToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              ></Profile>
            }
          />

          <Route
            path="verify/phone"
            exact
            element={
              <Phone
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                token={token}
                setToken={setToken}
              ></Phone>
            }
          ></Route>

          <Route
            path="verify/email"
            exact
            element={
              <Email
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
                token={token}
                setToken={setToken}
              ></Email>
            }
          ></Route>
        </Routes>

        {/* <Layout>
            <Switch>
                <PrivateRoute path="/" exact component={Home} />

                <PrivateRoute path="/quotations" exact component={AllQuotations}/>
                <PrivateRoute path="/quotations/new" exact component={AddQuotation}/>
                <PrivateRoute path="/quotations/:id/edit" exact component={EditQuotation}/>

                <PrivateRoute path="/products" exact component={AllProducts} />
                <PrivateRoute path="/products/new" exact component={AddProduct} />
                <PrivateRoute path="/products/:id/edit" exact component={EditProduct} />
            </Switch>
        </Layout> */}
      </Router>
    </div>
  );
}

export default App;
