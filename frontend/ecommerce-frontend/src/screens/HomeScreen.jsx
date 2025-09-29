import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Product from '../components/Product';
import Loading from '../components/Loading';
import Message from '../components/Message';
import { listProducts } from '../slices/productSlice';

const HomeScreen = () => {
  const { keyword, pageNumber = 1 } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts({ keyword, pageNumber }));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div>
      {keyword && (
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </Link>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8">
        {keyword ? `Search Results for "${keyword}"` : 'Latest Products'}
      </h1>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="destructive">{error}</Message>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>

          {pages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              {page > 1 && (
                <Link
                  to={
                    keyword
                      ? `/search/${keyword}/page/${page - 1}`
                      : `/page/${page - 1}`
                  }
                >
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </Link>
              )}

              {[...Array(pages).keys()].map((x) => (
                <Link
                  key={x + 1}
                  to={
                    keyword
                      ? `/search/${keyword}/page/${x + 1}`
                      : `/page/${x + 1}`
                  }
                >
                  <Button
                    variant={x + 1 === page ? 'default' : 'outline'}
                    size="sm"
                  >
                    {x + 1}
                  </Button>
                </Link>
              ))}

              {page < pages && (
                <Link
                  to={
                    keyword
                      ? `/search/${keyword}/page/${page + 1}`
                      : `/page/${page + 1}`
                  }
                >
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomeScreen;
