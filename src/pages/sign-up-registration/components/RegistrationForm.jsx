import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    employeeId: '',
    department: '',
    role: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  const departmentOptions = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'operations', label: 'Operations' },
    { value: 'it', label: 'Information Technology' },
    { value: 'legal', label: 'Legal' }
  ];

  const roleOptions = [
    { value: 'employee', label: 'Employee', description: 'Standard employee access with self-service features' },
    { value: 'admin', label: 'Admin/HR Officer', description: 'Full administrative access with management capabilities' }
  ];

  const validatePassword = (password) => {
    const strength = {
      hasMinLength: password?.length >= 8,
      hasUpperCase: /[A-Z]/?.test(password),
      hasLowerCase: /[a-z]/?.test(password),
      hasNumber: /[0-9]/?.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/?.test(password)
    };
    setPasswordStrength(strength);
    return Object.values(strength)?.every(Boolean);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    if (field === 'password') {
      validatePassword(value);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex?.test(formData?.phone?.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData?.employeeId?.trim()) {
      newErrors.employeeId = 'Employee ID is required';
    } else if (formData?.employeeId?.trim()?.length < 4) {
      newErrors.employeeId = 'Employee ID must be at least 4 characters';
    }

    if (!formData?.department) {
      newErrors.department = 'Please select a department';
    }

    if (!formData?.role) {
      newErrors.role = 'Please select a role';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData?.password)) {
      newErrors.password = 'Password does not meet security requirements';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData?.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
    }, 2000);
  };

  const PasswordStrengthIndicator = () => {
    const requirements = [
      { key: 'hasMinLength', label: 'At least 8 characters', met: passwordStrength?.hasMinLength },
      { key: 'hasUpperCase', label: 'One uppercase letter', met: passwordStrength?.hasUpperCase },
      { key: 'hasLowerCase', label: 'One lowercase letter', met: passwordStrength?.hasLowerCase },
      { key: 'hasNumber', label: 'One number', met: passwordStrength?.hasNumber },
      { key: 'hasSpecialChar', label: 'One special character', met: passwordStrength?.hasSpecialChar }
    ];

    return (
      <div className="mt-3 p-4 bg-muted/50 rounded-lg border border-border">
        <p className="text-sm font-caption font-medium text-foreground mb-3">Password Requirements:</p>
        <div className="space-y-2">
          {requirements?.map(req => (
            <div key={req?.key} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-smooth ${
                req?.met ? 'bg-success' : 'bg-muted-foreground/20'
              }`}>
                {req?.met && <Icon name="Check" size={12} color="white" />}
              </div>
              <span className={`text-xs font-caption transition-smooth ${
                req?.met ? 'text-success' : 'text-muted-foreground'
              }`}>
                {req?.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (showSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-card border border-border rounded-xl p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="CheckCircle2" size={48} color="var(--color-success)" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-4">
            Registration Successful!
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
            Your account has been created successfully. We've sent a verification email to <span className="font-medium text-foreground">{formData?.email}</span>
          </p>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3 text-left">
              <Icon name="Mail" size={24} color="var(--color-primary)" className="flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-sm font-caption font-semibold text-foreground mb-2">
                  Email Verification Required
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Please check your inbox and click the verification link to activate your account. The link will expire in 24 hours.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => window.location?.reload()}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Create Another Account
            </Button>
            <Button
              variant="default"
              onClick={() => navigate('/employee-dashboard')}
              iconName="LogIn"
              iconPosition="right"
            >
              Go to Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 md:p-8">
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            Personal Information
          </h3>
          <p className="text-sm text-muted-foreground">
            Enter your basic personal details
          </p>
        </div>

        <div className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData?.fullName}
            onChange={(e) => handleInputChange('fullName', e?.target?.value)}
            error={errors?.fullName}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@company.com"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              description="We'll send verification email to this address"
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              error={errors?.phone}
              required
            />
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 md:p-8">
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            Employment Details
          </h3>
          <p className="text-sm text-muted-foreground">
            Provide your work-related information
          </p>
        </div>

        <div className="space-y-4">
          <Input
            label="Employee ID"
            type="text"
            placeholder="EMP-12345"
            value={formData?.employeeId}
            onChange={(e) => handleInputChange('employeeId', e?.target?.value)}
            error={errors?.employeeId}
            description="Your unique employee identification number"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Department"
              placeholder="Select your department"
              options={departmentOptions}
              value={formData?.department}
              onChange={(value) => handleInputChange('department', value)}
              error={errors?.department}
              searchable
              required
            />

            <Select
              label="Role"
              placeholder="Select your role"
              options={roleOptions}
              value={formData?.role}
              onChange={(value) => handleInputChange('role', value)}
              error={errors?.role}
              required
            />
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 md:p-8">
        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            Security Credentials
          </h3>
          <p className="text-sm text-muted-foreground">
            Create a strong password for your account
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              error={errors?.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>

          {formData?.password && <PasswordStrengthIndicator />}

          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Re-enter your password"
              value={formData?.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 md:p-8">
        <Checkbox
          label="I agree to the Terms and Conditions"
          description="By creating an account, you agree to our Terms of Service and Privacy Policy"
          checked={formData?.termsAccepted}
          onChange={(e) => handleInputChange('termsAccepted', e?.target?.checked)}
          error={errors?.termsAccepted}
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={() => navigate('/employee-dashboard')}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Sign In
        </Button>
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={loading}
          iconName="UserPlus"
          iconPosition="right"
        >
          Create Account
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;