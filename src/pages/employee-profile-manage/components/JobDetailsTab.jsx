import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const JobDetailsTab = ({ employee, isEditing, onChange, isAdmin }) => {
  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Briefcase" size={20} />
          Employment Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Input
            label="Employee ID"
            type="text"
            value={employee?.employeeId}
            disabled
          />
          <Input
            label="Position/Title"
            type="text"
            value={employee?.position}
            onChange={(e) => onChange('position', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
            required
          />
          <Input
            label="Department"
            type="text"
            value={employee?.department}
            onChange={(e) => onChange('department', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
            required
          />
          <Input
            label="Employment Type"
            type="text"
            value={employee?.employmentType}
            onChange={(e) => onChange('employmentType', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
            required
          />
          <Input
            label="Work Location"
            type="text"
            value={employee?.workLocation}
            onChange={(e) => onChange('workLocation', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
            required
          />
          <Input
            label="Employment Status"
            type="text"
            value={employee?.status}
            onChange={(e) => onChange('status', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
            required
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Calendar" size={20} />
          Employment Timeline
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Input
            label="Date of Joining"
            type="date"
            value={employee?.dateOfJoining}
            onChange={(e) => onChange('dateOfJoining', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
            required
          />
          <Input
            label="Probation End Date"
            type="date"
            value={employee?.probationEndDate}
            onChange={(e) => onChange('probationEndDate', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
          />
          <Input
            label="Contract End Date"
            type="date"
            value={employee?.contractEndDate}
            onChange={(e) => onChange('contractEndDate', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
          />
          <Input
            label="Years of Service"
            type="text"
            value={employee?.yearsOfService}
            disabled
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Users" size={20} />
          Reporting Structure
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Input
            label="Reporting Manager"
            type="text"
            value={employee?.reportingManager}
            onChange={(e) => onChange('reportingManager', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
            required
          />
          <Input
            label="Manager Email"
            type="email"
            value={employee?.managerEmail}
            onChange={(e) => onChange('managerEmail', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
          />
          <Input
            label="Team/Group"
            type="text"
            value={employee?.team}
            onChange={(e) => onChange('team', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
          />
          <Input
            label="Shift Timing"
            type="text"
            value={employee?.shiftTiming}
            onChange={(e) => onChange('shiftTiming', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsTab;