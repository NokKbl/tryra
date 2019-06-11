import React from 'react';

import { Layout } from 'antd';
import { Table, Tag } from 'antd';
import { Row, Col } from 'antd';
import { Input } from 'antd';
import AddNewUser from './AddNewUser';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';
import './App.css';

const { Header, Content } = Layout;
const { Column } = Table;
const Search = Input.Search;

/* If need to add more role(s), add here */
export type Role = 'Admin' | 'Reader' | 'Writer';

/* Interface for data type in each column in table */
interface Column {
  title: string;
  dataIndex: string;
  key: string;
  render?: (roles: Role[]) => React.ReactNode;
}

/* Interface for data type of each user  */
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  roles: Role[];
}

const column: Column[] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName"
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName"
  },
  {
    title: "Roles",
    dataIndex: "roles",
    key: "roles",
    render: (roles: Role[]) => (
      <span>
        {roles.map(role => {
          let color = role.length > 5 ? 'geekblue' : 'green';
          if (role === 'Admin') {
            color = 'purple';
          } else if (role === 'Writer') {
            color = 'orange';
          } else {
            color = 'blue';
          }
          return (
            <Tag color={color} key={role}>
              {role.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  }
]

export const data: User[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Brown',
    roles: ['Admin', 'Writer'],
  },
  {
    id: 2,
    firstName: 'Jim',
    lastName: 'Green',
    roles: ['Reader'],
  },
  {
    id: 3,
    firstName: 'Joe',
    lastName: 'Black',
    roles: ['Writer', 'Reader'],
  },
];

const App: React.FC = () => {

  function handleSearch(value: string): User[]{
    const result: User[] = [];
    data.forEach(element => {
      if ((element.firstName.toLowerCase()).includes(value.toLowerCase())
       || (element.lastName.toLowerCase()).includes(value.toLowerCase())) result.push(element);
    });
    
    return result;
  };

  // const searchPage = 

  function handleShowSearchResult(value: string): void{
    ReactDOM.render(<Table dataSource={handleSearch(value)} columns={column} />, document.getElementById('root'));
  }

  return (
    <div className="App">
      <Layout>
        <Header>
          <Row type="flex" justify="center">
            <Col span={6}></Col>
            <Col span={3}>
              <AddNewUser />
            </Col>
            <Col span={9}>
              <Search
                placeholder="input search text"
                onSearch={value => handleShowSearchResult(value)}
                style={{ width: 400, paddingLeft: 15 }}
              />
            </Col>
            <Col span={6}></Col>
          </Row>
        </Header>
        <Content style={{ padding: '0 100px', margin: 64 }}>
          <Table dataSource={data} columns={column} />
        </Content>
      </Layout>
    </div >
  );
}

export default App;
