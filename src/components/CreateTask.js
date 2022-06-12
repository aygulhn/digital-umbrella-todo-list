import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Row, Col } from "antd";
import TaskForm from "./TaskForm";

const CreateTask = ({ task }) => {
  const newTask = task ? task : { tags: [], subject: "" };
  const [form] = Form.useForm();

  let navigate = useNavigate();

  const createTask = (taskFields) => {
    const newTask = {
      ...taskFields,
      isComplited: false,
      id: Math.floor(Math.random() * 100),
    };
    const storageTaskList = JSON.parse(localStorage.getItem("taskList"));
    const taskList = storageTaskList
      ? [...storageTaskList, newTask]
      : [newTask];
    localStorage.setItem("taskList", JSON.stringify(taskList));
    navigate("/");
  };

  return (
    <Row justify="center">
      <Col span={10}>
        <Card>
          <Form form={form} onFinish={createTask}>
            <TaskForm task={newTask} />
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Task
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateTask;
