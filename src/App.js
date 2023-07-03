import React, { useEffect, useState, useMemo } from "react";
import { Table, Pagination } from "react-bootstrap";
import axios from "axios";
const App = () => {
  const [myTable, setMyTable] = useState([]);
  const [page, setPage] = useState(1);
  const [newTable, setNewTable] = useState([]);

  const paginate = useMemo(
    () => myTable.filter((item, index) => !(index % 10)),
    [myTable]
  );

  useEffect(() => {
    setNewTable(myTable.slice((page - 1) * 10, page * 10));
  }, [myTable, page]);

  useEffect(() => {
    if (!newTable.length && page !== 1) {
      setPage((last) => last - 1);
    }
  }, [newTable]);

  useEffect(() => {
    const getTable = async () => {
      try {
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        setMyTable(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTable();
  }, []);
  return (
    <>
      {" "}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {newTable.map((item, index) => (
            <tr key={index}>
              <td
                onClick={() => {
                  setMyTable((prev) => {
                    const temp = [...prev];
                    temp.splice((page - 1) * 10 + index, 1);
                    return [...temp];
                  });
                }}
              >
                {index + 1}
              </td>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td
                onClick={() => {
                  const status = item.completed;
                  setNewTable((prev) => {
                    const temp = [...prev];
                    temp[index].completed = !status;
                    return [...temp];
                  });
                }}
                style={{ backgroundColor: item.completed ? "green" : "red" }}
              >
                {item.completed?.toString()}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {paginate.map((item, index) => (
          <Pagination.Item
            key={index}
            active={page === index + 1}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
};

export default App;
