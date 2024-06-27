import React, { useState, useEffect } from 'react';
import './employe.css';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        setError(error.message);
        alert('Failed to fetch data'); // Alert message for failed data fetch
      }
    };

    fetchEmployeeData();
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
    <div className="employee-table-container">
      <h1>Employee Data Table</h1>
      {error && <p className="error">{error}</p>}
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
        <button className="page-number" disabled>{currentPage}</button>
        <button onClick={handleNext} disabled={currentPage === Math.ceil(employees.length / rowsPerPage)}>Next</button>
      </div>
    </div>
  );
};

export default EmployeeTable;


