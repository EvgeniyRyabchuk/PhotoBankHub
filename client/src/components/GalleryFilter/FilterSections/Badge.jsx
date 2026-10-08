import React from 'react';
import { Chip, Box } from '@mui/material';

export const Badge = ({
  children,
  label,
  variant = 'filled', // 'filled' | 'outlined'
  color = 'default',   // 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
  size = 'small',      // 'small' | 'medium'
  dot = false,
  dotColor = 'primary.main',
  icon,
  removable = false,
  onRemove,
  sx = {},
  ...props
}) => {
  const badgeLabel = label || children;

  return (
    <Chip
      label={
        dot ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              component="span"
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: dotColor,
                display: 'inline-block',
              }}
            />
            {badgeLabel}
          </Box>
        ) : (
          badgeLabel
        )
      }
      variant={variant}
      color={color}
      size={size}
      icon={icon}
      onDelete={removable ? onRemove : undefined}
      sx={{
        fontWeight: 500,
        ...sx,
      }}
      {...props}
    />
  );
};

export default Badge;




    //   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    //                 // Basic Variants
    //                 <Badge variant="primary">Primary</Badge>
    //                 <Badge variant="success">Success</Badge>
    //                 <Badge variant="warning">Warning</Badge>
    //                 <Badge variant="danger">Danger</Badge>

    //                 {/* Outlined & Custom Roundedness */}
    //                 <Badge variant="info" outlined rounded="md">Outlined</Badge>

    //                 {/* Status Dot */}
    //                 <Badge variant="success" dot>Active</Badge>

    //                 {/* Removable Tag */}
    //                 <Badge variant="default" removable onRemove={() => {}}>React</Badge>

    //                 {/* Custom Sizes */}
    //                 <Badge size="sm" variant="primary">Small</Badge>
    //                 <Badge size="lg" variant="primary">Large</Badge>
    //         </div>