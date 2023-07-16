import { Row, Col, Avatar, Space, Layout, Menu } from "antd";
import { ReactNode, useState } from "react";
import CharacterCard from "./CharacterCard";

const { Sider } = Layout;

function getItem(
  key: any,
  icon: ReactNode,
  onClick: () => void
) {
  return { key, icon, onClick };
};

export const Player = ({ data }: any) => {
  const [key, setKey] = useState<number>(0);

  const getMenu = (characterData: any[]) => {
    const menu = [];
    for (let i = 0; i < characterData.length; ++i) {
      menu.push(getItem(
        "0" + i,
        <Avatar size={64} src={characterData[i].icon}/>,
        () => setKey(i)
      ));
    }
    return menu;
  };

  return (
    <>
      <Row justify="center" className='h5Title'>
        <Col span={16} style={{ color: "white" }}>
          <Avatar size={112} src={data.player.avatar.icon} />
          <Space direction="vertical">
            <div style={{ fontSize: 36 }}>{data.player.nickname}</div>
            <div style={{ fontSize: 18, color: "rgb(185, 185, 185)" }}>{data.player.signature}</div>
          </Space>
        </Col>
      </Row>
      <Row justify="center" className="subtitle">
        <Col span={16} style={{ color: "rgb(215, 215, 215)" }}>
          <Space direction="horizontal" size={36}>
            <div style={{ fontSize: 20 }}>Trailblaze Level: {data.player.level}</div>
            <div style={{ fontSize: 20 }}>Equilibrium Level: {data.player.world_level}</div>
            <div style={{ fontSize: 20 }}>Achievements: {data.player.space_info.achievement_count}</div>
          </Space>
        </Col>
      </Row>
      <Row justify="center" className='h5Title'>
        <Col span={20} style={{ color: "white" }}>
          {data.player.is_display || data.characters.length === 0 ? (
            <Layout style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
              <Sider style={{ backgroundColor: "rgba(0, 0, 0, 0)" }} width={120}>
                <Menu
                  defaultSelectedKeys={["0"]}
                  mode="inline"
                  items={getMenu(data.characters)}
                  style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
                />
              </Sider>
              <CharacterCard character={data.characters[key]} player={data.player} />
              {/* {JSON.stringify(data.characters[key], null, 2)} */}
            </Layout>
          ) : (
            <div style={{ fontSize: 24, color: "white" }}>Sorry, this player does not have display characters.</div>
          )}
        </Col>
      </Row>
    </>
  );
};