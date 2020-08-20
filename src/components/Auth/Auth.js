import React, {useEffect, useState} from "react";
import './Auth.css';
import 'antd/dist/antd.css';
import {Tabs, Form, Input, Button, Select, message} from 'antd';
import {
    LoginOutlined,
    LogoutOutlined,
    UserOutlined,
    LockOutlined,
    MailOutlined,
    SecurityScanOutlined,
} from '@ant-design/icons'
import {useDispatch, useSelector} from "react-redux";
import {signInAction, signUpAction} from "../../store/action/authAction";

const {TabPane} = Tabs;
const {Option} = Select;

const Auth = props => {
    const AuthReducer = useSelector(state => state.AuthReducer);
    const dispatch = useDispatch();

    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if(AuthReducer.error){
            message.error(AuthReducer.error);
        }
        if(AuthReducer.loading){
            message.info("Loading...");
        }
        if(AuthReducer.tokenId){
            message.success("Signed In...");
            console.log(AuthReducer.tokenId);
        }
    },[AuthReducer.error, AuthReducer.loading])
    const onFinish = () => {
        if (isSignIn === true) {
            //SignIn
            const data = {
                email: email,
                password: password
            }
            dispatch(signInAction(data));
        } else {
            //SignUp
            const data = {
                name: name,
                email: email,
                password: password,
                role: role
            }
            dispatch(signUpAction(data));
        }
    };

    const tabChangeHandler = activeTab => {
        setIsSignIn(activeTab);
        setEmail("");
        setPassword("");
        setName("");
        setRole("user");
    };

    const inputChangeHandler = (field, event) => {
        let value = event;
        if(field !== "role") {
            value = event.target.value;
        }
        switch (field) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'role':
                setRole(value);
                break;
            default:
                break;
        }
    };

    return (
        <div className="Auth">
            <div className="tabLayout">
                <Tabs defaultActiveKey={isSignIn} centered className="tabs"
                      onChange={activeKey => tabChangeHandler(activeKey)}>
                    <TabPane tab={<span><LoginOutlined/> Sign In</span>} key="true" className="tabs-content">
                        <Form name="normal_login" className="login-form" onFinish={onFinish}>
                            <div className="inputField">
                                <Form.Item name="email" rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}>
                                    <Input prefix={<MailOutlined/>} type="email" placeholder="Email Address"
                                           value={email}
                                           onChange={e => inputChangeHandler("email", e)}/>
                                </Form.Item>
                            </div>
                            <div className="inputField">
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                        },
                                    ]}
                                >
                                    <Input.Password prefix={<LockOutlined/>} placeholder="Password" value={password}
                                                    onChange={e => inputChangeHandler("password", e)}/>
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item>
                                    <Button type="text" htmlType="submit" className="btnSignIn">
                                        SIGN IN
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </TabPane>
                    <TabPane tab={<span><LogoutOutlined/> Sign Up</span>} key="false" className="tabs-content">
                        <Form name="normal_login" className="login-form" onFinish={onFinish}>
                            <div className="inputField">
                                <Form.Item name="name" rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Full Name!',
                                    },
                                ]}>
                                    <Input prefix={<UserOutlined/>} type="text" placeholder="Full Name" value={name}
                                           onChange={e => inputChangeHandler("name", e)}/>
                                </Form.Item>
                            </div>
                            <div className="inputField">
                                <Form.Item name="email" rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}>
                                    <Input prefix={<MailOutlined/>} type="email" placeholder="Email Address"
                                           value={email}
                                           onChange={e => inputChangeHandler("email", e)}/>
                                </Form.Item>
                            </div>
                            <div className="inputField">
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password prefix={<LockOutlined/>} placeholder="Password"/>
                                </Form.Item>
                            </div>
                            <div className="inputField">
                                <Form.Item
                                    name="confirmPassword"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({getFieldValue}) => ({
                                            validator(rule, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }

                                                return Promise.reject('The two passwords that you entered do not match!');
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password prefix={<LockOutlined/>} placeholder="Re-enter Password"
                                                    value={password}
                                                    onChange={e => inputChangeHandler("password", e)}/>
                                </Form.Item>
                            </div>
                            <div className="inputField">
                                <Form.Item>
                                    <Select defaultValue={role} style={{textAlign: "left"}}
                                            onChange={({value}) => inputChangeHandler("role", value)}>
                                        <Option prefix={<SecurityScanOutlined/>} value="user">User</Option>
                                        <Option prefix={<SecurityScanOutlined/>} value="publisher">Publisher</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item>
                                    <Button type="text" htmlType="submit" className="btnSignUp">
                                        SIGN UP
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default Auth;