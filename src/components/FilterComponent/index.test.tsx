import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import FilterComponent from './index';

describe("Filter component",()=>{
    test("should render the lable for first name",()=>{
        render(<FilterComponent/>);
        const elementdata = screen.getByText('First Name');
        expect(elementdata).not.toBeNull();
    });

    test("should render the lable for last name",()=>{
        render(<FilterComponent/>);
        const elementdata = screen.getByText('Last Name');
        expect(elementdata).not.toBeNull();
    });

    test("should render the lable for email",()=>{
        render(<FilterComponent/>);
        const elementdata = screen.getByText('Email');
        expect(elementdata).not.toBeNull();
    });

    it('should call handleChange when first name fields are changed', () => {
        const handleChange = ()=>{};
        render(<FilterComponent handleChange={handleChange} />);
    
        const firstNameInput = screen.getByPlaceholderText('First Name');
        expect(firstNameInput).not.toBeNull()
        
        fireEvent.change(firstNameInput, { target: { value: 'test' } });
        expect(firstNameInput).not.toBeUndefined()

    });

    it('should call handleChange when last name fields are changed', () => {
        const handleChange = ()=>{};
        render(<FilterComponent handleChange={handleChange} />);
    
        const firstNameInput = screen.getByPlaceholderText('Last Name');
        expect(firstNameInput).not.toBeNull()
        
        fireEvent.change(firstNameInput, { target: { value: 'patel' } });
        expect(firstNameInput).not.toBeUndefined()

    });
});
