import React from 'react';
import './App.css';
import { employees } from './data/employees';
import TeamSection from './components/TeamSection';

function App() {
  // Filter employees by department
  const engineeringMembers = employees.filter(
    (emp) => emp.department === 'Engineering'
  );
  const designMembers = employees.filter(
    (emp) => emp.department === 'Design'
  );
  const productMembers = employees.filter(
    (emp) => emp.department === 'Product'
  );
  
  // Empty department to demonstrate stretch goal for handling empty sections
  const supportMembers = [];

  // Calculate stats dynamically
  const totalEmployees = employees.length;
  const uniqueDepartments = [...new Set(employees.map(emp => emp.department))];
  const totalDepartments = uniqueDepartments.length;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">TechNova — Team Directory</h1>
        <p className="app-subtitle">
          {totalEmployees} employees across {totalDepartments} departments
        </p>
      </header>

      <main>
        {/* Render one TeamSection per department */}
        <TeamSection department="Engineering" members={engineeringMembers} />
        <TeamSection department="Design" members={designMembers} />
        <TeamSection department="Product" members={productMembers} />
        
        {/* Render an empty Support department to verify the empty state fallback */}
        <TeamSection department="Support" members={supportMembers} />
      </main>
    </div>
  );
}

export default App;
