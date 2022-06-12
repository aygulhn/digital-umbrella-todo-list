import React, { useEffect } from "react";
import { Card, Modal, Form } from "antd";
import TaskForm from "./TaskForm";

const EditTask = ({ isModalVisible, task, closeModal, updateTaskList }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      subject: task?.subject,
      tags: task?.tags,
    });
  }, []);

  const editTask = (editedTaskFields) => {
    const taskList = JSON.parse(localStorage.getItem("taskList"));
    const newTaskList = taskList.map((t) =>
      t.id === task.id ? { ...t, ...editedTaskFields } : t
    );
    updateTaskList(newTaskList)
    closeModal();
  };

  return (
    <Modal visible={isModalVisible} onCancel={closeModal} onOk={form.submit}>
      <Card>
        <Form form={form} onFinish={editTask}>
          <TaskForm task={task} />
        </Form>
      </Card>
    </Modal>
  );
};

export default EditTask;
