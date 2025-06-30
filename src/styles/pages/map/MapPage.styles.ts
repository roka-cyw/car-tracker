import styled from 'styled-components'
import type { ActionButtonProps, StatusBadgeProps } from '../../../types/style'

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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`

const VehicleInfo = styled.div`
  flex: 1;
`

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: bold;
  color: #111827;
  margin: 0 0 0.5rem 0;
`

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
`

const StatusSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`

const StatusBadge = styled.div<StatusBadgeProps>`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${({ $color }) => $color}20;
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => $color}40;
`

const ControlPanel = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  margin-bottom: 1rem;
`

const ControlPanelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const InfoCard = styled.div`
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`

const InfoLabel = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 0.25rem;
`

const InfoValue = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
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

export {
  Container,
  MapSection,
  BackButton,
  Header,
  VehicleInfo,
  Title,
  Subtitle,
  StatusSection,
  StatusBadge,
  ControlPanel,
  ControlPanelGrid,
  InfoCard,
  InfoLabel,
  InfoValue,
  ActionButton,
  ErrorMessage
}
