import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const EmployeeAttendanceList = ({ employees, onViewDetails, onUpdateStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
    { value: 'HR', label: 'Human Resources' },
    { value: 'Finance', label: 'Finance' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Present', label: 'Present' },
    { value: 'Absent', label: 'Absent' },
    { value: 'Half-day', label: 'Half-day' },
    { value: 'Leave', label: 'Leave' }
  ];

  const filteredEmployees = employees?.filter(emp => {
    const matchesSearch = emp?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         emp?.employeeId?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || emp?.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || emp?.todayStatus === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const colors = {
      'Present': 'bg-success/20 text-success',
      'Absent': 'bg-error/20 text-error',
      'Half-day': 'bg-warning/20 text-warning',
      'Leave': 'bg-primary/20 text-primary'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'Present': 'CheckCircle',
      'Absent': 'XCircle',
      'Half-day': 'Clock',
      'Leave': 'Calendar'
    };
    return icons?.[status] || 'Circle';
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 md:mb-6">
          Employee Attendance Records
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <Input
            type="search"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="md:col-span-1"
          />

          <Select
            options={departmentOptions}
            value={departmentFilter}
            onChange={setDepartmentFilter}
            placeholder="Filter by department"
          />

          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-caption font-medium text-muted-foreground">
                Employee
              </th>
              <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-caption font-medium text-muted-foreground">
                Department
              </th>
              <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-caption font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-caption font-medium text-muted-foreground">
                Check In
              </th>
              <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-caption font-medium text-muted-foreground">
                Check Out
              </th>
              <th className="text-left px-4 md:px-6 py-3 md:py-4 text-xs md:text-sm font-caption font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredEmployees?.map((employee) => (
              <tr key={employee?.employeeId} className="hover:bg-muted/30 transition-smooth">
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={employee?.avatar}
                        alt={employee?.avatarAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm md:text-base font-medium text-foreground truncate">
                        {employee?.name}
                      </span>
                      <span className="text-xs md:text-sm text-muted-foreground">
                        {employee?.employeeId}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <span className="text-sm md:text-base text-muted-foreground">
                    {employee?.department}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <div className="flex items-center gap-2">
                    <Icon 
                      name={getStatusIcon(employee?.todayStatus)} 
                      size={18} 
                      color={
                        employee?.todayStatus === 'Present' ? 'var(--color-success)' :
                        employee?.todayStatus === 'Absent' ? 'var(--color-error)' :
                        employee?.todayStatus === 'Half-day' ? 'var(--color-warning)' :
                        'var(--color-primary)'
                      }
                    />
                    <span className={`px-2 md:px-3 py-1 rounded-md text-xs md:text-sm font-medium ${getStatusBadge(employee?.todayStatus)}`}>
                      {employee?.todayStatus}
                    </span>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <span className="text-sm md:text-base text-foreground">
                    {employee?.checkIn || '--:--'}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <span className="text-sm md:text-base text-foreground">
                    {employee?.checkOut || '--:--'}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(employee)}
                      iconName="Eye"
                    >
                      <span className="hidden md:inline">View</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUpdateStatus(employee)}
                      iconName="Edit"
                    >
                      <span className="hidden md:inline">Edit</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredEmployees?.length === 0 && (
        <div className="p-8 md:p-12 text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Users" size={32} className="text-muted-foreground" />
          </div>
          <h4 className="text-base md:text-lg font-heading font-semibold text-foreground mb-2">
            No Employees Found
          </h4>
          <p className="text-sm md:text-base text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
      <div className="p-4 md:p-6 border-t border-border bg-muted/30">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">
            Showing {filteredEmployees?.length} of {employees?.length} employees
          </span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendanceList;