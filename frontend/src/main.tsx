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
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import App from "./App.tsx";
import Bag from "./pages/Cart.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Shipping from "./pages/Shipping.tsx";
import PaymentMethod from "./pages/PaymentMethod.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import PlaceOrder from "./pages/PlaceOrder.tsx";
import Order from "./pages/Order.tsx";
import OrderHistory from "./pages/OrderHistory.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path="product/:slug" element={<ProductPage />} />
      <Route path="cart" element={<Bag />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
      </Route>
    </Route>
  )
);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
    <PayPalScriptProvider
      options={{ clientId: 'sb' }}
      deferLoading={true}
    >
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          {/* @ts-ignore */}
          <RouterProvider router={router}>
            <ReactQueryDevtools initialIsOpen={false} />
          </RouterProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </PayPalScriptProvider>
    </StoreProvider>
  </React.StrictMode>
);
