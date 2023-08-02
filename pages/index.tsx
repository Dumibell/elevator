import { styled } from "styled-components";

export default function Home() {
  /** 층 수가 담긴 배열 */
  const floors = [...Array.from({ length: 8 }, (v, i) => i + 1)].reverse();

  /** 층의 높이 */
  const floorHeight = 100;

  return (
    <Container>
      <InnerContainter>
        <div>
          {floors.map((floor, i) => {
            return (
              <Floor key={floor}>
                <p>{floor}</p>
                <ButtonContainer>
                  {i !== 0 && <button>up</button>}
                  {i !== floors.length - 1 && <button>down</button>}
                </ButtonContainer>
              </Floor>
            );
          })}
        </div>
        <Elevator>
          {floors.map((floor) => {
            return <FloorButton key={floor}>{floor}</FloorButton>;
          })}
        </Elevator>
      </InnerContainter>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerContainter = styled.div`
  position: relative;
  display: flex;
  width: 200px;
  margin-top: 50px;
  gap: 10px;
`;

const Floor = styled.div`
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

const Elevator = styled.div`
  position: absolute;
  bottom: 0; // 변경값
  right: 0;
  width: 70px;
  height: 100px;
  background-color: silver;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FloorButton = styled.button`
  border-radius: 70%;
  /* color: red;
  border-color: red; */
`;
