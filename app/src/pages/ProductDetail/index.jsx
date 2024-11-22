import { Header, Loading } from "components";
import { useQuery } from "hooks";
import React from "react";
import { useParams } from "react-router";
import { productService } from "services";
import {
  ProductSection,
  SliderSection,
  TableSection,
  TextSection,
} from "./components";
import TopSection from "./components/TopSection";
import "./style.scss";

export default function ProductDetail() {
  const { slug } = useParams();

  const { data: product, fetching: productFetching } = useQuery(
    () => productService.getProduct(`slug=${slug}`),
    [slug]
  );
  if (productFetching) return <Loading />;

  return (
    <>
      <Header />
      <div className="productDetail">
        <ProductSection data={product.data} fetching={productFetching} />

        {product.data?.[0].categories && (
          <SliderSection
            title={"sản phẩm tương tự"}
            categories={product.data?.[0].categories}
          />
        )}

        <div className="productDetail_info">
          <div className="container">
            <div>
              {product.data?.[0].specifications && (
                <TableSection
                  specifications={product.data?.[0].specifications}
                />
              )}
              {product.data?.[0].description && (
                <TextSection content={product.data?.[0].description} />
              )}
            </div>
            <div>
              <TopSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
