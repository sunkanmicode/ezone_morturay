import React from 'react';
import {
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    borderRadius: theme.shape.borderRadius * 2,
    '& .MuiCardHeader-root': {
      '& .MuiTypography-root': {
        fontSize: theme.typography.h6.fontSize,
      },
    },
  },
  table: {
    '& td': {
      color: theme.palette.text.secondary,
    },
    '& td:last-child': {
      whiteSpace: 'nowrap',
    },
    '& tr:last-child': {
      '& td': {
        borderBottom: 'none !important',
      },
    },
  },
}));

const Widget5 = () => {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card}>
        <CardHeader title='Recent Courses' />
        <CardContent>
          <Table className={classes.table}>
            <TableBody>
              {_.range(0, 3).map((row, i) => (
                <TableRow key={i}>
                  <TableCell scope='row'>
                    <Typography variant='subtitle1'>
                      Statistics for Beginners
                    </Typography>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed lobortis tempus, eget semper sed.
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Category: Architecture</Typography>
                    <Typography>3rd Jul, 2019</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Widget5;
