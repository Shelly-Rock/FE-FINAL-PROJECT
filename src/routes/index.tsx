import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "@/core/layout/Layout";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>Dashboard</div>} />
        <Route path="*" element={<div>Page not found</div>} />
      </Route>
    </Routes>
  );
};
