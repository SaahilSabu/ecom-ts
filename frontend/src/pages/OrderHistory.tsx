import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import { useGetOrderHistoryQuery } from "../hooks/orderHook"
import { ApiError } from "../types/ApiError"
import { getError } from "../utils"

export default function OrderHistory() {
    const navigate = useNavigate()
    const { data: orders, isLoading, error } = useGetOrderHistoryQuery()

    return (
      <div>
        <Helmet>
          <title>Order History</title>
        </Helmet>

        <h1>Order History</h1>
        {isLoading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
        ) : (
            <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">DATE</th>
                <th className="py-2 px-4 border-b">TOTAL</th>
                <th className="py-2 px-4 border-b">PAID</th>
                <th className="py-2 px-4 border-b">DELIVERED</th>
                <th className="py-2 px-4 border-b">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders!.map((order) => (
                <tr key={order._id}>
                  <td className="py-2 px-4 border-b">{order._id}</td>
                  <td className="py-2 px-4 border-b">{order.createdAt.substring(0, 10)}</td>
                  <td className="py-2 px-4 border-b">{order.totalPrice.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                  <td className="py-2 px-4 border-b">{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      type="button"
                      onClick={() => {
                        navigate(`/order/${order._id}`)
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>          
        )}
      </div>
    )
  }

