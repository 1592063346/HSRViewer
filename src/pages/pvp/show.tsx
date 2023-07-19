import { useRouter } from "next/router";
import { titleSlice } from "../../components/titleSlice";
import { Row, Col, Spin, Space } from "antd";
import { MyButton } from "../../components/MyButton";
import { useEffect, useState } from "react";
import { fetchUser } from "../../utils/network";
import { checkUid } from "../../utils/uid";
import { Language } from "../../components/Language";
import { LoadingOutlined } from "@ant-design/icons";
import CharacterComp from "../../components/CharacterComp";
import { Player } from "../../components/Player";

const InfoPage = () => {
  const router = useRouter();

  const [data1, setData1] = useState<any>({});
  const [data2, setData2] = useState<any>({});
  const [character1, setCharacter1] = useState<any>({});
  const [character2, setCharacter2] = useState<any>({});
  /* code: (<3) = waiting, 3 = ok, (>3) = err */
  const [code, setCode] = useState<number>(0);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    setCode(0);
  }, [router]);

  const setOk = () => setCode(3);
  const setErr = () => setCode(4);

  const cat = async (uid: string, setData: any) => {
    try {
      if (checkUid(uid)) {
        fetchUser(uid as unknown as number, Language.EN, true)
          .catch(() => setErr())
          .then((result) => {
            if (result) {
              setData(result);
              setCode(code => code + 1);
            }
          });
      } else {
        setErr();
      }
    } catch (err) {
      setErr();
    }
  };

  useEffect(() => {
    if (code === 0) {
      cat(router.query.uid1 as string, setData1);
      cat(router.query.uid2 as string, setData2);
    } else if (code === 2) {
      if (!data1.characters || !data2.characters) {
        setErr();
        return;
      }
      let found = false;
      let char1 = {};
      let char2 = {};
      const id = router.query.id as unknown as number;
      for (let i = 0; i < data1.characters.length; ++i) {
        if (data1.characters[i].id === id) {
          found = true;
          char1 = data1.characters[i];
          break;
        }
      }
      if (!found) {
        setErr();
        return;
      }
      found = false;
      for (let i = 0; i < data2.characters.length; ++i) {
        if (data2.characters[i].id === id) {
          found = true;
          char2 = data2.characters[i];
          break;
        }
      }
      if (!found) {
        setErr();
        return;
      }
      setCharacter1(char1);
      setCharacter2(char2);
      setOk();
    }
  }, [code]);

  const err = (
    <>
      <Row key='1' justify="center" className='h5Title'>
        <Col span={16}>
          {titleSlice(40, "Oops! Something went wrong...")}
          {titleSlice(20, "Try to check if the UID you entered is valid, or if both players show the character you selected.")}
        </Col>
      </Row>
      <Row key='2' justify="center" className='h5Title'>
        <div style={{ margin: "auto" }}>
          <Space>
            <MyButton text="BACK" onClick={() => router.push("/pvp")}/>
            <MyButton text="TRY AGAIN?" onClick={() => setCode(0)}/>
          </Space>
        </div>
      </Row>
    </>
  );

  const ok = (
    <>
      <Row key='1' justify="center" className='subtitle'>
        <Col span={12}>
          <Player data={data1}/>
        </Col>
        <Col span={12}>
          <Player data={data2}/>
        </Col>
      </Row>
      <Row key='2' justify="center" className='h5Title'>
        <Col span={23}>
          <CharacterComp
            player1={data1.player}
            player2={data2.player}
            character1={character1}
            character2={character2}
          />
        </Col>
      </Row>
    </>
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
    {code < 3 ? waiting : code === 3 ? ok : err}
  </>;
};

export default InfoPage;
