import styled from 'styled-components'

import type { ActionButtonProps, StatusBadgeProps, VehicleCardProps, BatteryLevelProps } from '../../../types/style'

const VehicleGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const VehicleCard = styled.div<VehicleCardProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid #e5e7eb;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: ${({ $available }) => ($available ? '#10b981' : '#e5e7eb')};
  }
`

const VehicleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`

const VehicleInfo = styled.div`
  flex: 1;
`

const VehicleName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.25rem 0;
`

const VehicleModel = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0;
`

const StatusBadge = styled.div<StatusBadgeProps>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${({ $color }) => $color}20;
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => $color}40;
`

const VehicleDetails = styled.div`
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #4b5563;
`

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  &last-child {
    margin-bottom: 0;
  }
`

const BatteryBar = styled.div`
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
`

const BatteryLevel = styled.div<BatteryLevelProps>`
  width: ${({ $level }) => $level}%;
  height: 100%;
  background: ${({ $level }) => ($level > 50 ? '#10b981' : $level > 20 ? '#f59e0b' : '#ef4444')};
`

const ActionButton = styled.button<ActionButtonProps>`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  margin-top: auto;

  ${({ $primary, $secondary }) => {
    if ($primary) {
      return `
        background-color: #10b981;
        color: white;
        &:hover {
          background-color: #059669;
          transform: translateY(-1px);
        }
      `
    } else if ($secondary) {
      return `
        background-color: #f59e0b;
        color: white;
        &:hover {
          background-color: #d97706;
          transform: translateY(-1px);
        }
      `
    } else {
      return `
        background-color: #f3f4f6;
        color: #6b7280;
        cursor: not-allowed;
      `
    }
  }}
`

export {
  VehicleGrid,
  VehicleCard,
  VehicleHeader,
  VehicleInfo,
  VehicleName,
  VehicleModel,
  StatusBadge,
  VehicleDetails,
  DetailRow,
  BatteryBar,
  BatteryLevel,
  ActionButton
}
