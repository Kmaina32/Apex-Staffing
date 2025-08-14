import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/about/page';

describe('AboutPage', () => {
  it('renders the main heading', () => {
    render(<AboutPage />);

    const heading = screen.getByRole('heading', {
      name: /About Apex Staffing Group/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders the mission, vision, and values cards', () => {
    render(<AboutPage />);
    
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(screen.getByText('Our Vision')).toBeInTheDocument();
    expect(screen.getByText('Our Values')).toBeInTheDocument();
  });
});
