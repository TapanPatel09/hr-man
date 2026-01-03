import React, { useRef } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ 
  employee, 
  isEditing, 
  onEditToggle, 
  onSave, 
  onCancel,
  onImageUpload,
  isAdmin,
  isSaving
}) => {
  const fileInputRef = React.useRef(null);

  const handleImageClick = () => {
    if (isEditing && (isAdmin || !isAdmin)) {
      fileInputRef?.current?.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        <div className="relative group">
          <div 
            className={`w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/20 ${
              isEditing ? 'cursor-pointer' : ''
            }`}
            onClick={handleImageClick}
          >
            <Image
              src={employee?.profileImage}
              alt={employee?.profileImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          {isEditing && (
            <div 
              className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth cursor-pointer"
              onClick={handleImageClick}
            >
              <Icon name="Camera" size={32} color="white" />
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-2">
            {employee?.name}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Icon name="Briefcase" size={16} />
              <span>{employee?.position}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Building2" size={16} />
              <span>{employee?.department}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Hash" size={16} />
              <span>ID: {employee?.employeeId}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded-md text-xs font-caption font-medium ${
              employee?.status === 'Active' ?'bg-success/10 text-success' :'bg-error/10 text-error'
            }`}>
              {employee?.status}
            </div>
            <div className="px-3 py-1 rounded-md text-xs font-caption font-medium bg-primary/10 text-primary">
              {employee?.employmentType}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          {!isEditing ? (
            <Button
              variant="default"
              onClick={onEditToggle}
              iconName="Edit"
              iconPosition="left"
              className="flex-1 lg:flex-none"
            >
              Edit Profile
            </Button>
          ) : (
            <>
              <Button
                variant="default"
                onClick={onSave}
                iconName="Save"
                iconPosition="left"
                loading={isSaving}
                className="flex-1 lg:flex-none"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={onCancel}
                iconName="X"
                iconPosition="left"
                disabled={isSaving}
                className="flex-1 lg:flex-none"
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;