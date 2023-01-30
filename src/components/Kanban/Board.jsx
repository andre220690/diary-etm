import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./Board.module.css";
import Button from '@mui/material/Button';


const initial = {
    "0": [],
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": [],
    "6": [],
    "7": [],
    "8": [],
    "9": [],
};

const grid = 8;
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

function Widget({ widget, index }) {
    return (
        <Draggable draggableId={widget.id} index={index}>
            {provided => (
                <div className={styles.b05}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    {widget.content}
                </div>
            )}
        </Draggable>
    );
}

const WidgetList = React.memo(function WidgetList({ widgets }) {
    return widgets.map((widget, index) => (
        <Widget widget={widget} index={index} key={index + widget.id} />
    ));
});

const Wrapper = styled.div`
  width: 300px;
  padding: 0 3px 0 3px;
`;

function Column({ droppableId, widgets }) {
    return (
        <Droppable droppableId={droppableId}>
            {provided => (
                <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
                    <WidgetList widgets={widgets} />
                    {provided.placeholder}
                </Wrapper>
            )}
        </Droppable>
    );
}

const Complite = ({ setState, numStick, setComplite }) => {

    const isTrue = () => {
        setState([numStick].isSeccessful = true);
        console.log("true");
        setComplite(false);
    }

    const isFalse = () => {
        setState([numStick].isSeccessful = false);
        console.log("false");
        setComplite(false);
    }

    return (
        <div className={styles.outSide}>
            <div className={styles.b04}>
                <Button onClick={isTrue} style={{backgroundColor: '#69dd51'}} className={styles.b06} variant='contained'>УСПЕХ</Button>
                <Button onClick={isFalse} style={{backgroundColor: '#e35f5f'}} className={styles.b06} variant='contained'>НЕУДАЧА</Button>
            </div>
        </div>
    );
}

const Board = ({ sticks, sample }) => {
    const [state, setState] = useState({ widgets: initial });
    const [columns, setColumns] = useState([]);
    const [isComplite, setComplite] = useState(false);
    const [numStick, setNumStick] = useState();
    var maxColumn = '3';

    useEffect(() => {
        setColumns(sample.split('|'));
        let arr = [];
        sticks.map((item) =>
            initial[item.status].push({
                id: (item.id).toString(),
                content: item.description,
                status: item.status,
                isSeccessful: item.isSeccessful
            })

        );
        //не работает
        maxColumn = (columns.length).toString();
    }, [])

    function onDragEnd(result) {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId) {
            if (destination.index === source.index) {
                return;
            }

            const widgets = reorder(
                state.widgets[source.droppableId],
                source.index,
                destination.index
            );

            const updateState = {
                widgets: {
                    ...state.widgets,
                    [source.droppableId]: widgets
                }
            };

            setState(updateState);
        } else {
            const startColumn = [...state.widgets[source.droppableId]];
            const finishColumn = [...state.widgets[destination.droppableId]];
            const [removed] = startColumn.splice(source.index, 1);
            finishColumn.splice(destination.index, 0, removed);

            const updateState = {
                widgets: {
                    ...state.widgets,
                    [source.droppableId]: startColumn,
                    [destination.droppableId]: finishColumn
                }
            };
            setState(updateState);

            if (result.destination.droppableId == maxColumn) {
                setNumStick(result.draggableId);
                setComplite(true);
            }


        }
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {console.log(state.widgets)}
            <div className={styles.b01}>
                {
                    columns.map((item, i) =>
                        <div className={styles.b03} key={item}>
                            <div className={styles.b02}>{item}</div>
                            <Column widgets={state.widgets[i]} droppableId={(i).toString()} />
                        </div>
                    )
                }

            </div>
            {isComplite
                ? <Complite setState={setState} numStick={numStick} setComplite={setComplite} />
                : <div />
            }


        </DragDropContext>
    );
};

export default Board