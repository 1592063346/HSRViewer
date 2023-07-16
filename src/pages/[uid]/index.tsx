import { useRouter } from "next/router";
import { titleSlice } from "../../components/titleSlice";
import { Row, Col, Space, Spin } from "antd";
import { MyButton } from "../../components/MyButton";
import { useEffect, useState } from "react";
import { fetchUser } from "../../utils/network";
import { checkUid } from "../../utils/uid";
import { Language } from "../../components/Language";
import { LoadingOutlined } from "@ant-design/icons";
import { Player } from "../../components/Player";

const InfoPage = () => {
  const router = useRouter();

  const [data, setData] = useState<any>({});
  /* code: 0 = waiting, 1 = ok, 2 = err */
  const [code, setCode] = useState<number>(0);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    setCode(0);
  }, [router]);

  useEffect(() => {
    if (code === 0) {
      try {
        let uid = router.query.uid;
        if (checkUid(uid)) {
          fetchUser(uid as unknown as number, Language.EN, true)
            .catch(() => setCode(2))
            .then((result) => {
              if (result) {
                setData(result);
                setCode(1);
              }
            });
        } else {
          setCode(2);
        }
      } catch (err) {
        setCode(2);
      }
    }
  }, [code]);

  const err = (
    <>
      <Row justify="center" className='h5Title'>
        <Col span={16}>
          {titleSlice(40, "Oops! Something went wrong...")}
          {titleSlice(20, "Try to check if the UID you entered is valid?")}
        </Col>
      </Row>
      <Row justify="center" className='h5Title'>
        <div style={{ margin: "auto" }}>
          <Space>
            <MyButton text="BACK" onClick={() => router.push("/")}/>
            <MyButton text="TRY AGAIN?"/>
          </Space>
        </div>
      </Row>
    </>
  );

  const ok = (
    <Player data={data}/>
  );

  const waiting = (
    <Spin
      className='spin'
      indicator={
        <LoadingOutlined
          style={{ fontSize: 80, color: "white" }}
          spin
        />
      }
    />
  );

  return <>
    {code === 0 ? waiting : code === 1 ? ok : err}
  </>;
};

export default InfoPage;
