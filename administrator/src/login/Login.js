import React, { useState } from "react";
import axios from "axios";
//import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined} from '@ant-design/icons';
//import { Icon } from '@ant-design/compatible';
//import { Icon } from 'antd';
import '../assets/css/style.css'
//import Icon from "@ant-design/icons/lib/components/Icon";


const LoginMethod = () => {
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [form, setForm] = useState({ username: "", userpwd: "" });
  const [loginTip, setLoginTip] = useState("");

  const login = () => {
    if (form.username !== "" && form.userpwd !== "") {
      axios
        .post("http://localhost:3000/adminlogin", {
          username: form.username,
          password: form.userpwd,
        })
        .then((res) => {
          console.log("datadata:", res.data);
          if (res.data.status === 0) {
            navigate("/AdminHome");
          } else if (res.data.status === -1) {
            setLoginTip("用户名或密码错误");
            setUsernameError(true);
          } else if (res.data.status === 1) {
            setLoginTip("密码错误");
            setPasswordError(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoginTip("登录失败，请稍后重试");
        });
    } else {
      alert("填写不能为空！");
    }
  };


  return (
    <div className="login">
      <div className="login-content-wrap">
        <div className="login-content">
        <img className="logo" src={require("../assets/images/vvan.jpg")} alt="logo"/>

          <div className="login-from">
            <div className="login-tip">{loginTip}</div>
                <Input
                  prefix={<UserOutlined />} 
                  style={{ color: "rgba(0,0,0,.25)" }}
                  placeholder="用户名"
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                />
                {usernameError && (
                  <span className="errTips">* 用户名填写错误 *</span>
                )}
                <Input
                  prefix={<LockOutlined />}
                  style={{ color: "rgba(0,0,0,.25)" }}
                  type="password"
                  placeholder="密码"
                  value={form.userpwd}
                  onChange={e => setForm({ ...form, userpwd: e.target.value })}
                />
                {passwordError && (
                  <span className="errTips">* 密码填写错误 *</span>
                )}
                <Button type="primary" htmlType="submit" className="login-form-button" onClick={login}>
                  登录
                </Button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginMethod;
