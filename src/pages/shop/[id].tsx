import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Breadcrumbs from "../../components/Breadcrumbs";
import FeaturedProducts from "../../components/FeaturedProducts";
import { ProductInterface } from "../../components/Product";

interface Props {
  productData: ProductInterface;
  featuredProducts: ProductInterface[];
}

const ShopDetail: NextPage<Props> = ({ productData, featuredProducts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Head>
        <title>{productData.title}</title>
      </Head>

      <Breadcrumbs title={productData.title} />

      <section className="product-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="product__details__pic">
                <div className="product__details__pic__item">
                  <img
                    className="product__details__pic__item--large"
                    src={`/img/products/${productData.filename}`}
                    alt="image"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="product__details__text">
                <h3>{productData.title}</h3>
                <div className="product__details__price">${productData.price}</div>
                <p>{productData.description}</p>
                <ul>
                  <li>
                    <b>Type</b> <span>{productData.type}</span>
                  </li>
                  <li>
                    <b>Size</b> <span>{productData.size}</span>
                  </li>
                  <li>
                    <b>Share on</b>
                    <div className="share">
                      <a href="#">
                        <i className="fab fa-facebook"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="#">
                        <i className="fab fa-pinterest"></i>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="product__details__tab">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#tabs-1"
                      role="tab"
                      aria-selected="true"
                    >
                      Description
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <div className="product__details__tab__desc">
                      <h6>Products Infomation</h6>
                      <p>{productData.information}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts featuredProducts={featuredProducts} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://localhost:5001/products?_limit=10");
  const products: ProductInterface[] = await res.json();

  const paths = products.map(p => ({
    params: {
      id: p.id,
    },
  }));

  return {
    paths,
    fallback: true,
    // fallback - true => other routes other than these 10 above will not result in 404 page - getStaticProps will try to create them when you access them
  };
};

// we can access the params returned from getStaticPaths above
// params has the product id
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // if the params or params.id do exist - return the page props

  if (params && params.id) {
    const res = await fetch(`http://localhost:5001/products/${params.id}`);
    const productData = await res.json();

    // console.log(productData);
    // console.log("HAS ITEMS ", Object.keys(productData).length > 0);
    // console.log("HAS NO ITEMS ", Object.keys(productData).length === 0);

    // if the product above has no items -> that means that product like that doesn't exist
    // /shop/2 -> does not exist
    if (Object.keys(productData).length === 0) {
      // return 404 page in that case
      return { notFound: true };
    }

    const resProducts = await fetch("http://localhost:5001/products?_start=1&_limit=4");
    const featuredProducts = await resProducts.json();

    // the product exists -> return data for it
    return {
      props: {
        productData,
        featuredProducts,
      },
    };
  }

  // if the params or params.id do not exist - return 404 page
  return {
    notFound: true,
  };
};

export default ShopDetail;
