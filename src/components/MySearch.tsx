import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export const MySearch = ({ setHook, onSearch }: any) => {
  return <Input
    size='large'
    placeholder="Enter UID..."
    style={{ width: 200, backgroundColor: "rgba(255, 255, 255, 0.5)" }}
    bordered={false}
    maxLength={10}
    prefix={<SearchOutlined />}
    onChange={(e) => setHook(e.target.value)}
    onPressEnter={onSearch}
  />;
};