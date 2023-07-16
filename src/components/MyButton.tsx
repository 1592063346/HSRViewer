import { Button } from "antd";
import { buttonStyle } from "../styles/style";

export const MyButton = ({ text, onClick }: any) => {
  return (
    <Button
      type='text'
      onClick={onClick}
      style={buttonStyle}
    >
      <div style={{ color: "white", fontSize: 20 }}>
        {text}
      </div>
    </Button>
  );
};