import { useEffect} from 'react'
import { useGetOrderDetailsQuery, useGetPaypalClientIdQuery, usePayOrderMutation } from '../hooks/orderHook'
import { Link, useParams } from 'react-router-dom'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { Helmet } from 'react-helmet-async'
import { getError } from '../utils'
import { ApiError } from '../types/ApiError'
import { PayPalButtons, PayPalButtonsComponentProps, SCRIPT_LOADING_STATE, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { toast } from "react-toastify";


const Order = () => {

    const params = useParams()
    const { id: orderId } = params

    const {
      data: order,
      isLoading,
      error,
      refetch
    } = useGetOrderDetailsQuery(orderId!)

    const testPayHandler = async () => {
      await payOrder({ orderId: orderId! })
      refetch()
      toast.success('Order is paid')
    }
    const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
      style: { layout: 'vertical' },
      createOrder(_, actions) {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: {
                  value: order!.totalPrice.toString(),
                },
              },
            ],
          })
          .then((orderID: string) => {
            return orderID
          })
      },
      onApprove(_, actions) {
        return actions.order!.capture().then(async (details) => {
          try {
            await payOrder({ orderId: orderId!, ...details })
            refetch()
            toast.success('Order is paid')
          } catch (err) {
            toast.error(getError(err as ApiError))
          }
        })
      },
      onError: (err) => {
        toast.error(getError(err as ApiError))
      },
    }
    const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer()
    const { data: paypalConfig } = useGetPaypalClientIdQuery()

    useEffect(() => {
      if (paypalConfig && paypalConfig.clientId) {
        const loadPaypalScript = async () => {
          paypalDispatch({
            type: 'resetOptions',
            value: {
              clientId: paypalConfig!.clientId,
              currency: 'USD',
            },
          })
          paypalDispatch({
            type: 'setLoadingStatus',
            value: SCRIPT_LOADING_STATE.PENDING,
          })
        }
        loadPaypalScript()
      }
    }, [paypalConfig])
    const { mutateAsync: payOrder, isLoading: loadingPay } = usePayOrderMutation()

    return isLoading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
    ) : !order ? (
      <MessageBox variant="danger">Order Not Found</MessageBox>
    ) : (
      <div>
        <Helmet>
          <title>Order {orderId}</title>
        </Helmet>
        <h1 className="my-3">Order {orderId}</h1>
        <div className="flex flex-wrap">
  <div className="w-full md:w-8/12">
    <div className="mb-3">
      <div className="bg-white rounded shadow-sm p-4">
        <h4 className="text-xl font-bold">Shipping</h4>
        <p>
          <strong>Name:</strong> {order!.shippingAddress.fullName} <br />
          <strong>Address: </strong> {order.shippingAddress.address},
          {order.shippingAddress.city}, {order.shippingAddress.postalCode},
          {order.shippingAddress.country}
          &nbsp;
          {/* {order.shippingAddress.location &&
            order.shippingAddress.location.lat && (
              <a
                target="_new"
                href={`https://maps.google.com?q=${order.shippingAddress.location.lat},${order.shippingAddress.location.lng}`}
                className="text-blue-500"
              >
                Show On Map
              </a>
            )} */}
        </p>
        {order.isDelivered ? (
          <div className="bg-green-100 text-green-700 p-2 rounded">
            Delivered at {order.deliveredAt}
          </div>
        ) : (
          <div className="bg-yellow-100 text-yellow-700 p-2 rounded">
            Not Delivered
          </div>
        )}
      </div>
    </div>
    <div className="mb-3">
      <div className="bg-white rounded shadow-sm p-4">
        <h4 className="text-xl font-bold">Payment</h4>
        <p>
          <strong>Method:</strong> {order.paymentMethod}
        </p>
        {order.isPaid ? (
          <div className="bg-green-100 text-green-700 p-2 rounded">
            Paid at {order.paidAt}
          </div>
        ) : (
          <div className="bg-yellow-100 text-yellow-700 p-2 rounded">
            Not Paid
          </div>
        )}
      </div>
    </div>
    <div className="mb-3">
      <div className="bg-white rounded shadow-sm p-4">
        <h4 className="text-xl font-bold">Items</h4>
        <ul className="list-none">
          {order.orderItems.map((item) => (
            <li key={item._id} className="flex items-center mb-2">
              <div className="w-1/2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-auto rounded"
                />
                <Link to={`/product/${item.slug}`} className="text-blue-500">
                  {item.name}
                </Link>
              </div>
              <div className="w-1/4">{item.quantity}</div>
              <div className="w-1/4">${item.price}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  <div className="w-full md:w-4/12">
    <div className="mb-3">
      <div className="bg-white rounded shadow-sm p-4">
        <h4 className="text-xl font-bold">Order Summary</h4>
        <ul className="list-none">
          <li className="flex justify-between mb-2">
            <span>Items</span>
            <span>${order.itemsPrice.toFixed(2)}</span>
          </li>
          <li className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>${order.shippingPrice.toFixed(2)}</span>
          </li>
<li className="flex justify-between mb-2">
            <span>Tax</span>
            <span>${order.taxPrice.toFixed(2)}</span>
          </li>
          <li className="flex justify-between mb-2">
            <span>
              <strong>Order Total</strong>
            </span>
            <span>
              <strong>${order.totalPrice.toFixed(2)}</strong>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
      {!order.isPaid && (
          <div className="border border-gray-300 rounded p-4">
          {isPending ? (
            <LoadingBox />
          ) : isRejected ? (
            <MessageBox variant="danger">Error in connecting to PayPal</MessageBox>
          ) : (
            <div>
              <PayPalButtons {...paypalbuttonTransactionProps}></PayPalButtons>
              <button onClick={testPayHandler} className="mt-2">Test Pay</button>
            </div>
          )}
          {loadingPay && <LoadingBox></LoadingBox>}
        </div>
        
          )}

      </div>
    )
  }

export default Order