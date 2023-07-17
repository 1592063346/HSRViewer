export const titleSlice = (fontSize: number, text: string) => {
  return (
    <div style={{ color: "white", fontSize: fontSize }} className="shadowText">
      {text}
    </div>
  );
};