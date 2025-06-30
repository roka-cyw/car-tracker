import styled from 'styled-components'
import type { ActionButtonProps } from '../../../types/style'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const MapSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  margin-bottom: 2rem;
`

const BackButton = styled.div`
  width: fit-content;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e5e7eb;
    transform: translateY(-1px);
  }
`

const ActionButton = styled.button<ActionButtonProps>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  margin-right: 1rem;

  ${({ $primary, $danger }) => {
    if ($primary) {
      return `
        background-color: #10b981;
        color: white;
        &:hover {
          background-color: #059669;
          transform: translateY(-1px);
        }
      `
    } else if ($danger) {
      return `
        background-color: #ef4444;
        color: white;
        &:hover {
          background-color: #dc2626;
          transform: translateY(-1px);
        }
      `
    } else {
      return `
        background-color: #f3f4f6;
        color: #6b7280;
        border: 1px solid #d1d5db;
        &:hover {
          background-color: #e5e7eb;
        }
      `
    }
  }}
`

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ef4444;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
`

export { Container, MapSection, BackButton, ActionButton, ErrorMessage }
