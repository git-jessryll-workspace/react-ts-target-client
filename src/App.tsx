import { Routes, Route } from "react-router-dom"
import { CreateGroupContent, GroupDetailsContent, GroupsContent, LandingContent, LoginContent, RegisterContent, TransactionContent, TransactionDetailsContent } from "./content"
import { useSelector } from "react-redux"
import { RouteElement } from "@/components";
import { RootState } from "@/store";
import { useEffect } from "react";
import axios from "axios";


function App() {
  const { user } = useSelector((state: RootState) => state.user);
  const { token } = user;
  useEffect(() => {
    axios.interceptors.request.use(config => {
      config.headers['Authorization'] = `Bearer ${token}`;
      return config;
    })
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingContent />} />
        <Route path="/login" element={<LoginContent />} />
        <Route path="/register" element={<RegisterContent />} />
        <Route path="/transactions" element={<RouteElement element={<TransactionContent />} isAuthenticated={!!token} />} />
        <Route path="/transactions/:id/details" element={<RouteElement element={<TransactionDetailsContent />} isAuthenticated={!!token} />} />
        <Route path="/teams" element={<RouteElement element={<GroupsContent />} isAuthenticated={!!token} />} />
        <Route path="/teams/:id/details" element={<RouteElement element={<GroupDetailsContent />} isAuthenticated={!!token} />} />
        <Route path="/create-team" element={<RouteElement element={<CreateGroupContent />} isAuthenticated={!!token} />} />
      </Routes>
    </>
  )
}

export default App
