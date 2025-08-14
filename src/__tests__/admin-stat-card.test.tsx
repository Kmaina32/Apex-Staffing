import { render, screen } from '@testing-library/react';
import { AdminStatCard } from '@/components/admin/admin-stat-card';
import { Briefcase } from 'lucide-react';

describe('AdminStatCard', () => {
  it('renders the title, value, and icon', () => {
    render(
      <AdminStatCard
        title="Total Jobs"
        value="125"
        icon={<Briefcase data-testid="briefcase-icon" />}
      />
    );

    expect(screen.getByText('Total Jobs')).toBeInTheDocument();
    expect(screen.getByText('125')).toBeInTheDocument();
    expect(screen.getByTestId('briefcase-icon')).toBeInTheDocument();
  });

  it('renders the description when provided', () => {
    render(
      <AdminStatCard
        title="Total Candidates"
        value="500"
        icon={<Briefcase />}
        description="+10 this week"
      />
    );

    expect(screen.getByText('Total Candidates')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('+10 this week')).toBeInTheDocument();
  });

  it('does not render a description when not provided', () => {
    render(
      <AdminStatCard
        title="Total Applications"
        value="1000"
        icon={<Briefcase />}
      />
    );
    const description = screen.queryByText(/\+/); // Example check
    expect(description).not.toBeInTheDocument();
  });
});
