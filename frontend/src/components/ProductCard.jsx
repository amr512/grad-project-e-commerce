import PropTypes from "prop-types";
import "./styles/ProductCard.css";
import { API_URL } from "../helpers/constants";
import formatCurrency from "../helpers/formatCurrency";
import {
  Button,
  Card,
  CardHeader,
  Input,
  Image,
  Heading,
  StepSeparator,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
export default function ProductCard({ product }) {
  return (
    <div>
      <Card className="product-card">
        <CardBody>
          <Heading size={"md"}>{product.name}</Heading>
          <Image
            className="product-list__image"
            src={product.images[0]}
            alt={product.name}
            dropShadow={"2xl"}
          />
          <div className="product-list__details">
            <p>{product.description}</p>
            <p>
              Price:{" "}
              {formatCurrency(
                product.price.value / 100,
                product.price.currency
              )}
            </p>
          </div>

          <form
            action={`${API_URL}/create-checkout-session/?price_id=${product.default_price}&product_id=${product.id}&quantity=1`}
            method="POST"
            >
            <div className="flex-row">
              <Input type="hidden" name="product_id" value={product.id} />
              <Input
                type="hidden"
                name="price_id"
                value={product.default_price}
                />
              <Input type="number" name="quantity" defaultValue={1} />
              <Button type="submit">Buy</Button>
            </div>
          </form>
                </CardBody>
      </Card>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    default_price: PropTypes.string.isRequired,
    price: PropTypes.shape({
      value: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
    }).isRequired,
    images: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
