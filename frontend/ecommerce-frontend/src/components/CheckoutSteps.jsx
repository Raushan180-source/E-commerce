import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex justify-center mb-8">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          {step1 ? (
            <Link to="/login">
              <Badge variant="default">Sign In</Badge>
            </Link>
          ) : (
            <Badge variant="secondary">Sign In</Badge>
          )}
        </div>

        <div className="w-8 h-px bg-border"></div>

        <div className="flex items-center">
          {step2 ? (
            <Link to="/shipping">
              <Badge variant="default">Shipping</Badge>
            </Link>
          ) : (
            <Badge variant="secondary">Shipping</Badge>
          )}
        </div>

        <div className="w-8 h-px bg-border"></div>

        <div className="flex items-center">
          {step3 ? (
            <Link to="/payment">
              <Badge variant="default">Payment</Badge>
            </Link>
          ) : (
            <Badge variant="secondary">Payment</Badge>
          )}
        </div>

        <div className="w-8 h-px bg-border"></div>

        <div className="flex items-center">
          {step4 ? (
            <Badge variant="default">Place Order</Badge>
          ) : (
            <Badge variant="secondary">Place Order</Badge>
          )}
        </div>
      </div>
    </nav>
  );
};

export default CheckoutSteps;
