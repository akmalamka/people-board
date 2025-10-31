import type { ButtonProps } from '@mui/material/Button'
import type { ReactNode } from 'react'
import Button from '@mui/material/Button'

interface ActionButtonProps extends ButtonProps {
  label: string
  icon: ReactNode
}

/**
 * A reusable button that shows label on desktop,
 * and only icon on mobile for a cleaner layout.
 */
export default function ActionButton({ label, icon, ...props }: ActionButtonProps) {
  return (
    <Button
      variant="outlined"
      size="small"
      startIcon={icon}
      {...props}
      sx={{
        'minWidth': 40,
        'whiteSpace': 'nowrap',
        'textTransform': 'none',
        ...props.sx,
        // hide text on small screens
        '@media (max-width:900px)': {
          '& .MuiButton-startIcon': { margin: 0 },
          '& .MuiButton-endIcon': { margin: 0 },
          '& .MuiButton-label': { display: 'none' },
          '& .MuiButton-startIcon + *': { display: 'none' },
        },
      }}
    >
      <span>
        {label}
      </span>
    </Button>
  )
}
