import { Col, Row } from "react-bootstrap";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import Product from "../components/Product.jsx";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";

const HomeScreen = () => {
  // Query hooks return an object with the query state
  // const { data: products, isLoading, error } = useGetProductsQuery();

  const { pageNumber, keyword } = useParams();
  // paginate products, data: products, currentPage, pages
  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyword,
  });

  return (
    <>
      {keyword ? (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      ) : (
        <ProductCarousel />
      )}

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

          {/* paginate page bar */}
          <Paginate
            pages={data.pages}
            currentPage={data.currentPage}
            keyword={keyword}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
