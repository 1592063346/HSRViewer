import { Row, Col } from "antd";
import { titleSlice } from "../components/titleSlice";
import QueueAnim from "rc-queue-anim";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("rc-queue-anim"), { ssr: false });

const aboutPage = () => {
  return (
    <NoSSR>
      <QueueAnim type={["bottom", "top"]}>
        <Row key='1' justify="center" className='h5Title'>
          <Col span={16}>
            {titleSlice(36, "About HSRViewer")}
          </Col>
        </Row>
        <Row key='2' justify="center" className='h5Title'>
          <Col span={16}>
            {titleSlice(20, "HSRViewer is a web that allows you to view and download your Honkai: Star Rail character build cards, where the design of the cards is as simple and beautiful as possible.")}
          </Col>
        </Row>
        <Row key='3' justify="center" className='subtitle'>
          <Col span={16}>
            {titleSlice(20, "You can browse the author and more information of this web in the footer.")}
          </Col>
        </Row>
        <Row key='4' justify="center" className='subtitle'>
          <Col span={16}>
            {titleSlice(20, "This web is the product of our whim. Perhaps we will maintain and update it from time to time in the future.")}
          </Col>
        </Row>
      </QueueAnim>
    </NoSSR>
  );
};

export default aboutPage;
