import React, { useState, useEffect } from 'react';
import './employe.css';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

 const fetchEmployeeData = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      if (!response.ok) {
        throw new Error('failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      alert(error.message);
      return [];
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchEmployeeData();
      setEmployees(data);
    };
    getData();
  }, []);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = employees.slice(indexOfFirstRow, indexOfLastRow);

  const handleNext = () => {
    if (currentPage < Math.ceil(employees.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
        <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='footer'>
        <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
        <button >{` ${currentPage} `}</button >
        <button onClick={handleNext} disabled={currentPage === Math.ceil(employees.length / rowsPerPage)}>Next</button>
      </div>
    </div>
  );
};

export default EmployeeTable;
