import Floor from "@/Components/Floor";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

export default function Home() {
  /** 층 수가 담긴 배열 */
  const floors = [...Array.from({ length: 8 }, (v, i) => i + 1)].reverse();
  /** 층의 높이 */
  const floorHeight = 100;

  //현재 엘리베이터의 상태
  const [elevatorState, setElevatorState] = useState<{
    floor: number;
    direction: "up" | "down" | undefined;
  }>({
    floor: 1,
    direction: undefined,
  });
  const [selectedFloors, setSelectedFloors] = useState<number[]>([]);

  return (
    <Container>
      <InnerContainter>
        <div>
          <ElevatorState>{elevatorState.floor}</ElevatorState>
          {floors.map((floor, i) => {
            return (
              <Floor key={floor} floor={floor} index={i} floors={floors} />
            );
          })}
        </div>
        <Elevator bottom={elevatorState.floor - 1}>
          {floors.map((floor) => {
            return (
              <FloorButton
                key={floor}
                onClick={() =>
                  !selectedFloors.includes(floor) &&
                  elevatorState.floor !== floor &&
                  setSelectedFloors((prev) => [...prev, floor])
                }
                selected={selectedFloors.includes(floor)}
              >
                {floor}
              </FloorButton>
            );
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

const ElevatorState = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid black;
  height: 20px;
  margin-bottom: 20px;
`;

const Elevator = styled.div<{ bottom: number }>`
  position: absolute;
  bottom: ${(props) => props.bottom * 100}px;
  right: 0;
  width: 70px;
  height: 100px;
  background-color: silver;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FloorButton = styled.button<{ selected: boolean }>`
  border-radius: 70%;
  color: ${(props) => (props.selected ? "red" : "")};
  border-color: ${(props) => (props.selected ? "red" : "")};
`;
