import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SalaryStructureTab = ({ employee, isEditing, onChange, isAdmin }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="DollarSign" size={20} />
          Compensation Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Input
            label="Annual Salary (USD)"
            type="number"
            value={employee?.annualSalary}
            onChange={(e) => onChange('annualSalary', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
            required
          />
          <Input
            label="Monthly Salary (USD)"
            type="text"
            value={formatCurrency(employee?.annualSalary / 12)}
            disabled
          />
          <Input
            label="Basic Salary (USD)"
            type="number"
            value={employee?.basicSalary}
            onChange={(e) => onChange('basicSalary', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
            required
          />
          <Input
            label="House Rent Allowance (USD)"
            type="number"
            value={employee?.hra}
            onChange={(e) => onChange('hra', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
          />
          <Input
            label="Transport Allowance (USD)"
            type="number"
            value={employee?.transportAllowance}
            onChange={(e) => onChange('transportAllowance', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
          />
          <Input
            label="Special Allowance (USD)"
            type="number"
            value={employee?.specialAllowance}
            onChange={(e) => onChange('specialAllowance', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Gift" size={20} />
          Benefits & Bonuses
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Input
            label="Performance Bonus (USD)"
            type="number"
            value={employee?.performanceBonus}
            onChange={(e) => onChange('performanceBonus', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
          />
          <Input
            label="Annual Bonus (USD)"
            type="number"
            value={employee?.annualBonus}
            onChange={(e) => onChange('annualBonus', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
          />
          <Input
            label="Health Insurance (USD)"
            type="number"
            value={employee?.healthInsurance}
            onChange={(e) => onChange('healthInsurance', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
          />
          <Input
            label="Life Insurance (USD)"
            type="number"
            value={employee?.lifeInsurance}
            onChange={(e) => onChange('lifeInsurance', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Icon name="Minus" size={20} />
          Deductions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Input
            label="Tax Deduction (USD)"
            type="number"
            value={employee?.taxDeduction}
            onChange={(e) => onChange('taxDeduction', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
          />
          <Input
            label="Provident Fund (USD)"
            type="number"
            value={employee?.providentFund}
            onChange={(e) => onChange('providentFund', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
          />
          <Input
            label="Professional Tax (USD)"
            type="number"
            value={employee?.professionalTax}
            onChange={(e) => onChange('professionalTax', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
          />
          <Input
            label="Other Deductions (USD)"
            type="number"
            value={employee?.otherDeductions}
            onChange={(e) => onChange('otherDeductions', e?.target?.value)}
            disabled={!isEditing || !isAdmin}
          />
        </div>
      </div>
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Net Monthly Salary</p>
            <p className="text-2xl md:text-3xl font-heading font-bold text-primary">
              {formatCurrency((employee?.annualSalary / 12) - (employee?.taxDeduction + employee?.providentFund + employee?.professionalTax + employee?.otherDeductions))}
            </p>
          </div>
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="TrendingUp" size={32} color="var(--color-primary)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryStructureTab;