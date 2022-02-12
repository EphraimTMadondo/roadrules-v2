import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef } from 'react';

export interface ToastProps {
  onClose: () => void;
  message: string;
  messageType: "success" | "error" | "warning" | "info";
}

const Alert = forwardRef<HTMLDivElement, AlertProps>( function Alert ( props, ref, ) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
} );

export function Toast ( props: ToastProps ) {

  const { onClose, message } = props;

  const handleClose = ( _?: React.SyntheticEvent | Event, reason?: string ) => {

    if ( reason === 'clickaway' )
      return;

    onClose();

  };

  return (
    <Snackbar
      open={true}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )

}