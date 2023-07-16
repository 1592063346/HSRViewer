import { useRouter } from "next/router";
import { useState } from "react";
import { Row, Col } from "antd";
import { MySearch } from "../components/MySearch";
import { titleSlice } from "../components/titleSlice";
import QueueAnim from "rc-queue-anim";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("rc-queue-anim"), { ssr: false });

const HomePage = () => {
  const router = useRouter();

  const [inputUid, setInputUid] = useState<string>("");

  const onSearch = () => {
    router.push("/" + inputUid);
  };

  return (
    <NoSSR>
      <QueueAnim type={["bottom", "top"]} interval={200}>
        <Row key='1' justify='center' className='normalTitle'>
          <Col span={16}>
            {titleSlice(54, "Get your")}
            {titleSlice(54, "Honkai: Star Rail")}
            {titleSlice(54, "player card.")}
          </Col>
        </Row>
        <Row key='2' justify="center" className='h5Title'>
          <Col span={16}>
            {titleSlice(24, "Fetch data from your Character Showcase and display a card instantly.")}
          </Col>
        </Row>
        <Row key='3' justify="center" className='normalTitle'>
          <div style={{ margin: "auto" }}>
            <MySearch setHook={setInputUid} onSearch={onSearch}/>
          </div>
        </Row>
      </QueueAnim>
    </NoSSR>
  );
};

export default HomePage;
