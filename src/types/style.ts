interface ActionButtonProps {
  $primary?: boolean
  $secondary?: boolean
  $danger?: boolean
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}

interface StatusBadgeProps {
  $color: string
}

interface VehicleCardProps {
  $available: boolean
}

interface BatteryLevelProps {
  $level: number
}

export type { ActionButtonProps, StatusBadgeProps, VehicleCardProps, BatteryLevelProps }
