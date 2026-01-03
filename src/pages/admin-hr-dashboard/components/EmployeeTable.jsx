import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const EmployeeTable = ({ employees }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const filteredAndSortedEmployees = React.useMemo(() => {
    let filtered = employees?.filter(emp => 
      emp?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      emp?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      emp?.employeeId?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        if (a?.[sortConfig?.key] < b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (a?.[sortConfig?.key] > b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [employees, searchTerm, sortConfig]);

  const getStatusColor = (status) => {
    const colors = {
      'Present': 'bg-success/10 text-success',
      'Absent': 'bg-error/10 text-error',
      'Half-day': 'bg-warning/10 text-warning',
      'Leave': 'bg-primary/10 text-primary'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Employee Directory
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="search"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full sm:w-64"
            />
            <Button variant="outline" iconName="Download" iconPosition="left">
              Export
            </Button>
          </div>
        </div>
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 text-sm font-caption font-medium text-muted-foreground hover:text-foreground transition-smooth"
                >
                  Employee
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('employeeId')}
                  className="flex items-center gap-2 text-sm font-caption font-medium text-muted-foreground hover:text-foreground transition-smooth"
                >
                  Employee ID
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('department')}
                  className="flex items-center gap-2 text-sm font-caption font-medium text-muted-foreground hover:text-foreground transition-smooth"
                >
                  Department
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-sm font-caption font-medium text-muted-foreground">
                  Status
                </span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-sm font-caption font-medium text-muted-foreground">
                  Last Activity
                </span>
              </th>
              <th className="px-6 py-4 text-right">
                <span className="text-sm font-caption font-medium text-muted-foreground">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredAndSortedEmployees?.map((employee) => (
              <tr key={employee?.id} className="hover:bg-muted/30 transition-smooth">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={employee?.avatar}
                      alt={employee?.avatarAlt}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{employee?.name}</p>
                      <p className="text-xs text-muted-foreground">{employee?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-foreground font-mono">{employee?.employeeId}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-foreground">{employee?.department}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-caption font-medium ${getStatusColor(employee?.status)}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {employee?.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-muted-foreground">{employee?.lastActivity}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    onClick={() => navigate('/employee-profile-management', { state: { employeeId: employee?.id } })}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-border">
        {filteredAndSortedEmployees?.map((employee) => (
          <div key={employee?.id} className="p-4 hover:bg-muted/30 transition-smooth">
            <div className="flex items-start gap-3 mb-3">
              <Image
                src={employee?.avatar}
                alt={employee?.avatarAlt}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-foreground mb-1">{employee?.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{employee?.email}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-mono text-muted-foreground">{employee?.employeeId}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{employee?.department}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-caption font-medium ${getStatusColor(employee?.status)}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                {employee?.status}
              </span>
              <Button
                variant="ghost"
                size="sm"
                iconName="Eye"
                onClick={() => navigate('/employee-profile-management', { state: { employeeId: employee?.id } })}
              >
                View
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-2">{employee?.lastActivity}</p>
          </div>
        ))}
      </div>
      {filteredAndSortedEmployees?.length === 0 && (
        <div className="p-8 md:p-12 text-center">
          <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No employees found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;