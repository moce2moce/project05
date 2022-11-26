import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export interface ProductFilterInterface {
  name: string;
  slug: string;
}

interface Props {
  productCategories: ProductFilterInterface[];
  productSizes: ProductFilterInterface[];
}

const Filters: React.FC<Props> = ({ productCategories, productSizes }) => {
  const router = useRouter();
  const [category, setCategory] = useState(router.query.category || ""); // "meat" || ""
  const [size, setSize] = useState(router.query.size || ""); // "large" || ""

  // every time we change the category -> update the url as well
  useEffect(() => {
    // console.log("CATEGORY CHANGED ", category);
    if (category) {
      router.push({
        query: {
          ...router.query,
          category, // category: category,
        },
      });
    }
  }, [category]);

  // every time we change the size -> update the url as well
  useEffect(() => {
    // console.log("SIZE CHANGED ", size);
    if (size) {
      router.push({
        query: {
          ...router.query,
          size, // size: size
        },
      });
    }
  }, [size]);

  return (
    <div className="sidebar">
      <div className="sidebar__item">
        <h4>Department</h4>

        {category && (
          <div className="mb-3">
            <button
              onClick={() => {
                // clear the category value in state
                setCategory("");

                // clear the values from the router query
                // first we must clone the router query locally in js and delete the key/values from the local one
                const localQuery = router.query;
                delete localQuery.category; // { category: "Meat", size: "large" } -> { size: "large" }

                // then we set the local one to the router
                router.push({
                  query: localQuery,
                });
              }}
              className="btn btn-danger btn-sm"
            >
              Clear filter <span className="ml-1">&#10005;</span>
            </button>
          </div>
        )}

        {productCategories.map((prodCat, i) => (
          <div key={`prod-category-${i}`} className="sidebar__item__size">
            <label className={category === prodCat.slug ? "active" : undefined}>
              {prodCat.name}
              <input
                type="radio"
                name="product-categories"
                value={prodCat.slug} // value="Dairy" / value="Meat" / value="Vegetable"
                checked={category === prodCat.slug} // "Dairy" === "Dairy" => true/false
                onChange={e => setCategory(e.target.checked ? prodCat.slug : "")}
              />
            </label>
          </div>
        ))}
      </div>
      <div className="sidebar__item">
        <h4>Popular Size</h4>
        {size && (
          <div className="mb-3">
            <button
              onClick={() => {
                // clear the size value in state
                setSize("");

                // clear the values from the router query
                // first we must clone the router query locally in js and delete the key/values from the local one
                const localQuery = router.query;
                delete localQuery.size; // { size: "Meat", size: "large" } -> { size: "large" }

                // then we set the local one to the router
                router.push({
                  query: localQuery,
                });
              }}
              className="btn btn-danger btn-sm"
            >
              Clear filter <span className="ml-1">&#10005;</span>
            </button>
          </div>
        )}

        {productSizes.map((prodSize, i) => (
          <div key={`prod-size-${i}`} className="sidebar__item__size">
            <label className={size === prodSize.slug ? "active" : undefined}>
              {prodSize.name}
              <input
                type="radio"
                name="product-sizes"
                value={prodSize.slug} // value="Tiny" / value="Large" / value="Medium"
                checked={size === prodSize.slug} // "Large" === "Large" => true/false
                onChange={e => setSize(e.target.checked ? prodSize.slug : "")}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
