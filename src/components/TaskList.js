import React, { useEffect, useState } from "react";
import { Button, Col, Layout, Select, Row } from "antd";
import { useNavigate } from "react-router-dom";
import Task from "./Task";
import EditTask from "./EditTask";
import { tagListDefault } from "../config";

const { Header, Content } = Layout;
const { Option } = Select;

const TaskList = () => {
  let navigate = useNavigate();

  const [taskList, setTaskList] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    setTaskList(JSON.parse(localStorage.getItem("taskList")));
  }, []);

  const openEditTaskModal = (task) => {
    setIsEditModalVisible(true);
    setCurrentTask(task);
  };

  const closeEditTaskModal = () => {
    setIsEditModalVisible(false);
    setCurrentTask(null);
  };

  const handleClick = () => {
    navigate("/create");
  };

  const deleteTask = (currentTask) => {
    const newTaskList = taskList;
    newTaskList.splice(
      newTaskList.findIndex((task) => task.id === currentTask.id),
      1
    );
    updateTaskList(newTaskList);
  };

  const changeStatus = (isCompleted, currentTask) => {
    const newTaskList = taskList.map((t) =>
      t.id === currentTask.id ? { ...t, isCompleted } : t
    );
    updateTaskList(newTaskList);
  };

  const onSearch = (searchText) => {
    const taskListStorage = JSON.parse(localStorage.getItem("taskList")) || [];
    if (!searchText.length) {
      setTaskList([...taskListStorage]);
      return;
    }
    const searchTaskList = taskListStorage.filter((task) =>
      searchText.every((s) => task.tags?.includes(s))
    );

    setTaskList([...searchTaskList]);
  };

  const updateTaskList = (newTaskList) => {
    localStorage.setItem("taskList", JSON.stringify(newTaskList));
    setTaskList([...newTaskList]);
  };

  return (
    <Layout>
      <Header>
        <Row justify="center">
          <Col span={10}>
            <Select
              mode="multiple"
              tokenSeparators={[","]}
              style={{ width: "100%" }}
              placeholder="Search tags"
              onChange={onSearch}
              allowClear={true}
            >
              {tagListDefault?.map((tag) => (
                <Option key={tag}>{tag}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Header>
      <Content>
        <Row align="middle" style={{ margin: "20px" }}>
          <Button onClick={handleClick}>New Task +</Button>
        </Row>
        {taskList?.map((task) => (
          <Row justify="center">
            <Col span={10} style={{ margin: "10px" }}>
              <Task
                key={task.id}
                task={task}
                editTask={(task) => openEditTaskModal(task)}
                deleteTask={(task) => deleteTask(task)}
                changeStatus={(isCompleted, task) =>
                  changeStatus(isCompleted, task)
                }
              />
            </Col>
          </Row>
        ))}
        {isEditModalVisible && (
          <EditTask
            task={currentTask}
            isModalVisible={isEditModalVisible}
            closeModal={() => closeEditTaskModal()}
            updateTaskList={updateTaskList}
          />
        )}
      </Content>
    </Layout>
  );
};

export default TaskList;
