import React, { useEffect, useRef, useState } from "react";
import { Empty, SideBar, SpinLoading, Toast } from "antd-mobile";
import "./category.scss";
import { useThrottleFn } from "ahooks";
import NoData from "@img/nodata.png";
import Path from "../../../../path";
import request from "../../../../request";
import CategoryItemGroup from "../CategoryItem/CategoryItemGroup";

const text =
  "Amet proident consequat esse dolor officia id laborum eu minim commodo. Aliquip dolore qui aliquip do ipsum eu incididunt occaecat ut nisi. Eu qui quis enim velit cupidatat et labore nostrud tempor reprehenderit aliquip sit deserunt. Amet ut magna tempor elit officia proident est quis irure. Ea qui commodo nulla velit exercitation in. Voluptate culpa irure culpa deserunt labore sunt esse dolor est do aliqua. Duis sunt excepteur culpa anim et aliquip aliquip elit magna adipisicing aliqua aliquip et. Eiusmod excepteur do id labore dolore commodo. Commodo aliquip exercitation ipsum sit ipsum deserunt magna ea minim aute sit. Laboris nisi id sunt pariatur. Nisi reprehenderit excepteur incididunt aute dolore aliquip aliqua Lorem velit proident ad. Nulla aute sint dolor exercitation veniam elit cillum et duis occaecat veniam laborum reprehenderit magna. Mollit incididunt irure pariatur cupidatat culpa in esse sit fugiat aute laborum. Occaecat nostrud magna commodo tempor exercitation excepteur Lorem occaecat eiusmod velit minim dolor. Ad eiusmod duis magna et in do et. Laboris ea mollit ea laboris eiusmod duis culpa proident aliquip exercitation enim culpa magna. Lorem labore nisi esse cupidatat cillum reprehenderit duis. Fugiat anim eiusmod deserunt in irure tempor adipisicing cupidatat proident magna aliqua reprehenderit. Cupidatat cupidatat adipisicing dolor non pariatur consectetur duis dolore eu officia. Anim exercitation commodo exercitation eiusmod aute deserunt. Duis mollit enim commodo sit commodo. Anim ea commodo sint officia incididunt. Laborum ad culpa deserunt ut elit. Adipisicing adipisicing laboris ipsum fugiat occaecat duis et proident eu incididunt excepteur sint excepteur qui voluptate. Sint amet culpa laboris Lorem reprehenderit aliqua quis sint consequat dolore adipisicing fugiat exercitation reprehenderit nisi. Cillum est consequat laborum voluptate deserunt magna sit veniam dolore cillum commodo. Sunt ullamco incididunt proident voluptate mollit nulla eu. Non occaecat Lorem adipisicing id. Magna adipisicing tempor excepteur. Eiusmod esse anim occaecat aliquip do duis. Dolore commodo eiusmod magna laborum veniam in elit. Nulla irure esse dolore esse ea irure voluptate velit aute est adipisicing. Cillum magna sit id minim qui Lorem sunt labore. Proident fugiat consectetur ad sint ullamco eiusmod nulla aliquip incididunt excepteur aliquip occaecat pariatur cupidatat enim. Do consectetur veniam qui mollit est adipisicing velit consectetur cupidatat eu Lorem cillum Lorem. Cillum consectetur velit voluptate. Ipsum consequat qui reprehenderit magna non nostrud laboris adipisicing cillum id nulla fugiat mollit. Velit est dolore aliquip proident qui aliqua dolor duis nostrud incididunt laboris ex adipisicing ad magna. Magna duis occaecat laboris reprehenderit reprehenderit quis non elit nulla consequat non eiusmod sint ullamco do. Officia consequat laboris dolor ullamco cupidatat magna aliqua do. Anim nostrud commodo eu nulla adipisicing officia magna fugiat adipisicing. Esse deserunt voluptate non id elit duis consectetur aliqua sunt qui velit ad nulla. Adipisicing ad sit ea velit ipsum quis in officia excepteur sint. Nisi amet non aliqua ut ad Lorem id. Voluptate veniam exercitation labore. Ad fugiat adipisicing quis. Ut fugiat officia aute incididunt ex in ad ut officia duis culpa. Pariatur proident voluptate officia aliqua. Esse consequat id sint nisi. Consequat est elit anim consequat cupidatat occaecat consequat dolor elit do id proident magna. Mollit ullamco laboris veniam eu ullamco minim Lorem id magna commodo sunt mollit nostrud adipisicing irure. Elit do incididunt duis ex non. Aute occaecat officia fugiat ea adipisicing.";

const Category = (props) => {
  const { updateOrderList } = props;
  const [activeKey, setActiveKey] = useState(0);
  const [list, setList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { run } = useThrottleFn(
    () => {
      let currentKey = activeKey;
      for (const item of list) {
        const element = document.getElementById(`anchor-${item.category_id}`);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= 0) {
          currentKey = item.category_id;
        } else {
          break;
        }
      }
      setActiveKey(currentKey);
    },
    {
      leading: true,
      trailing: true,
      wait: 100,
    }
  );

  const mainElementRef = useRef(null);

  useEffect(() => {
    loadData();
    loadProductList();
  }, []);

  useEffect(() => {
    const mainElement = mainElementRef.current;
    if (list.length > 0) {
      if (!mainElement) return;
      mainElement.addEventListener("scroll", run);
    }
    return () => {
      mainElement && mainElement.removeEventListener("scroll", run);
    };
  }, [list.length > 0]);

  const loadData = async () => {
    setLoading(true);
    const url = `${Path.APIBaseUrl}${Path.v0.category}`;
    try {
      const result = await request.get(url);
      if (result.code === 0) {
        setList(result.result.items);
        if (result.result.items.length > 0) {
          setActiveKey(result.result.items[0].category_id);
        }
      } else {
        Toast.show({
          content: result.message,
          icon: "fail",
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(JSON.stringify(error));
      Toast.show({
        content: "network error",
        icon: "fail",
      });
      setLoading(false);
    }
  };

  const loadProductList = async () => {
    setLoading(true);
    const url = `${Path.APIBaseUrl}${Path.v0.product}`;
    try {
      const result = await request.get(url);
      if (result.code === 0) {
        setProductList(result.result.items);
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  const handleChange = (key) => {
    setActiveKey(key);
    document.getElementById(`anchor-${key}`).scrollIntoView();
  };

  return (
    <div className="container">
      {loading && (
        <SpinLoading
          style={{ width: "100%", margin: "0 auto", marginTop: "30vh" }}
        />
      )}
      {!loading && list.length === 0 && (
        <div className="empty">
          <img src={NoData} style={{ width: 100 }} />
          <div className="emptyText">No Data</div>
        </div>
      )}
      {!loading && list.length > 0 && (
        <>
          <div className="side">
            <SideBar activeKey={String(activeKey)} onChange={handleChange}>
              {list.map((item) => (
                <SideBar.Item key={item.category_id} title={item.title} />
              ))}
            </SideBar>
          </div>
          <div className="main" ref={mainElementRef}>
            {list.map((item) => (
              <div key={item.category_id}>
                <h2 id={`anchor-${item.category_id}`}>{item.title}</h2>
                <CategoryItemGroup
                  productList={productList}
                  categoryId={item.category_id}
                  updateOrderList={updateOrderList}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Category;
