import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';

interface ErrorCardProps {
  children: React.ReactNode;
}

export function ErrorCard ( props: ErrorCardProps ) {

  const { children } = props;

  return (
    <Card sx={{ minWidth: 275 }}>

      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="red">
          {children}
        </Typography>
      </CardContent>

    </Card>
  )

}
