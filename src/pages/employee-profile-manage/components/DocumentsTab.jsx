import React, { useRef, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentsTab = ({ employee, isEditing, onDocumentUpload, onDocumentDelete, isAdmin }) => {
  const fileInputRef = React.useRef(null);
  const [uploadingType, setUploadingType] = React.useState(null);

  const handleUploadClick = (docType) => {
    setUploadingType(docType);
    fileInputRef?.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file && uploadingType && onDocumentUpload) {
      onDocumentUpload(uploadingType, file);
      setUploadingType(null);
    }
  };

  const documentTypes = [
    {
      type: 'resume',
      label: 'Resume/CV',
      icon: 'FileText',
      description: 'Upload your latest resume or curriculum vitae'
    },
    {
      type: 'idProof',
      label: 'ID Proof',
      icon: 'CreditCard',
      description: 'Government issued identification document'
    },
    {
      type: 'addressProof',
      label: 'Address Proof',
      icon: 'Home',
      description: 'Utility bill or bank statement as address proof'
    },
    {
      type: 'education',
      label: 'Educational Certificates',
      icon: 'GraduationCap',
      description: 'Degree certificates and transcripts'
    },
    {
      type: 'experience',
      label: 'Experience Letters',
      icon: 'Briefcase',
      description: 'Previous employment experience letters'
    },
    {
      type: 'contract',
      label: 'Employment Contract',
      icon: 'FileSignature',
      description: 'Signed employment agreement'
    }
  ];

  const getDocumentStatus = (docType) => {
    const doc = employee?.documents?.find(d => d?.type === docType);
    return doc ? 'uploaded' : 'pending';
  };

  const getDocumentInfo = (docType) => {
    return employee?.documents?.find(d => d?.type === docType);
  };

  return (
    <div className="space-y-6">
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 md:p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Shield" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-1">Secure Document Storage</h4>
            <p className="text-sm text-muted-foreground">
              All documents are encrypted and stored securely. Only authorized personnel can access your documents.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {documentTypes?.map((docType) => {
          const status = getDocumentStatus(docType?.type);
          const docInfo = getDocumentInfo(docType?.type);

          return (
            <div
              key={docType?.type}
              className="bg-card border border-border rounded-xl p-6 transition-smooth hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name={docType?.icon} size={24} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground mb-1">
                      {docType?.label}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {docType?.description}
                    </p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-md text-xs font-caption font-medium ${
                  status === 'uploaded' ?'bg-success/10 text-success' :'bg-warning/10 text-warning'
                }`}>
                  {status === 'uploaded' ? 'Uploaded' : 'Pending'}
                </div>
              </div>
              {status === 'uploaded' && docInfo ? (
                <div className="space-y-3">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground truncate">
                        {docInfo?.fileName}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {docInfo?.fileSize}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Calendar" size={12} />
                      <span>Uploaded: {docInfo?.uploadDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Eye"
                      iconPosition="left"
                      className="flex-1"
                    >
                      View
                    </Button>
                    {isEditing && isAdmin && (
                      <Button
                        variant="destructive"
                        size="sm"
                        iconName="Trash2"
                        onClick={() => onDocumentDelete?.(docType?.type)}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-muted/50 border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Icon name="Upload" size={32} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      No document uploaded
                    </p>
                  </div>
                  {isEditing && isAdmin && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Upload"
                      iconPosition="left"
                      onClick={() => handleUploadClick(docType?.type)}
                      fullWidth
                    >
                      Upload Document
                    </Button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default DocumentsTab;