/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import GameDetails from "./pages/GameDetails";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./lib/auth";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:id" element={<GameDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}


