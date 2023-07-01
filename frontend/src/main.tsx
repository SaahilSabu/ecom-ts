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
import { StoreProvider } from "./Store.tsx";
import App from "./App.tsx";


const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path="product/:slug" element={<ProductPage />} />
    </Route>
  )
);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        {/* @ts-ignore */}
        <RouterProvider router={router}>
          <ReactQueryDevtools initialIsOpen={false} />
        </RouterProvider>
      </QueryClientProvider>
    </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);
