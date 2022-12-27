import React from "react";
import ToDoList from "./ToDoList";
import Apifunctions from "./apis";


const Home = () => {
	return (
		<div className="text-center">
		<ToDoList />
		<Apifunctions />
		</div>
	);
};

export default Home;
