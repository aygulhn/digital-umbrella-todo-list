import React from "react";
import { Input, Select, Form } from "antd";
import { tagListDefault } from "../config";
const { Option } = Select;

const TaskForm = ({ task }) => {
  return (
    <>
      <Form.Item name="subject" rules={[{ required: true }]}>
        <Input placeholder="Add subject" />
      </Form.Item>
      <Form.Item name="tags">
        <Select
          mode="multiple"
          tokenSeparators={[","]}
          style={{ width: "100%" }}
          placeholder="Tags"
          defaultValue={task.tags}
        >
          {tagListDefault?.map((tag) => (
            <Option key={tag}>{tag}</Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default TaskForm;
