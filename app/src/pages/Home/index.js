import {
  CategoryBar,
  Header,
  MenuSide,
  Paginate,
  ProductAccordion,
  Skeleton,
} from "components";
import "flickity/dist/flickity.css";
import { useQuery } from "hooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { productService } from "services";
import categoryService from "services/categoryService";
import { queryObject, queryString } from "utils";
import "./style.scss";

export default function Home() {
  const { search } = useLocation();
  const [categories, setCategories] = useState([]);
  const [fetching, setFetching] = useState(false);
  const searchObj = useSelector((store) => store.url);

  const { data: products, fetching: productFetching } = useQuery(
    () => productService.getProduct(search),
    [search]
  );

  useEffect(() => {
    (async () => {
      setFetching(true);
      const response = await categoryService.getCategory()
      setCategories(response.data);
      setFetching(false);
    })();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [search]);

  const query = queryObject();
  if (!search) return <Navigate to={`/?${queryString(searchObj)}`} />;

  return (
    <>
      <Header />
      <div id="home">
        <CategoryBar list={categories} />
        <div className="container home-container">
          <div className="homeSide">
            <MenuSide />
          </div>
          <div className="homeSection">
            {!productFetching ? (
              query.categories ? (
                categories.map(
                  (item, index) =>
                    item._id == query.categoryId && (
                      <p key={index} className="title">
                        {item.title}
                      </p>
                    )
                )
              ) : (
                query.name && (
                  <p className="title">Search result for `{query.name}`</p>
                )
              )
            ) : (
              <Skeleton className="title" width={200} height={30} />
            )}

            <div className="homeProduct">
              <ProductAccordion
                data={products.data}
                fetching={productFetching}
              />
            </div>
            <div className="homePaginate">
              <Paginate totalPage={products.paginate?.totalPage} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
