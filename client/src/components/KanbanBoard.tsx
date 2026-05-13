import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";

import { useState } from "react";


// TASK TYPE
interface Task {

  id: string;

  title: string;

}


// COLUMN TYPE
interface ColumnsType {

  [key: string]: Task[];

}


// INITIAL DATA
const initialData: ColumnsType = {

  todo: [

    {
      id: "1",
      title: "Design Landing Page",
    },

    {
      id: "2",
      title: "Setup Backend API",
    },

  ],

  inProgress: [

    {
      id: "3",
      title: "Build Dashboard UI",
    },

  ],

  review: [

    {
      id: "4",
      title: "Test Authentication",
    },

  ],

  completed: [

    {
      id: "5",
      title: "Create Database",
    },

  ],

};


const KanbanBoard = () => {

  const [columns, setColumns] =
    useState<ColumnsType>(initialData);


  // HANDLE DRAG
  const onDragEnd = (
    result: DropResult
  ) => {

    const {
      source,
      destination
    } = result;


    // If dropped outside
    if (!destination) return;


    // Source & destination columns
    const sourceColumn =
      columns[source.droppableId];

    const destColumn =
      columns[destination.droppableId];


    // Copy arrays
    const sourceItems =
      [...sourceColumn];

    const destItems =
      [...destColumn];


    // Remove dragged item
    const [removed] =
      sourceItems.splice(
        source.index,
        1
      );


    // Add to destination
    destItems.splice(
      destination.index,
      0,
      removed
    );


    // Update state
    setColumns({

      ...columns,

      [source.droppableId]:
        sourceItems,

      [destination.droppableId]:
        destItems,

    });

  };


  return (

    <div className="mt-12">

      <h2 className="text-3xl font-bold mb-8">

        Project Workflow

      </h2>


      <DragDropContext
        onDragEnd={onDragEnd}
      >

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >

          {Object.entries(columns).map(

            ([columnId, tasks]) => (

              <Droppable

                droppableId={columnId}

                key={columnId}

              >

                {(provided) => (

                  <div

                    ref={provided.innerRef}

                    {...provided.droppableProps}

                    className="bg-slate-800 rounded-2xl p-4 min-h-[500px]"

                  >

                    <h3 className="text-xl font-bold capitalize mb-6">

                      {columnId}

                    </h3>


                    {tasks.map(

                      (task, index) => (

                        <Draggable

                          key={task.id}

                          draggableId={task.id}

                          index={index}

                        >

                          {(provided) => (

                            <div

                              ref={provided.innerRef}

                              {...provided.draggableProps}

                              {...provided.dragHandleProps}

                              className="bg-slate-700 p-4 rounded-xl mb-4 shadow-md hover:bg-slate-600 transition cursor-pointer"

                            >

                              <p className="font-medium">

                                {task.title}

                              </p>

                            </div>

                          )}

                        </Draggable>

                      )

                    )}


                    {provided.placeholder}

                  </div>

                )}

              </Droppable>

            )

          )}

        </div>

      </DragDropContext>

    </div>

  );

};

export default KanbanBoard;
