import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import KickstarterProjects from './kickstarterProjects';
import { fetchProjectsData } from '../../utils/kickstarterPropject';

// Mock the API call
jest.mock('../../utils/kickstarterPropject', () => ({
  fetchProjectsData: jest.fn(),
}));

// Sample data for the test
const mockProjectsData = [
  { "s.no": 1, "percentage.funded": 751, "amt.pledged": 10000 },
  { "s.no": 2, "percentage.funded": 50, "amt.pledged": 5000 },
  { "s.no": 3, "percentage.funded": 80, "amt.pledged": 8000 },
  { "s.no": 4, "percentage.funded": 65, "amt.pledged": 6500 },
  { "s.no": 5, "percentage.funded": 90, "amt.pledged": 9000 },
  { "s.no": 6, "percentage.funded": 40, "amt.pledged": 4000 },
];

describe('KickstarterProjects Component', () => {
  beforeEach(() => {
    fetchProjectsData.mockResolvedValue(mockProjectsData);
  });

  test('renders loading state initially', () => {
    render(<KickstarterProjects />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders error message when the API fails', async () => {
    fetchProjectsData.mockRejectedValueOnce(new Error('Failed to fetch data'));

    render(<KickstarterProjects />);

    await waitFor(() => expect(screen.getByText(/Failed to fetch data/i)).toBeInTheDocument());
  });

  test('renders the table correctly after data is fetched', async () => {
    render(<KickstarterProjects />);
  
    // Wait for the table to render
    await waitFor(() => expect(screen.getByTestId('kickstarter-projects-table')).toBeInTheDocument());
  
    // Check if the table headers are rendered
    expect(screen.getByRole('columnheader', { name: /S.No./i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Percentage funded/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Amount pledged/i})).toBeInTheDocument();
  
    // Check if the first row data is rendered correctly
    expect(screen.getByTestId("s.no-2", {name: 2})).toBeInTheDocument()
    expect(screen.getByTestId("percentage.funded-50", {name: 50})).toBeInTheDocument()
    expect(screen.getByTestId("amt.pledged-5000", {name: 5000})).toBeInTheDocument()
  });

  test('handles pagination correctly', async () => {
    render(<KickstarterProjects />);

    await waitFor(() => expect(screen.getByTestId('kickstarter-projects-table')).toBeInTheDocument());


    // check pagination render
    expect(screen.getByTestId("pagination-prev")).toBeInTheDocument()
    expect(screen.getByTestId("pagination-next")).toBeInTheDocument()
    expect(screen.getByTestId("pagination-1")).toBeInTheDocument()

    // Simulate clicking on the "next" page
    fireEvent.click(screen.getByTestId("pagination-next"));


    expect(screen.getByTestId("s.no-6", {name: 6})).toBeInTheDocument()
     // Simulate clicking on the "prev" page 
     fireEvent.click(screen.getByTestId("pagination-prev"));
     expect(screen.getByTestId("s.no-1", {name: 1})).toBeInTheDocument()
  });

  test('handles page size change correctly', async () => {
    render(<KickstarterProjects />);
    await waitFor(() => expect(screen.getByTestId('kickstarter-projects-table')).toBeInTheDocument());

    // Check initial page size (5 items per page)
    expect(screen.getByTestId("pagination-1")).toBeInTheDocument()
    expect(screen.getByTestId("pagination-2")).toBeInTheDocument()

    // Change page size to 10
    fireEvent.change(screen.getByTestId("page-size"), { target: { value: '10' } });
    expect(screen.getByTestId("s.no-6", {name: 6})).toBeInTheDocument();
    
  });
});
