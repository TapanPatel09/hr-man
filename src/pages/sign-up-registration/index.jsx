import React from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';
import SecurityBadges from './components/SecurityBadges';

const SignUpRegistration = () => {
  return (
    <>
      <Helmet>
        <title>Sign Up - Dayflow HRMS</title>
        <meta name="description" content="Create your Dayflow HRMS account to access employee self-service features and HR management tools" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="w-full py-8 md:py-12 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Briefcase" size={32} color="var(--color-primary)" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
                  Dayflow HRMS
                </h1>
              </div>

              <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-3">
                Create Your Account
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Join Dayflow HRMS to streamline your HR operations and access comprehensive employee management tools
              </p>
            </div>

            <RegistrationForm />
            <SecurityBadges />

            <div className="text-center mt-8 md:mt-12">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <a 
                  href="/employee-dashboard" 
                  className="text-primary font-medium hover:underline transition-smooth"
                >
                  Sign in here
                </a>
              </p>
            </div>

            <footer className="mt-12 md:mt-16 pt-8 border-t border-border">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-muted-foreground">
                <p>&copy; {new Date()?.getFullYear()} Dayflow HRMS. All rights reserved.</p>
                <div className="flex items-center gap-4 md:gap-6">
                  <a href="#" className="hover:text-foreground transition-smooth">Privacy Policy</a>
                  <a href="#" className="hover:text-foreground transition-smooth">Terms of Service</a>
                  <a href="#" className="hover:text-foreground transition-smooth">Support</a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpRegistration;