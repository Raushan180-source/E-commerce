import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { getOrderDetails, payOrder, resetOrderPay } from '../slices/orderSlice';

const OrderScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const orderState = useSelector((state) => state.order);
  const {
    orderDetails: order,
    orderDetailsLoading,
    orderDetailsError,
    payLoading,
    paySuccess,
  } = orderState;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!order || order._id !== id || paySuccess) {
      dispatch(resetOrderPay());
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id, order, paySuccess]);

  const successPaymentHandler = () => {
    const paymentResult = {
      id: 'SAMPLE_PAYMENT_ID',
      status: 'COMPLETED',
      update_time: new Date().toISOString(),
      payer: {
        email_address: userInfo?.email,
      },
    };
    dispatch(payOrder({ orderId: id, paymentResult }));
  };

  // Safe access defaults
  const orderItems = order?.orderItems || [];
  const shippingAddress = order?.shippingAddress || {};
  const user = order?.user || {};
  const itemsPrice = order?.itemsPrice ?? 0;
  const shippingPrice = order?.shippingPrice ?? 0;
  const taxPrice = order?.taxPrice ?? 0;
  const totalPrice = order?.totalPrice ?? 0;

  if (orderDetailsLoading) return <Loading />;
  if (orderDetailsError) return <Message variant="destructive">{orderDetailsError}</Message>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Order {order?._id}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Name: </strong> {user?.name || 'N/A'}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${user?.email}`} className="text-primary">
                  {user?.email || 'N/A'}
                </a>
              </p>
              <p>
                <strong>Address: </strong>
                {shippingAddress?.address || ''}, {shippingAddress?.city || ''}{' '}
                {shippingAddress?.postalCode || ''}, {shippingAddress?.country || ''}
              </p>
              {order?.isDelivered ? (
                <Message variant="success">Delivered on {order.deliveredAt}</Message>
              ) : (
                <Message variant="destructive">Not Delivered</Message>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Method: </strong> {order?.paymentMethod || 'N/A'}
              </p>
              {order?.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="destructive">Not Paid</Message>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              {orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <div className="space-y-4">
                  {orderItems.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center space-x-4">
                        <img
                          src={item?.image || ''}
                          alt={item?.name || ''}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <Link
                            to={`/product/${item?.product || ''}`}
                            className="text-primary hover:underline"
                          >
                            {item?.name || 'Unnamed Item'}
                          </Link>
                        </div>
                        <div>
                          {item?.qty || 0} x ${item?.price || 0} = $
                          {(item?.qty || 0) * (item?.price || 0)}
                        </div>
                      </div>
                      {index < orderItems.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>${itemsPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shippingPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${taxPrice}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
                {!order?.isPaid && (
                  <div>
                    {payLoading && <Loading />}
                    <Button onClick={successPaymentHandler} className="w-full">
                      Pay Now (Demo)
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
