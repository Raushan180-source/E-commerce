import { useEffect } from 'react'; 
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingCart } from 'lucide-react';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin; // check if user is logged in

  useEffect(() => {
    if (id) {
      dispatch(addToCart({ id, qty }));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      // User is logged in → go to shipping
      navigate('/shipping');
    } else {
      // User not logged in → go to login with redirect
      navigate('/login?redirect=shipping');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty{' '}
            <Link to="/" className="text-primary">
              Go Back
            </Link>
          </Message>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.product}>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    <div className="md:col-span-1">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-20 object-cover rounded"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-lg font-medium hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="md:col-span-1">
                      <span className="text-lg font-bold">${item.price}</span>
                    </div>
                    <div className="md:col-span-1">
                      <Select
                        value={item.qty.toString()}
                        onValueChange={(value) =>
                          dispatch(addToCart({ id: item.product, qty: Number(value) }))
                        }
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <SelectItem key={x + 1} value={(x + 1).toString()}>
                              {x + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-1">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>
                  ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </span>
              </div>
              <Button
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
                className="w-full"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Proceed To Checkout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CartScreen;
