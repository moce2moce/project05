import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import FeaturedProducts from "../components/FeaturedProducts";
import { ProductFilterInterface } from "../components/Filters";
import HeroSection, { HeroSectionInterface } from "../components/HeroSection";
import LatestBlogs, { BlogInterface } from "../components/LatestBlogs";
import { ProductInterface } from "../components/Product";

interface Props {
  homepage: HeroSectionInterface;
  productCategories: ProductFilterInterface[];
  featuredProducts: ProductInterface[];
  latestBlogs: BlogInterface[];
}

const Home: NextPage<Props> = ({ homepage, productCategories, featuredProducts, latestBlogs }) => {
  return (
    <div>
      <Head>
        <title>Homepage</title>
      </Head>

      <HeroSection heroSectionData={homepage} productCategories={productCategories} />

      <FeaturedProducts featuredProducts={featuredProducts} />

      <LatestBlogs latestBlogs={latestBlogs} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:5001/homepage");
  const homepage = await res.json();

  const resCategories = await fetch("http://localhost:5001/productCategories");
  const productCategories = await resCategories.json();

  const resProducts = await fetch("http://localhost:5001/products?_start=1&_limit=4");
  const featuredProducts = await resProducts.json();

  const resBlogs = await fetch("http://localhost:5001/blogs");
  const latestBlogs = await resBlogs.json();

  return {
    props: {
      homepage,
      productCategories,
      featuredProducts,
      latestBlogs,
    },
  };
};

export default Home;
