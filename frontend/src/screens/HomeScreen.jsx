import { Col, Row } from "react-bootstrap";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import Product from "../components/Product.jsx";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import { useParams } from "react-router-dom";

const HomeScreen = () => {
  // Query hooks return an object with the query state
  // const { data: products, isLoading, error } = useGetProductsQuery();

  const { pageNumber } = useParams();
  
  // paginate products, data: products, currentPage, pages
  const { data, isLoading, error } = useGetProductsQuery(pageNumber);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Lastes Products</h1>

          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
