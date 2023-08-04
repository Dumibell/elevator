import { useState } from "react";
import { styled } from "styled-components";

interface IFloorProps {
  floor: number;
  index: number;
  floors: number[];
}

export default function Floor({ floor, index, floors }: IFloorProps) {
  const [clicked, setClicked] = useState({ up: false, down: false });
  return (
    <FloorBox>
      <p>{floor}</p>
      <ButtonContainer>
        {index !== 0 && (
          <Button
            onClick={() => setClicked((prev) => ({ ...prev, up: !prev.up }))}
            clicked={clicked.up}
          >
            up
          </Button>
        )}
        {index !== floors?.length - 1 && (
          <Button
            onClick={() =>
              setClicked((prev) => ({ ...prev, down: !prev.down }))
            }
            clicked={clicked.down}
          >
            down
          </Button>
        )}
      </ButtonContainer>
    </FloorBox>
  );
}

const FloorBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 30px;
  width: 100px;
  height: 100px;
  border-right: 1px solid black;
  border-left: 1px solid black;
  border-top: 1px solid black;
  &:last-of-type {
    border-bottom: 1px solid black;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  button {
    font-size: 12px;
    padding: 1px;
  }
`;

const Button = styled.button<{ clicked: boolean }>`
  color: ${(props) => (props.clicked ? "red" : "")};
  border-color: ${(props) => (props.clicked ? "red" : "")};
`;
