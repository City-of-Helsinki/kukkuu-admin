import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

type MetricLabelWithTooltipProps = {
  label: string;
  tooltip: string;
  component?: 'span' | 'div';
};

const MetricLabelWithTooltip = ({
  label,
  tooltip,
  component = 'span',
}: MetricLabelWithTooltipProps) => (
  <Box
    component={component}
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 0.5,
    }}
  >
    <Typography component="span" variant="inherit">
      {label}
    </Typography>
    <Tooltip title={tooltip} enterTouchDelay={0} arrow>
      <IconButton
        size="small"
        aria-label={tooltip}
        onClick={(e) => e.stopPropagation()}
        sx={{ padding: 0.25, color: 'text.secondary' }}
      >
        <InfoOutlinedIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  </Box>
);

export default MetricLabelWithTooltip;
