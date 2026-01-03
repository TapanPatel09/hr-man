import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import RoleGuard from '../../components/ui/RoleGuard';
import Icon from '../../components/AppIcon';
import ProfileHeader from './components/ProfileHeader';
import PersonalDetailsTab from './components/PersonalDetailsTab';
import JobDetailsTab from './components/JobDetailsTab';
import SalaryStructureTab from './components/SalaryStructureTab';
import DocumentsTab from './components/DocumentsTab';
import EmployeeSelector from './components/EmployeeSelector';

const EmployeeProfileManagement = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const mockEmployees = [
  {
    employeeId: "EMP001",
    name: "Sarah Johnson",
    email: "sarah.johnson@dayflow.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    maritalStatus: "Married",
    address: "123 Main Street, Apartment 4B",
    city: "New York",
    state: "New York",
    zipCode: "10001",
    country: "United States",
    emergencyContactName: "Michael Johnson",
    emergencyContactRelation: "Spouse",
    emergencyContactPhone: "+1 (555) 123-4568",
    emergencyContactEmail: "michael.johnson@email.com",
    position: "Senior Software Engineer",
    department: "Engineering",
    employmentType: "Full-time",
    workLocation: "New York Office",
    status: "Active",
    dateOfJoining: "2020-03-15",
    probationEndDate: "2020-09-15",
    contractEndDate: "2025-03-14",
    yearsOfService: "4.8 years",
    reportingManager: "David Chen",
    managerEmail: "david.chen@dayflow.com",
    team: "Backend Development",
    shiftTiming: "9:00 AM - 6:00 PM",
    annualSalary: 95000,
    basicSalary: 60000,
    hra: 15000,
    transportAllowance: 5000,
    specialAllowance: 15000,
    performanceBonus: 8000,
    annualBonus: 12000,
    healthInsurance: 3000,
    lifeInsurance: 1500,
    taxDeduction: 18000,
    providentFund: 7200,
    professionalTax: 2400,
    otherDeductions: 1000,
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_12474730f-1763296027036.png",
    profileImageAlt: "Professional headshot of Sarah Johnson with shoulder-length brown hair wearing navy blue blazer in office setting",
    documents: [
    {
      type: "resume",
      fileName: "Sarah_Johnson_Resume.pdf",
      fileSize: "245 KB",
      uploadDate: "03/15/2020"
    },
    {
      type: "idProof",
      fileName: "Drivers_License.pdf",
      fileSize: "180 KB",
      uploadDate: "03/15/2020"
    },
    {
      type: "contract",
      fileName: "Employment_Contract_2020.pdf",
      fileSize: "320 KB",
      uploadDate: "03/15/2020"
    }]

  },
  {
    employeeId: "EMP002",
    name: "Michael Rodriguez",
    email: "michael.rodriguez@dayflow.com",
    phone: "+1 (555) 234-5678",
    dateOfBirth: "1988-08-22",
    gender: "Male",
    maritalStatus: "Single",
    address: "456 Oak Avenue, Suite 12",
    city: "Los Angeles",
    state: "California",
    zipCode: "90001",
    country: "United States",
    emergencyContactName: "Maria Rodriguez",
    emergencyContactRelation: "Mother",
    emergencyContactPhone: "+1 (555) 234-5679",
    emergencyContactEmail: "maria.rodriguez@email.com",
    position: "Product Manager",
    department: "Product",
    employmentType: "Full-time",
    workLocation: "Los Angeles Office",
    status: "Active",
    dateOfJoining: "2019-06-01",
    probationEndDate: "2019-12-01",
    contractEndDate: "2024-05-31",
    yearsOfService: "5.6 years",
    reportingManager: "Jennifer Lee",
    managerEmail: "jennifer.lee@dayflow.com",
    team: "Product Strategy",
    shiftTiming: "8:30 AM - 5:30 PM",
    annualSalary: 105000,
    basicSalary: 65000,
    hra: 18000,
    transportAllowance: 6000,
    specialAllowance: 16000,
    performanceBonus: 10000,
    annualBonus: 15000,
    healthInsurance: 3500,
    lifeInsurance: 2000,
    taxDeduction: 21000,
    providentFund: 7800,
    professionalTax: 2400,
    otherDeductions: 1200,
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_138df7967-1763295321074.png",
    profileImageAlt: "Professional headshot of Michael Rodriguez with short black hair wearing gray suit and blue tie in corporate office",
    documents: [
    {
      type: "resume",
      fileName: "Michael_Rodriguez_CV.pdf",
      fileSize: "280 KB",
      uploadDate: "06/01/2019"
    },
    {
      type: "education",
      fileName: "MBA_Certificate.pdf",
      fileSize: "420 KB",
      uploadDate: "06/01/2019"
    }]

  }];


  const [currentEmployee, setCurrentEmployee] = useState(mockEmployees?.[0]);
  const [editedEmployee, setEditedEmployee] = useState(mockEmployees?.[0]);

  useEffect(() => {
    const storedUser = localStorage.getItem('dayflowUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      if (parsedUser?.role === 'employee') {
        const employeeData = mockEmployees?.find((emp) => emp?.email === parsedUser?.email) || mockEmployees?.[0];
        setCurrentEmployee(employeeData);
        setEditedEmployee(employeeData);
      }
    } else {
      navigate('/sign-up-registration');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('dayflowUser');
    setUser(null);
    navigate('/sign-up-registration');
  };

  const handleEmployeeChange = (employee) => {
    setCurrentEmployee(employee);
    setEditedEmployee(employee);
    setIsEditing(false);
  };

  const handleFieldChange = (field, value) => {
    setEditedEmployee((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedEmployee(currentEmployee);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setCurrentEmployee(editedEmployee);
      setIsEditing(false);
      setIsSaving(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }, 1500);
  };

  const handleCancel = () => {
    setEditedEmployee(currentEmployee);
    setIsEditing(false);
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedEmployee((prev) => ({
        ...prev,
        profileImage: reader?.result
      }));
    };
    reader?.readAsDataURL(file);
  };

  const handleDocumentUpload = (docType, file) => {
    const newDoc = {
      type: docType,
      fileName: file?.name,
      fileSize: `${(file?.size / 1024)?.toFixed(0)} KB`,
      uploadDate: new Date()?.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    };

    setEditedEmployee((prev) => ({
      ...prev,
      documents: [...(prev?.documents || [])?.filter((d) => d?.type !== docType), newDoc]
    }));
  };

  const handleDocumentDelete = (docType) => {
    setEditedEmployee((prev) => ({
      ...prev,
      documents: (prev?.documents || [])?.filter((d) => d?.type !== docType)
    }));
  };

  const tabs = [
  { id: 'personal', label: 'Personal Details', icon: 'User' },
  { id: 'job', label: 'Job Information', icon: 'Briefcase' },
  { id: 'salary', label: 'Salary Structure', icon: 'DollarSign' },
  { id: 'documents', label: 'Documents', icon: 'FileText' }];


  if (!user) {
    return null;
  }

  const isAdmin = user?.role === 'admin';

  return (
    <RoleGuard user={user}>
      <div className="min-h-screen bg-background">
        <AppHeader user={user} onLogout={handleLogout} />
        
        <div className="pt-16">
          <NavigationBreadcrumb user={user} />
          
          <main className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
            {showSuccessMessage &&
            <div className="mb-6 bg-success/10 border border-success/20 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} color="var(--color-success)" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-success">Profile Updated Successfully</p>
                  <p className="text-sm text-success/80">Your changes have been saved.</p>
                </div>
              </div>
            }

            {isAdmin &&
            <EmployeeSelector
              employees={mockEmployees}
              currentEmployee={currentEmployee}
              onEmployeeChange={handleEmployeeChange} />

            }

            <ProfileHeader
              employee={editedEmployee}
              isEditing={isEditing}
              onEditToggle={handleEditToggle}
              onSave={handleSave}
              onCancel={handleCancel}
              onImageUpload={handleImageUpload}
              isAdmin={isAdmin}
              isSaving={isSaving} />


            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="border-b border-border overflow-x-auto">
                <div className="flex min-w-max">
                  {tabs?.map((tab) =>
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-caption text-sm font-medium transition-smooth flex-shrink-0 ${
                    activeTab === tab?.id ?
                    'text-primary border-b-2 border-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`
                    }>

                      <Icon name={tab?.icon} size={18} />
                      <span>{tab?.label}</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6 md:p-8">
                {activeTab === 'personal' &&
                <PersonalDetailsTab
                  employee={editedEmployee}
                  isEditing={isEditing}
                  onChange={handleFieldChange}
                  isAdmin={isAdmin} />

                }
                {activeTab === 'job' &&
                <JobDetailsTab
                  employee={editedEmployee}
                  isEditing={isEditing}
                  onChange={handleFieldChange}
                  isAdmin={isAdmin} />

                }
                {activeTab === 'salary' &&
                <SalaryStructureTab
                  employee={editedEmployee}
                  isEditing={isEditing}
                  onChange={handleFieldChange}
                  isAdmin={isAdmin} />

                }
                {activeTab === 'documents' &&
                <DocumentsTab
                  employee={editedEmployee}
                  isEditing={isEditing}
                  onDocumentUpload={handleDocumentUpload}
                  onDocumentDelete={handleDocumentDelete}
                  isAdmin={isAdmin} />

                }
              </div>
            </div>
          </main>
        </div>
      </div>
    </RoleGuard>);

};

export default EmployeeProfileManagement;