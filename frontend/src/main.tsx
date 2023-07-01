import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index={true} element={<Home />} />
      <Route path="product/:slug" element={<ProductPage />} />
    </Route>
  )
);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
          <ReactQueryDevtools initialIsOpen={false} />
        </RouterProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
