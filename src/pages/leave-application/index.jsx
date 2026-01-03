import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import RoleGuard from '../../components/ui/RoleGuard';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';
import LeaveTypeCard from './components/LeaveTypeCard';
import LeaveHistoryCard from './components/LeaveHistoryCard';
import PolicyInfoPanel from './components/PolicyInfoPanel';
import LeaveBalanceCard from './components/LeaveBalanceCard';

const LeaveApplication = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedLeaveType, setSelectedLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newRequestId, setNewRequestId] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('dayflowUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/sign-up-registration');
    }
  }, [navigate]);

  const leaveTypes = [
    {
      type: 'Paid',
      balance: 15,
      description: 'Annual paid leave for planned vacations and personal time off with full salary'
    },
    {
      type: 'Sick',
      balance: 8,
      description: 'Medical leave for health-related absences with medical certificate requirement'
    },
    {
      type: 'Unpaid',
      balance: '∞',
      description: 'Extended leave without salary for personal reasons subject to approval'
    }
  ];

  const leaveHistory = [
    {
      requestId: 'LR2026001',
      leaveType: 'Paid',
      startDate: '2025-12-20',
      endDate: '2025-12-24',
      status: 'Approved',
      remarks: 'Family vacation during holiday season',
      appliedDate: '2025-12-01',
      approvedDate: '2025-12-03',
      managerComment: 'Approved. Enjoy your vacation!'
    },
    {
      requestId: 'LR2025089',
      leaveType: 'Sick',
      startDate: '2025-11-15',
      endDate: '2025-11-16',
      status: 'Approved',
      remarks: 'Flu symptoms and fever',
      appliedDate: '2025-11-15',
      approvedDate: '2025-11-15',
      managerComment: 'Get well soon. Medical certificate received.'
    },
    {
      requestId: 'LR2025067',
      leaveType: 'Paid',
      startDate: '2025-10-10',
      endDate: '2025-10-12',
      status: 'Rejected',
      remarks: 'Personal work',
      appliedDate: '2025-10-05',
      approvedDate: '2025-10-06',
      managerComment: 'Unable to approve due to critical project deadline. Please reschedule.'
    },
    {
      requestId: 'LR2026002',
      leaveType: 'Paid',
      startDate: '2026-01-15',
      endDate: '2026-01-17',
      status: 'Pending',
      remarks: 'Attending family function',
      appliedDate: '2026-01-02',
      approvedDate: null,
      managerComment: null
    }
  ];

  const leaveBalances = {
    paid: 15,
    sick: 8,
    unpaid: '∞'
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedLeaveType) {
      newErrors.leaveType = 'Please select a leave type';
    }

    if (!startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const today = new Date();
      today?.setHours(0, 0, 0, 0);

      if (start < today && selectedLeaveType !== 'Sick') {
        newErrors.startDate = 'Start date cannot be in the past (except for sick leave)';
      }

      if (end < start) {
        newErrors.endDate = 'End date must be after start date';
      }

      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      if (selectedLeaveType === 'Paid' && diffDays > 15) {
        newErrors.endDate = 'Paid leave cannot exceed 15 consecutive days';
      }

      const noticeDate = new Date(today);
      noticeDate?.setDate(noticeDate?.getDate() + 2);

      if (selectedLeaveType === 'Paid' && start < noticeDate) {
        newErrors.startDate = 'Paid leave requires minimum 2 days notice';
      }

      if (selectedLeaveType === 'Unpaid') {
        const unpaidNoticeDate = new Date(today);
        unpaidNoticeDate?.setDate(unpaidNoticeDate?.getDate() + 7);
        
        if (start < unpaidNoticeDate) {
          newErrors.startDate = 'Unpaid leave requires minimum 7 days notice';
        }
      }
    }

    if (!remarks?.trim()) {
      newErrors.remarks = 'Please provide a reason for your leave request';
    } else if (remarks?.trim()?.length < 10) {
      newErrors.remarks = 'Remarks must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const requestId = `LR${new Date()?.getFullYear()}${String(Math.floor(Math.random() * 1000))?.padStart(3, '0')}`;
      setNewRequestId(requestId);
      setShowSuccessModal(true);
      setIsSubmitting(false);

      setSelectedLeaveType('');
      setStartDate('');
      setEndDate('');
      setRemarks('');
      setErrors({});
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem('dayflowUser');
    navigate('/sign-up-registration');
  };

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  if (!user) {
    return null;
  }

  return (
    <RoleGuard user={user}>
      <div className="min-h-screen bg-background">
        <AppHeader user={user} onLogout={handleLogout} />

        <div className="pt-16">
          <NavigationBreadcrumb user={user} />

          <main className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
                Leave Application
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Submit your leave request and track approval status
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2 space-y-6 md:space-y-8">
                <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-6 md:mb-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="FileText" size={24} color="var(--color-primary)" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                        New Leave Request
                      </h2>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Fill in the details to submit your leave application
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                    <div>
                      <label className="block text-sm md:text-base font-caption font-medium text-foreground mb-3 md:mb-4">
                        Select Leave Type *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                        {leaveTypes?.map((leave) => (
                          <LeaveTypeCard
                            key={leave?.type}
                            type={leave?.type}
                            balance={leave?.balance}
                            description={leave?.description}
                            isSelected={selectedLeaveType === leave?.type}
                            onClick={() => {
                              setSelectedLeaveType(leave?.type);
                              setErrors({ ...errors, leaveType: '' });
                            }}
                          />
                        ))}
                      </div>
                      {errors?.leaveType && (
                        <p className="mt-2 text-xs md:text-sm text-error flex items-center gap-1.5">
                          <Icon name="AlertCircle" size={14} />
                          {errors?.leaveType}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <Input
                        type="date"
                        label="Start Date"
                        required
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e?.target?.value);
                          setErrors({ ...errors, startDate: '' });
                        }}
                        error={errors?.startDate}
                        min={new Date()?.toISOString()?.split('T')?.[0]}
                      />

                      <Input
                        type="date"
                        label="End Date"
                        required
                        value={endDate}
                        onChange={(e) => {
                          setEndDate(e?.target?.value);
                          setErrors({ ...errors, endDate: '' });
                        }}
                        error={errors?.endDate}
                        min={startDate || new Date()?.toISOString()?.split('T')?.[0]}
                      />
                    </div>

                    {startDate && endDate && (
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 md:p-5">
                        <div className="flex items-center gap-3">
                          <Icon name="Calendar" size={20} color="var(--color-primary)" />
                          <div>
                            <p className="text-sm md:text-base font-caption font-medium text-foreground">
                              Total Leave Duration
                            </p>
                            <p className="text-lg md:text-xl font-heading font-bold text-primary">
                              {calculateDays()} {calculateDays() === 1 ? 'day' : 'days'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm md:text-base font-caption font-medium text-foreground mb-2">
                        Remarks / Reason *
                      </label>
                      <textarea
                        value={remarks}
                        onChange={(e) => {
                          setRemarks(e?.target?.value);
                          setErrors({ ...errors, remarks: '' });
                        }}
                        placeholder="Please provide detailed reason for your leave request..."
                        rows={4}
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-smooth resize-none"
                      />
                      {errors?.remarks && (
                        <p className="mt-2 text-xs md:text-sm text-error flex items-center gap-1.5">
                          <Icon name="AlertCircle" size={14} />
                          {errors?.remarks}
                        </p>
                      )}
                      <p className="mt-2 text-xs md:text-sm text-muted-foreground">
                        Minimum 10 characters required
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6 border-t border-border">
                      <Button
                        type="submit"
                        variant="default"
                        size="lg"
                        loading={isSubmitting}
                        iconName="Send"
                        iconPosition="left"
                        className="flex-1"
                      >
                        Submit Leave Request
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => {
                          setSelectedLeaveType('');
                          setStartDate('');
                          setEndDate('');
                          setRemarks('');
                          setErrors({});
                        }}
                        iconName="RotateCcw"
                        iconPosition="left"
                        className="flex-1 sm:flex-initial"
                      >
                        Reset Form
                      </Button>
                    </div>
                  </form>
                </div>

                {selectedLeaveType && (
                  <PolicyInfoPanel leaveType={selectedLeaveType} />
                )}

                <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-6 md:mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <Icon name="History" size={24} color="var(--color-secondary)" />
                      </div>
                      <div>
                        <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                          Leave History
                        </h2>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          Your previous leave requests and their status
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 md:space-y-5">
                    {leaveHistory?.map((request) => (
                      <LeaveHistoryCard key={request?.requestId} request={request} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6 md:space-y-8">
                <LeaveBalanceCard balances={leaveBalances} />

                <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 md:p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Icon name="Lightbulb" size={20} color="var(--color-accent)" />
                    <div>
                      <h3 className="text-sm md:text-base font-heading font-semibold text-foreground mb-2">
                        Quick Tips
                      </h3>
                      <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-0.5">•</span>
                          <span>Plan your leave in advance for better approval chances</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-0.5">•</span>
                          <span>Check team calendar before applying for leave</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-0.5">•</span>
                          <span>Provide detailed remarks for faster processing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-0.5">•</span>
                          <span>Medical certificate required for sick leave &gt; 3 days</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-4 md:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon name="HelpCircle" size={20} color="var(--color-primary)" />
                    <h3 className="text-sm md:text-base font-heading font-semibold text-foreground">
                      Need Help?
                    </h3>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mb-4">
                    Contact HR department for leave policy clarifications or approval status inquiries.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="Mail"
                    iconPosition="left"
                  >
                    Contact HR
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>

        {showSuccessModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50">
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 max-w-md w-full shadow-2xl">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-success/10 rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <Icon name="CheckCircle" size={32} color="var(--color-success)" />
                </div>

                <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-2">
                  Leave Request Submitted!
                </h3>

                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                  Your leave request has been successfully submitted and is pending manager approval.
                </p>

                <div className="w-full bg-muted/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs md:text-sm font-caption text-muted-foreground">Request ID</span>
                    <span className="text-sm md:text-base font-caption font-semibold text-foreground">{newRequestId}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-caption text-muted-foreground">Estimated Response</span>
                    <span className="text-sm md:text-base font-caption font-semibold text-foreground">2-3 business days</span>
                  </div>
                </div>

                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  onClick={() => setShowSuccessModal(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
};

export default LeaveApplication;