import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import GuestRoute from "./component/GuestRoute";
import MenuBar from "./component/MenuBar";
import ProtectedRoute from "./component/ProtectedRoute";
import { isAuthenticated } from "./utils/auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BuyPage from "./pages/BuyPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import BrowseBooks from "./pages/BrowseBooks";
import BookDetails from "./pages/BookDetails";
import PreOrder from "./pages/PreOrder";
import CategoryPage from "./pages/CategoryPage";

function App() {
  const location = useLocation();
  const authenticated = isAuthenticated();

  const hideMenuBar =
    !authenticated ||
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="app-root">
      {!hideMenuBar && <MenuBar />}

      <main className={`app-shell ${hideMenuBar ? "app-shell-auth" : "app-shell-app"}`}>
        <Routes>
          <Route
            path="/"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <BrowseBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books/:id"
            element={
              <ProtectedRoute>
                <BookDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/:categoryName"
            element={
              <ProtectedRoute>
                <CategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pre-order/:bookId"
            element={
              <ProtectedRoute>
                <PreOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/PreOrder"
            element={<Navigate to="/books" replace />}
          />
          <Route
            path="/buy/:bookId"
            element={
              <ProtectedRoute>
                <BuyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
