import { Avatar, Select, Space } from "antd";
import { characterOptions } from "../constants/characterConfig";

export const MySelect = ({ setHook }: any) => {
  return <Select
    size='large'
    options={characterOptions.map((value) => {
      return {
        key: value.key,
        value: value.value,
        label: (
          <Space>
            <Avatar size={39} src={"/srasset/icon/avatar/" + value.key + ".png"}/>
            {value.label}
          </Space>
        )
      };
    })}
    style={{ width: 200, backgroundColor: "rgba(0, 0, 0, 0)", color: "rgba(255, 255, 255, 0.5)" }}
    // bordered={false}
    placeholder="Select character"
    allowClear={false}
    defaultValue={['1008']}
    onChange={(value) => setHook(value)}
  />;
};