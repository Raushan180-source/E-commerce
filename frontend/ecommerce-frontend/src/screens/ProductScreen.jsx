import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, Star, ShoppingCart } from 'lucide-react';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { listProductDetails, createProductReview, resetProductReview } from '../slices/productDetailsSlice';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product, reviewLoading, reviewError, reviewSuccess } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (reviewSuccess) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch(resetProductReview());
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, reviewSuccess]);

  const addToCartHandler = () => {
    dispatch(addToCart({ id, qty: Number(qty) }));
    navigate('/cart');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview({
        productId: id,
        review: {
          rating,
          comment,
        },
      })
    );
  };

  return (
    <div>
      <Link to="/">
        <Button variant="outline" className="mb-6">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </Link>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="destructive">{error}</Message>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product Image */}
          <div className="lg:col-span-1">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Product Info */}
          <div className="lg:col-span-1">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-muted-foreground">
                {product.numReviews} reviews
              </span>
            </div>

            <p className="text-3xl font-bold text-primary mb-4">
              ${product.price}
            </p>

            <p className="text-muted-foreground mb-6">
              {product.description}
            </p>

            <div className="space-y-2">
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p>
                <strong>Status:</strong>{' '}
                {product.countInStock > 0 ? (
                  <Badge variant="secondary">In Stock</Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </p>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-bold">${product.price}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  {product.countInStock > 0 && (
                    <div className="flex justify-between items-center">
                      <span>Qty:</span>
                      <Select value={qty.toString()} onValueChange={(value) => setQty(Number(value))}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <SelectItem key={x + 1} value={(x + 1).toString()}>
                              {x + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <Button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className="w-full"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add To Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews */}
          <div className="lg:col-span-3 mt-8">
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>
            
            {product.reviews.length === 0 && (
              <Message>No Reviews</Message>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                {product.reviews.map((review) => (
                  <Card key={review._id} className="mb-4">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <strong>{review.name}</strong>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {review.createdAt?.substring(0, 10)}
                      </p>
                      <p>{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Write a Customer Review</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {reviewError && (
                      <Message variant="destructive">{reviewError}</Message>
                    )}
                    {userInfo ? (
                      <form onSubmit={submitHandler} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Rating
                          </label>
                          <Select value={rating.toString()} onValueChange={(value) => setRating(Number(value))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 - Poor</SelectItem>
                              <SelectItem value="2">2 - Fair</SelectItem>
                              <SelectItem value="3">3 - Good</SelectItem>
                              <SelectItem value="4">4 - Very Good</SelectItem>
                              <SelectItem value="5">5 - Excellent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Comment
                          </label>
                          <Textarea
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </div>
                        <Button type="submit" disabled={reviewLoading}>
                          Submit
                        </Button>
                      </form>
                    ) : (
                      <Message>
                        Please <Link to="/login" className="text-primary">sign in</Link> to write a review
                      </Message>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
