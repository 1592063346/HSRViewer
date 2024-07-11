import { useRouter } from "next/router";
import { useState } from "react";
import { Row, Col, Space } from "antd";
import { MySearch } from "../../components/MySearch";
import { titleSlice } from "../../components/titleSlice";
import QueueAnim from "rc-queue-anim";
import dynamic from "next/dynamic";
import { MySelect } from "../../components/MySelect";
import { MyButton } from "../../components/MyButton";

const NoSSR = dynamic(() => import("rc-queue-anim"), { ssr: false });

const HomePage = () => {
  const router = useRouter();

  const [inputUid1, setInputUid1] = useState<string>("");
  const [inputUid2, setInputUid2] = useState<string>("");
  const [inputCharacterId, setInputCharacterId] = useState<number>(1308);

  const go = () => {
    let path: string = "/pvp/show?";
    path += "uid1=" + inputUid1 + "&";
    path += "uid2=" + inputUid2 + "&";
    path += "id=" + inputCharacterId;
    router.push(path);
  };

  return (
    <NoSSR>
      <QueueAnim type={["bottom", "top"]} interval={200}>
        <Row key='1' justify="center" className='h5Title'>
          <Col span={16}>
            {titleSlice(32, "Compare the character build of two players here.")}
          </Col>
        </Row>
        <Row key='2' justify="center" className='h5Title'>
          <Col span={16}>
            {titleSlice(24, "NOTICE")}
          </Col>
        </Row>
        <Row key='3' justify="center" className='subtitle'>
          <Col span={16}>
            {titleSlice(20, "1.  For some reason, Trailblazer is not supported in this function now.")}
            {titleSlice(20, "2.  Please be objective about the comparison results.")}
          </Col>
        </Row>
        <Row key='4' justify="center" className='normalTitle'>
          <div style={{ margin: "auto" }}>
            <Space>
              <MySearch setHook={setInputUid1} placeholder="Enter UID1..."/>
              <MySearch setHook={setInputUid2} placeholder="Enter UID2..."/>
              <MySelect setHook={setInputCharacterId}/>
              <MyButton text="GO" onClick={go}/>
            </Space>
          </div>
        </Row>
      </QueueAnim>
    </NoSSR>
  );
};

export default HomePage;
