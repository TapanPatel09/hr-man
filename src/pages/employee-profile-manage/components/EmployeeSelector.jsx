import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EmployeeSelector = ({ employees, currentEmployee, onEmployeeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = employees?.filter(emp =>
    emp?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    emp?.employeeId?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    emp?.department?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const handleSelect = (employee) => {
    onEmployeeChange(employee);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-card border border-border rounded-xl p-4 flex items-center justify-between transition-smooth hover:shadow-md"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
            <Image
              src={currentEmployee?.profileImage}
              alt={currentEmployee?.profileImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <p className="font-heading font-semibold text-foreground">
              {currentEmployee?.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {currentEmployee?.employeeId} • {currentEmployee?.department}
            </p>
          </div>
        </div>
        <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={20} />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-50 max-h-96 overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Icon
                  name="Search"
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="overflow-y-auto max-h-80">
              {filteredEmployees?.map((employee) => (
                <button
                  key={employee?.employeeId}
                  onClick={() => handleSelect(employee)}
                  className={`w-full p-4 flex items-center gap-3 transition-smooth hover:bg-muted ${
                    employee?.employeeId === currentEmployee?.employeeId
                      ? 'bg-primary/5' :''
                  }`}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
                    <Image
                      src={employee?.profileImage}
                      alt={employee?.profileImageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-heading font-semibold text-foreground text-sm">
                      {employee?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {employee?.employeeId} • {employee?.department}
                    </p>
                  </div>
                  {employee?.employeeId === currentEmployee?.employeeId && (
                    <Icon name="Check" size={18} color="var(--color-primary)" />
                  )}
                </button>
              ))}
              {filteredEmployees?.length === 0 && (
                <div className="p-8 text-center">
                  <Icon name="Users" size={48} className="mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">No employees found</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeSelector;