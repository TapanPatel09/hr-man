import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PersonalDetailsTab = ({ employee, isEditing, onChange, isAdmin }) => {
  const canEdit = (field) => {
    if (isAdmin) return true;
    return ['phone', 'address', 'city', 'state', 'zipCode', 'country']?.includes(field);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="User" size={20} />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Input
            label="Full Name"
            type="text"
            value={employee?.name}
            onChange={(e) => onChange('name', e?.target?.value)}
            disabled={!isEditing || !canEdit('name')}
            required
          />
          <Input
            label="Email Address"
            type="email"
            value={employee?.email}
            onChange={(e) => onChange('email', e?.target?.value)}
            disabled={!isEditing || !canEdit('email')}
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            value={employee?.phone}
            onChange={(e) => onChange('phone', e?.target?.value)}
            disabled={!isEditing || !canEdit('phone')}
            required
          />
          <Input
            label="Date of Birth"
            type="date"
            value={employee?.dateOfBirth}
            onChange={(e) => onChange('dateOfBirth', e?.target?.value)}
            disabled={!isEditing || !canEdit('dateOfBirth')}
            required
          />
          <Input
            label="Gender"
            type="text"
            value={employee?.gender}
            onChange={(e) => onChange('gender', e?.target?.value)}
            disabled={!isEditing || !canEdit('gender')}
          />
          <Input
            label="Marital Status"
            type="text"
            value={employee?.maritalStatus}
            onChange={(e) => onChange('maritalStatus', e?.target?.value)}
            disabled={!isEditing || !canEdit('maritalStatus')}
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="MapPin" size={20} />
          Address Information
        </h3>
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          <Input
            label="Street Address"
            type="text"
            value={employee?.address}
            onChange={(e) => onChange('address', e?.target?.value)}
            disabled={!isEditing || !canEdit('address')}
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="City"
              type="text"
              value={employee?.city}
              onChange={(e) => onChange('city', e?.target?.value)}
              disabled={!isEditing || !canEdit('city')}
              required
            />
            <Input
              label="State/Province"
              type="text"
              value={employee?.state}
              onChange={(e) => onChange('state', e?.target?.value)}
              disabled={!isEditing || !canEdit('state')}
              required
            />
            <Input
              label="ZIP/Postal Code"
              type="text"
              value={employee?.zipCode}
              onChange={(e) => onChange('zipCode', e?.target?.value)}
              disabled={!isEditing || !canEdit('zipCode')}
              required
            />
            <Input
              label="Country"
              type="text"
              value={employee?.country}
              onChange={(e) => onChange('country', e?.target?.value)}
              disabled={!isEditing || !canEdit('country')}
              required
            />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Phone" size={20} />
          Emergency Contact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Input
            label="Contact Name"
            type="text"
            value={employee?.emergencyContactName}
            onChange={(e) => onChange('emergencyContactName', e?.target?.value)}
            disabled={!isEditing || !canEdit('emergencyContactName')}
            required
          />
          <Input
            label="Relationship"
            type="text"
            value={employee?.emergencyContactRelation}
            onChange={(e) => onChange('emergencyContactRelation', e?.target?.value)}
            disabled={!isEditing || !canEdit('emergencyContactRelation')}
            required
          />
          <Input
            label="Contact Phone"
            type="tel"
            value={employee?.emergencyContactPhone}
            onChange={(e) => onChange('emergencyContactPhone', e?.target?.value)}
            disabled={!isEditing || !canEdit('emergencyContactPhone')}
            required
          />
          <Input
            label="Contact Email"
            type="email"
            value={employee?.emergencyContactEmail}
            onChange={(e) => onChange('emergencyContactEmail', e?.target?.value)}
            disabled={!isEditing || !canEdit('emergencyContactEmail')}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsTab;