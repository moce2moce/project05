import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Filters, { ProductFilterInterface } from "../../components/Filters";
import Product, { ProductInterface } from "../../components/Product";

interface Props {
  products: ProductInterface[];
  productCategories: ProductFilterInterface[];
  productSizes: ProductFilterInterface[];
}

const Shop: NextPage<Props> = ({ products, productCategories, productSizes }) => {
  const router = useRouter();
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // console.log("ROUTER CHANGED");
    // if there are filters in the url => only then we want to scroll to the results
    if (Object.keys(router.query).length > 0) {
      // console.log("THERE ARE FILTERS -> SCROLL TO RESULTS");

      // console.log(resultsRef.current)

      window.scrollTo({
        top: resultsRef.current?.offsetTop,
      });
    }
  }, [router, resultsRef]);

  return (
    <div>
      <Head>
        <title>Shop</title>
      </Head>

      <Breadcrumbs title="Shop" />

      <section className="product spad" ref={resultsRef}>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-5">
              <Filters productCategories={productCategories} productSizes={productSizes} />
            </div>
            <div className="col-lg-9 col-md-7">
              <div className="row">
                {products.length > 0 ? (
                  products.map(p => <Product key={p.id} productData={p} />)
                ) : (
                  <p>There are no products based on your filter.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// BEFORE FILTERING
// export const getStaticProps: GetStaticProps = async () => {
//   const resProducts = await fetch("http://localhost:5001/products");
//   const products = await resProducts.json();

//   const resCategories = await fetch("http://localhost:5001/productCategories");
//   const productCategories = await resCategories.json();

//   const resSizes = await fetch("http://localhost:5001/productSizes");
//   const productSizes = await resSizes.json();

//   return {
//     props: {
//       products,
//       productCategories,
//       productSizes,
//     },
//   };
// };

// AFTER FILTERING
// we can access the query from the url that we set with the filters here in this function
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const resCategories = await fetch("http://localhost:5001/productCategories");
  const productCategories = await resCategories.json();

  const resSizes = await fetch("http://localhost:5001/productSizes");
  const productSizes = await resSizes.json();

  const category = query.category,
    size = query.size;

  let res;
  let products: ProductInterface[];

  // filter by type - add like_
  // http://localhost:5001/products?type_like=fruit

  // filter by size - add like_
  // http://localhost:5001/products?size_like=large

  // filter by size & type
  // http://localhost:5001/products?size_like=large&type_like=fruit

  // example 1
  // if (category && size) {
  //   res = await fetch(`http://localhost:5001/products?size_like=${size}&type_like=${category}`);
  // } else if (category) {
  //   res = await fetch(`http://localhost:5001/products?type_like=${category}`);
  // } else if (size) {
  //   res = await fetch(`http://localhost:5001/products?size_like=${size}`);
  // } else {
  //   res = await fetch("http://localhost:5001/products");
  // }

  // example 2
  //   console.log(`
  //   http://localhost:5001/products?${size ? `&size_like=${size}` : ""}${
  //     category ? `&type_like=${category}` : ""
  //   }
  // `);

  res = await fetch(`
    http://localhost:5001/products?${size ? `&size_like=${size}` : ""}${
    category ? `&type_like=${category}` : ""
  }
  `);

  products = await res.json();

  return {
    props: {
      products,
      productCategories,
      productSizes,
    },
  };
};

export default Shop;
