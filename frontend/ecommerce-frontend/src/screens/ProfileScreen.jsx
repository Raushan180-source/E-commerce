import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { updateUserProfile, resetUserUpdate } from '../slices/userSlice';
import { listMyOrders } from '../slices/orderSlice';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, updateLoading, updateError, updateSuccess } = userLogin;

  const order = useSelector((state) => state.order);
  const { myOrders, myOrdersLoading, myOrdersError } = order;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (updateSuccess) {
        setMessage('Profile Updated Successfully');
        dispatch(resetUserUpdate());
      }
      setName(userInfo.name);
      setEmail(userInfo.email);
      dispatch(listMyOrders());
    }
  }, [dispatch, navigate, userInfo, updateSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: userInfo._id, name, email, password }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">User Profile</TabsTrigger>
          <TabsTrigger value="orders">My Orders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
            </CardHeader>
            <CardContent>
              {message && <Message variant="success">{message}</Message>}
              {updateError && <Message variant="destructive">{updateError}</Message>}
              {updateLoading && <Loading />}
              <form onSubmit={submitHandler} className="space-y-4 max-w-md">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={updateLoading}>
                  Update
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>My Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {myOrdersLoading ? (
                <Loading />
              ) : myOrdersError ? (
                <Message variant="destructive">{myOrdersError}</Message>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">ID</th>
                        <th className="text-left p-2">DATE</th>
                        <th className="text-left p-2">TOTAL</th>
                        <th className="text-left p-2">PAID</th>
                        <th className="text-left p-2">DELIVERED</th>
                        <th className="text-left p-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {myOrders.map((order) => (
                        <tr key={order._id} className="border-b">
                          <td className="p-2">{order._id}</td>
                          <td className="p-2">{order.createdAt.substring(0, 10)}</td>
                          <td className="p-2">${order.totalPrice}</td>
                          <td className="p-2">
                            {order.isPaid ? (
                              order.paidAt.substring(0, 10)
                            ) : (
                              <span className="text-red-500">✗</span>
                            )}
                          </td>
                          <td className="p-2">
                            {order.isDelivered ? (
                              order.deliveredAt.substring(0, 10)
                            ) : (
                              <span className="text-red-500">✗</span>
                            )}
                          </td>
                          <td className="p-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/order/${order._id}`)}
                            >
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileScreen;
