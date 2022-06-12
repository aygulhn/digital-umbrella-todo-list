import React from "react";
import { Col, Row, Card, Tag, Checkbox, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Task = ({ task, editTask, deleteTask, changeStatus }) => (
  <Card type="inner" title={task.subject}>
    <Row>
      <Col span={24}>
        {task.tags?.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Col>
    </Row>
    <Row style={{marginTop: '10px'}}>
      <Col span={8}>
        <Checkbox
          checked={task.isCompleted}
          onChange={(e) => changeStatus(e.target.checked, task)}
        >
          Completed
        </Checkbox>
      </Col>
      <Col span={2} offset={14}>
        <Space>
          <DeleteOutlined onClick={() => deleteTask(task)} />
          <EditOutlined onClick={() => editTask(task)} />
        </Space>
      </Col>
    </Row>
  </Card>
);

export default Task;
