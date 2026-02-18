import { Circle, Layer, Rect, Stage, Text } from "react-konva";
import "./App.css";
import { useEffect, useRef } from "react";
import Konva from "konva";

function App() {
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        action();
      }
    });
  }, []);

  const action = () => {
    if (!stageRef.current) return;

    const container = stageRef.current.container().getBoundingClientRect();
    console.log(container, "container");
  };

  const FONT_CANDIDATES = [
    {
      label: "Arial",
      value: "Arial",
    },
    {
      label: "Helvetica",
      value: "Helvetica",
    },
    {
      label: "Times New Roman",
      value: "Times New Roman",
    },
    {
      label: "Courier New",
      value: "Courier New",
    },
    {
      label: "Georgia",
      value: "Georgia",
    },
    {
      label: "Verdana",
      value: "Verdana",
    },

    // ---- 한글 폰트 ----
    {
      label: "노토 산스",
      value: "Noto Sans KR",
    },
    {
      label: "나눔 고딕",
      value: "Nanum Gothic",
    },
    {
      label: "나눔 명조",
      value: "Nanum Myeongjo",
    },
    {
      label: "맑은 고딕",
      value: "Malgun Gothic",
    },
    {
      label: "애플 SD 고딕",
      value: "Apple SD Gothic Neo",
    },
  ];

  return (
    <div className="flex gap-2 h-screen">
      <div className="bg-white items-center w-[10%] h-full flex flex-col">
        <button>함수실행</button>
        <div>
          {CANDIDATE_FONTS.map((it) => (
            <div
              style={{
                fontFamily: it,
              }}
            >
              {it}
            </div>
          ))}
        </div>
        <div
          className="w-20 h-20 bg-blue-300"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData(
              "application/json",
              JSON.stringify({
                type: "BOX",
                color: "blue",
                width: 80,
                height: 80,
              }),
            );
          }}
        >
          dd
        </div>
      </div>
      <div
        className="bg-gray-500 w-[90%]"
        onDrop={(e) => {
          e.preventDefault();
          const data = e.dataTransfer.getData("application/json");
          console.log(JSON.parse(data));
          console.log(e.clientX - 87.5);

          const rect = new Konva.Rect({
            width: 80,
            height: 80,
            fill: "blue",
            draggable: true,
            x: e.clientX - 87.5,
            y: e.clientY,
          });

          layerRef.current?.add(rect);
          layerRef.current?.draw();
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        <Stage
          ref={stageRef}
          width={window.innerWidth}
          height={window.innerHeight}
          onClick={(e) => {
            console.log(e, "e");
          }}
        >
          <Layer ref={layerRef}>
            <Rect
              x={20}
              y={50}
              width={100}
              height={100}
              fill="red"
              shadowBlur={10}
              draggable
            />
            <Circle x={200} y={100} radius={50} fill="green" draggable />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

export default App;
