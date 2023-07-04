/* eslint-disable react/prop-types */
import mobileDarkImg from "../assets/mobile-dark-bg.jpg";
import mobileLightImg from "../assets/mobile-light-bg.jpg";
import desktopLightImg from "../assets/desktop-light-bg.jpg";
import desktopDarkImg from "../assets/desktop-dark-bg.jpg";
import { useState } from "react";
import SunIcon from "./SunIcon";
import MoonIcon from "./MoonIcon";

const objectives = [
  { id: 1, description: "Learn HTML", completed: false },
  { id: 2, description: "Learn CSS", completed: false },
  { id: 3, description: "Learn React", completed: false },
];

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [form, setForm] = useState("");
  const [tasks, setTasks] = useState(objectives);
  const [sortBy, setSortBy] = useState("All");

  function toggleDark() {
    setIsDark((isDark) => !isDark);
  }

  function toggleCompleted(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    console.log(tasks);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form) return;
    const newTask = {
      id: tasks.length + 1,
      description: form,
      completed: false,
    };

    setTasks((tasks) => [...tasks, newTask]);
    setForm("");
  }

  function deleteTask(id) {
    setTasks((tasks) => tasks.filter((tasks) => tasks.id !== id));
  }

  function handleClearList() {
    setTasks([]);
  }

  return (
    <div
      className={`${isDark ? "bg-slate-900" : "bg- white"} h-screen relative`}
    >
      {/* Image div */}
      <ImageDiv isDark={isDark} />
      {/* Main div */}
      <div className="relative z-10 w-full">
        <div className=" flex justify-between px-10 xl:px-[25rem]">
          <p className="text-white text-3xl font-bold pt-10 mb-12">T O D O</p>
          {isDark ? (
            <SunIcon toggleDark={toggleDark} />
          ) : (
            <MoonIcon toggleDark={toggleDark} />
          )}
        </div>
        {/* Form div */}
        <FormDiv
          isDark={isDark}
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
        />
        {/* Task Container */}
        <TasksContainer
          sortBy={sortBy}
          isDark={isDark}
          tasks={tasks}
          toggleCompleted={toggleCompleted}
          deleteTask={deleteTask}
        />
        <TaskProgress
          isDark={isDark}
          setSortBy={setSortBy}
          tasks={tasks}
          handleClearList={handleClearList}
        />
        <Footer isDark={isDark} setSortBy={setSortBy} />
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function ImageDiv({ isDark }) {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${isDark ? mobileDarkImg : mobileLightImg})`,
        }}
        className=" xl:hidden block bg-cover w-full h-52 absolute z-0"
      ></div>
      <div
        style={{
          backgroundImage: `url(${isDark ? desktopDarkImg : desktopLightImg})`,
        }}
        className=" xl:block hidden bg-cover w-full h-52 absolute z-0"
      ></div>
    </div>
  );
}

function FormDiv({ isDark, form, setForm, handleSubmit }) {
  return (
    <div className=" xl:w-[30rem] w-[20rem] mx-auto mb-5">
      <form onSubmit={(e) => handleSubmit(e)} action="">
        <input
          className={`${
            isDark ? "bg-slate-800 text-white" : "bg-white"
          } w-full rounded-md`}
          type="text"
          name=""
          id=""
          value={form}
          placeholder="Enter Task"
          onChange={(e) => setForm(e.target.value)}
        />
      </form>
    </div>
  );
}

function TasksContainer({
  isDark,
  tasks,
  toggleCompleted,
  deleteTask,
  sortBy,
}) {
  let sortedTasks;

  if (sortBy === "All") sortedTasks = tasks;

  if (sortBy === "Active")
    sortedTasks = tasks
      .slice()
      .sort((a, b) => Number(a.completed) - Number(b.completed));

  if (sortBy === "Completed")
    sortedTasks = tasks
      .slice()
      .sort((a, b) => Number(b.completed) - Number(a.completed));
  return (
    <ul
      className={` xl:w-[30rem] xl:h-[25rem] ${
        isDark
          ? "bg-slate-800 text-slate-300"
          : "bg-white text-slate-800 shadow-lg"
      } w-[20rem] mx-auto h-[16rem] overflow-scroll rounded-t-md`}
    >
      {sortedTasks.map((task) => (
        <TaskList
          toggleCompleted={toggleCompleted}
          key={task.id}
          description={task.description}
          completed={task.completed}
          id={task.id}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

function TaskList({ description, completed, toggleCompleted, deleteTask, id }) {
  return (
    <li className=" flex px-5 justify-between border-b-2 py-5 w-full mx-auto">
      <input
        className=" form-checkbox h-5 w-5 rounded-full text-blue-400"
        onChange={() => toggleCompleted(id)}
        type="checkbox"
        name=""
        id=""
        value={completed}
      />
      <p className={`${completed ? " line-through text-slate-600" : ""}`}>
        {description}
      </p>
      <button onClick={() => deleteTask(id)} className="">
        X
      </button>
    </li>
  );
}

function Footer({ isDark, setSortBy }) {
  return (
    <ul
      className={`${
        isDark ? "bg-slate-800" : "bg-white shadow-lg"
      }  p-4 text-slate-600 flex justify-center gap-4 mx-auto w-[20rem] rounded-md xl:hidden`}
    >
      <li
        className={`${
          isDark ? "hover:text-white" : "hover:text-black"
        }  hover:font-bold active:text-blue-400`}
        onClick={() => setSortBy("All")}
      >
        All
      </li>
      <li
        className={`${
          isDark ? "hover:text-white" : "hover:text-black"
        }  hover:font-bold active:text-blue-400`}
        onClick={() => setSortBy("Active")}
      >
        Active
      </li>
      <li
        className={`${
          isDark ? "hover:text-white" : "hover:text-black"
        }  hover:font-bold active:text-blue-400`}
        onClick={() => setSortBy("Completed")}
      >
        Completed
      </li>
    </ul>
  );
}

function TaskProgress({ isDark, setSortBy, tasks, handleClearList }) {
  let count = tasks.filter((task) => task.completed !== true);

  return (
    <div
      className={`flex ${
        isDark ? "bg-slate-800" : "bg-white shadow-md"
      }  w-[20rem] mx-auto justify-between text-slate-600 p-5 border-t-2 mb-5 xl:w-[30rem]`}
    >
      <p
        className={`${
          isDark ? "hover:text-white" : "hover:text-black r"
        }  hover:font-bold hover:cursor-pointe active:text-blue-400`}
      >
        {count.length === 0
          ? "No Task Left"
          : count.length === 1
          ? `${count.length} task left`
          : `${count.length} tasks left`}
      </p>
      <div className=" hidden xl:flex gap-2  ">
        <p
          className={`${
            isDark ? "hover:text-white" : "hover:text-black r"
          }  hover:font-bold hover:cursor-pointe active:text-blue-400`}
          onClick={() => setSortBy("All")}
        >
          All
        </p>
        <p
          className={`${
            isDark ? "hover:text-white" : "hover:text-black r"
          }  hover:font-bold hover:cursor-pointe active:text-blue-400`}
          onClick={() => setSortBy("Active")}
        >
          Active
        </p>
        <p
          className={`${
            isDark ? "hover:text-white" : "hover:text-black r"
          }  hover:font-bold hover:cursor-pointe active:text-blue-400`}
          onClick={() => setSortBy("Completed")}
        >
          Completed
        </p>
      </div>
      <p
        className={`${
          isDark ? "hover:text-white" : "hover:text-black r"
        }  hover:font-bold hover:cursor-pointe active:text-blue-400`}
        onClick={handleClearList}
      >
        Clear completed
      </p>
    </div>
  );
}
