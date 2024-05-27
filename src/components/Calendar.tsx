import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { MdDeleteOutline } from "react-icons/md";
import { APP_URL } from "../Url";

// Utility function to get the number of days in a month
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// Utility function to get the first day of the month
const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

interface TodoItem {
  _id: string;
  title: string;
  date: Date; // Store the full date object
}

const CustomCalendar: React.FC = () => {
  const { user } = useAuthContext();
  const port = APP_URL;
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  // Create an array representing the days of the current month
  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  // State for the selected date and to-do list
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [addList, setAddlist] = useState("");
  const [formOpen, setFormOpen] = useState<Boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Function to fetch and set the to-do list for the selected date
  const fetchTodoList = async (date: Date) => {
    console.log(user._id);
    try {
      const response = await fetch(`${port}/api/user/todo/${user.user_._id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch to-do list");
      }
      const data = await response.json();
      // Convert dates to Date objects
      const todosWithDates = data.todos.map((todo: any) => ({
        ...todo,
        date: new Date(todo.date),
      }));
      setTodoList(todosWithDates);
    } catch (error) {
      console.error("Error fetching to-do list:", error);
      setTodoList([]);
    }
  };

  const addToDo = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(addList);
    console.log(selectedDate);

    const bodyRequest = {
      title: addList,
      date: selectedDate,
    };

    console.log(bodyRequest);

    try {
      const response = await fetch(
        `${port}/api/user/todo/add/${user.user_._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyRequest),
        }
      );
      console.log("PUMASOK");
      const json = await response.json();

      if (response.ok) {
        console.log(json.message);
        // Refresh the todo list after adding a new todo
        fetchTodoList(selectedDate);
        setAddlist("");
      } else {
        console.log(json.error);
        setAddlist("");
      }
    } catch (error) {
      console.log("ERROR");
    }
  };

  const deleteToDo = async (taskId: string) => {
    console.log("HELLO: ", taskId);

    const response = await fetch(
      `${port}/api/user/${user.user_._id}/todo/delete/${taskId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = response.json();

    if (response.ok) {
      console.log("OK");
      console.log(json);
      fetchTodoList(selectedDate);
    } else {
      console.log("ERROR");
    }
  };

  // Effect to fetch the to-do list when the selected date changes
  useEffect(() => {
    fetchTodoList(selectedDate);
  }, [selectedDate]);

  // Function to handle date click
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center h-1/2">
        <div className="bg-white rounded-xl p-4 shadow-md w-full">
          <div className="flex justify-between mb-2">
            <h2 className="text-lg font-bold text-fuchsia-600">
              {today.toLocaleString("default", { month: "long" })} {currentYear}
            </h2>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-bold">
                {day}
              </div>
            ))}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={index} />
            ))}

            {daysArray.map((day) => {
              const currentDay = new Date(currentYear, currentMonth, day);
              // console.log(currentDay)
              const isSelected =
                currentDay.toDateString() === selectedDate.toDateString();
              const hasTodo = todoList.some(
                (todo) => todo.date.toDateString() === currentDay.toDateString()
              ); // Check if the current day has a to-do

              return (
                <div
                  key={day}
                  className={`flex justify-center text-center p-2 rounded-xl text-black font-semibold cursor-pointer transition ${
                    day === currentDate
                      ? "shadow-lg bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 font-bold"
                      : ""
                  } ${
                    isSelected
                      ? "border-[0.5px] border-fuchsia-500 shadow-inner"
                      : ""
                  }`}
                  onClick={() => {
                    handleDateClick(currentDay);
                  }}
                >
                  <div
                    className={`text-xs ${
                      hasTodo ? "border-b-2 border-red-400" : ""
                    }`}
                  >
                    {day}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="h-1/2 w-full py-2">
        <div className="flex flex-col bg-poly-bg-fuchsia w-full h-full rounded-2xl shadow-md p-4">
          <div className="flex flex-col bg-slate-50 w-full h-full rounded-xl shadow-xl p-4">
            <h3 className="flex flex-row justify-between text-lg font-bold mb-2 text-fuchsia-500">
              <p>{selectedDate.toDateString()}</p>
              <button
                onClick={() => {
                  setFormOpen(!formOpen);
                }}
              >
                + Add to do
              </button>
            </h3>
            <div className="h-full w-full overflow-y-scroll">
              <ul>
                {todoList.filter(
                  (todo) =>
                    todo.date.toDateString() === selectedDate.toDateString()
                ).length > 0 ? (
                  todoList
                    .filter(
                      (todo) =>
                        todo.date.toDateString() === selectedDate.toDateString()
                    )
                    .map((todo, index) => (
                      <li
                        key={index}
                        className="flex flex-row w-full justify-between hover:bg-gray-200 transition p-1"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {todo.title}
                        {hoveredIndex === index && (
                          <button
                            onClick={() => {
                              deleteToDo(todo._id);
                            }}
                            className="bg-gradient-to-b from-red-500 to-red-700 p-1 rounded-xl"
                          >
                            <span className="text-white font-semibold">
                              <MdDeleteOutline />
                            </span>
                          </button>
                        )}
                      </li>
                    ))
                ) : (
                  <p className="text-black font-normal mb-1">
                    No to-dos for this date.
                  </p>
                )}
              </ul>
            </div>
            {formOpen && (
              <form onSubmit={addToDo} className="flex flex-row w-full">
                <input
                  type="text"
                  placeholder="Input task"
                  onChange={(e) => {
                    setAddlist(e.target.value);
                  }}
                  value={addList}
                  className="input border-[0.5px] border-fuchsia h-6 px-2 w-full mt-2 bg-white"
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
