import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

interface ISelectedFloors {
  /** 눌린 층 수 */
  floor: number;
  /** 올라가는 버튼이 눌렸는지 */
  up: boolean;
  /** 내려가는 버튼이 눌렸는지 */
  down: boolean;
  /** 엘리베이터 내부에서 층수를 눌렀는지 */
  buttonPushed: boolean;
}

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
  const [selectedFloors, setSelectedFloors] = useState<ISelectedFloors[]>([]);

  useEffect(() => {
    //첫번째로 눌린 층이 현재 위치에서 up인지 down인지 체크
    // if(up){
    //   if(현재 층과 가야하는 층수 사이에 눌린 버튼들이 있고 방향이 up이라면) {
    //     멈춰서 태움
    //   }
    // } else if(down) {
    //   if(현재 층과 가야하는 층수 사이에 눌린 버튼들이 있고 방향이 down이라면) {
    //     멈춰서 태움
    //   }
    // }

    //선택된 층이 하나라도 있을 때
    if (selectedFloors.length > 0) {
      //현재 층에서 올라가야 할 때
      if (selectedFloors[0].floor > elevatorState.floor) {
        setElevatorState((prev) => ({ ...prev, direction: "up" }));
        // selectedFloors.sort((a, b) => a.floor - b.floor);
        const intervalId = setTimeout(() => {
          setElevatorState((prev) => ({
            ...prev,
            floor: prev.floor + 1,
          }));
        }, 2000);
      } else if (selectedFloors[0].floor < elevatorState.floor) {
        setElevatorState((prev) => ({ ...prev, direction: "down" }));
        const intervalId = setTimeout(() => {
          setElevatorState((prev) => ({
            ...prev,
            floor: prev.floor - 1,
          }));
        }, 2000);
      }
    }
  }, [elevatorState.floor, selectedFloors]);

  console.log("selectedFloors: ", selectedFloors);
  console.log("elevatorState: ", elevatorState);

  return (
    <Container>
      <InnerContainter>
        <div>
          <ElevatorState>
            <FontAwesomeIcon icon={faCaretUp} className="icon" />
            {elevatorState.floor}
            <FontAwesomeIcon icon={faCaretDown} className="icon" />
          </ElevatorState>
          {floors.map((floor, index) => {
            return (
              <FloorBox key={floor}>
                {/* 층수 표시 */}
                <p>{floor}</p>
                <ButtonContainer>
                  {index !== 0 && (
                    // 올라가는 버튼
                    <Button
                      onClick={() => {
                        if (elevatorState.floor !== floor) {
                          if (
                            selectedFloors.filter((x) => x.floor === floor)
                              .length > 0
                          ) {
                            setSelectedFloors((prev) => [
                              ...prev.map((item) =>
                                item.floor === floor
                                  ? { ...item, floor: floor, up: true }
                                  : item
                              ),
                            ]);
                          } else {
                            setSelectedFloors((prev) => [
                              ...prev,
                              {
                                floor: floor,
                                up: true,
                                down: false,
                                buttonPushed: false,
                              },
                            ]);
                          }
                        }
                      }}
                      clicked={
                        selectedFloors.filter((x) => x.floor === floor)?.at(0)
                          ?.up === true
                      }
                    >
                      up
                    </Button>
                  )}
                  {index !== floors?.length - 1 && (
                    // 내려가는 버튼
                    <Button
                      onClick={() => {
                        if (elevatorState.floor !== floor) {
                          if (
                            selectedFloors.filter((x) => x.floor === floor)
                              .length > 0
                          ) {
                            setSelectedFloors((prev) => [
                              ...prev.map((item) =>
                                item.floor === floor
                                  ? { ...item, floor: floor, down: true }
                                  : item
                              ),
                            ]);
                          } else {
                            setSelectedFloors((prev) => [
                              ...prev,
                              {
                                floor: floor,
                                up: false,
                                down: true,
                                buttonPushed: false,
                              },
                            ]);
                          }
                        }
                      }}
                      clicked={
                        selectedFloors.filter((x) => x.floor === floor)?.at(0)
                          ?.down === true
                      }
                    >
                      down
                    </Button>
                  )}
                </ButtonContainer>
              </FloorBox>
            );
          })}
        </div>
        <Elevator bottom={elevatorState.floor - 1}>
          {floors.map((floor) => {
            return (
              <FloorButton
                key={floor}
                onClick={() => {
                  if (elevatorState.floor !== floor) {
                    if (
                      selectedFloors.filter((x) => x.floor === floor).length > 0
                    ) {
                      setSelectedFloors((prev) => [
                        ...prev.map((item) =>
                          item.floor === floor
                            ? { ...item, floor: floor, buttonPushed: true }
                            : item
                        ),
                      ]);
                    } else {
                      setSelectedFloors((prev) => [
                        ...prev,
                        {
                          floor: floor,
                          up: false,
                          down: false,
                          buttonPushed: true,
                        },
                      ]);
                    }
                  }
                }}
                selected={
                  selectedFloors.filter((x) => x.floor === floor)?.at(0)
                    ?.buttonPushed === true
                }
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
  gap: 10px;
  border: 1px solid black;
  height: 20px;
  margin-bottom: 20px;

  .icon {
    width: 18px;
    height: 18px;

    path {
      /* fill: red; */
    }
  }
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
`;

const Button = styled.button<{ clicked: boolean }>`
  color: ${(props) => (props.clicked ? "red" : "")};
  border-color: ${(props) => (props.clicked ? "red" : "")};
  font-size: 12px;
`;

const FloorButton = styled.button<{ selected: boolean }>`
  border-radius: 70%;
  color: ${(props) => (props.selected ? "red" : "")};
  border-color: ${(props) => (props.selected ? "red" : "")};
`;
