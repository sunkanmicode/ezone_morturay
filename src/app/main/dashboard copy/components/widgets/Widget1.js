import React from 'react';
import { Link } from "react-router-dom"
import {
  makeStyles,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    flexGrow: 1,
    borderRadius: theme.shape.borderRadius * 4,
    backgroundImage: `url(/assets/images/backgrounds/widget-blue.png)`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `center bottom`,
    backgroundSize: 'cover',
    '& .MuiCardActions-root': {
      justifyContent: 'center',
      backgroundColor: theme.palette.common.white,
      fontSize: theme.typography.subtitle1.fontSize,
    },
    '& .MuiCardContent-root': {
      minHeight: 160,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
    },
  },
}));

const Widget1 = (props) => {
  const classes = useStyles();
  const { count } = props

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className='flex flex-col items-center space-y-4'>
          <Typography variant='h3'>{count}</Typography>
          <Typography variant='h6'>Customers</Typography>
        </div>
      </CardContent>

      <Divider />

      <CardActions>
        <Button size='small' component={Link} to="/customers">
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

export default Widget1;
