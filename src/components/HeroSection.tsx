import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ProductFilterInterface } from "./Filters";

export interface HeroSectionInterface {
  heroSection: {
    preTitle: string;
    title: string;
    desc: string;
  };
  departmentInfo: string;
}

interface Props {
  heroSectionData: HeroSectionInterface;
  productCategories: ProductFilterInterface[];
}

const HeroSection: React.FC<Props> = ({ heroSectionData, productCategories }) => {
  const router = useRouter();

  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="hero__categories">
              <div className="hero__categories__all">
                <i className="fa fa-bars"></i>
                <span>All departments</span>
              </div>
              <div className="py-3">
                {productCategories.map((prodCat, i) => (
                  <div key={`prod-cat-${i}`} className="sidebar__item__size">
                    <button
                      onClick={() => {
                        // on click on these categories -> redirect to the /shop page
                        // also, set the query.category based on the current slug that we are iterating
                        router.push({
                          pathname: "/shop",
                          query: {
                            ...router.query,
                            category: prodCat.slug,
                          },
                        });
                      }}
                    >
                      {prodCat.name}
                    </button>
                  </div>
                ))}
              </div>
              <p className="mt-3">{heroSectionData.departmentInfo}</p>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="hero__item set-bg">
              <div className="hero__text w-50">
                <span>{heroSectionData.heroSection.preTitle}</span>
                <h2>{heroSectionData.heroSection.title}</h2>
                <p>{heroSectionData.heroSection.desc}</p>

                <Link href="/shop">
                  <a className="primary-btn">SHOP NOW</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
