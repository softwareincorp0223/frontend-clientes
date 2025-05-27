import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Prospectos from "views/Prospectos.js";
import Clientes from "views/Clientes.js";
import Index from "views/Index.js";
import { AuthProvider } from "context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* add routes with layouts */}
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/auth/*" element={<Auth />} />
          
          {/* add routes without layouts */}
          <Route path="/landing" element={<Landing />} />
          <Route path="/prospectos" element={<Prospectos />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth/*" element={<Navigate to="/auth/login" replace />} />
          
          {/* catch-all redirect */}
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
