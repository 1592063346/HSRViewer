import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState } from "react";
import { ConfigProvider, Layout, Button, Space, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { contentStyle, footerStyle, headerStyle, layoutStyle } from "../styles/style";
import { MySearch } from "../components/MySearch";

const { Header, Footer, Content } = Layout;

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const [inputUid, setInputUid] = useState<string>("");

  const onSearch = () => {
    router.push("/" + inputUid);
  };

  const items = [
    {
      key: "1",
      label: <div style={{ color: "white", fontSize: 18 }}>HOME</div>,
      onClick: () => router.push("/")
    },
    { 
      key: "2",
      label: <div style={{ color: "white", fontSize: 18 }}>ABOUT</div>,
      onClick: () => router.push("/about")
    }
  ];

  return (
    <ConfigProvider theme={{
      token: {
        fontFamily: "HanYiWenHei-85W"
      }
    }}>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Space>
            <Dropdown
              menu={{ items }}
              dropdownRender={(menus) => {
                const nodes: any = [];
                items.forEach((value) => {
                  nodes.push(
                    <Button
                      type='text'
                      style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                      size='large'
                      onClick={value.onClick}
                    >
                      {value.label}
                    </Button>
                  );
                });
                return <Space direction="vertical" size={0}>{nodes}</Space>;
              }}
            >
              <div style={{ fontSize: 24 }}>
                <MenuOutlined style={{ color: "white" }}/>
              </div>
            </Dropdown>
            <Button type='text' onClick={() => router.push("/")}>
              <div style={{ color: "white", fontSize: 20 }}>
                HSRViewer
              </div>
            </Button>
          </Space>
          <div style={{ marginLeft: "auto" }}>
            <MySearch setHook={setInputUid} onSearch={onSearch}/>
          </div>
        </Header>
        <Content style={contentStyle}>
          <Component className='pageBody' {...pageProps} />
        </Content>
        <Footer style={footerStyle}>
          <Space direction="vertical">
            <div>Data-fetch service provided by <a style={{ color: "rgb(152, 168, 184)" }} href="https://api.mihomo.me">Mihomo API</a>.</div>
            <div>Web design based on <a style={{ color: "rgb(152, 168, 184)" }} href="https://enka.network/">Enka.Network</a> (UI style) and <a style={{ color: "rgb(152, 168, 184)" }} href="https://ant.design/index-cn">Ant Design</a> (components).</div>
            <div>Made by <a style={{ color: "rgb(135, 206, 255)" }} href="https://github.com/kuritas">Kuritas</a> and <a style={{ color: "rgb(135, 206, 255)" }} href="https://github.com/1592063346">Imagine076</a>.</div>
          </Space>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
