import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { withStyles, Card, CardContent, Typography } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius * 2,
    '& .MuiCardHeader-root': {
      '& .MuiTypography-root': {
        fontSize: theme.typography.subtitle1.fontSize,
      },
    },
  },
});

export default withStyles(styles)(
  class Widget6 extends Component {
    render() {
      const { classes } = this.props;

      const testCompleted = '34';
      const coursesCompleted = '76';

      const data = {
        labels: ['Courses Completed', 'Test Completed'],
        datasets: [
          {
            data: [coursesCompleted, testCompleted],
            backgroundColor: ['#1A88E1', '#8ED16F'],
            hoverBackgroundColor: ['#1A88E1', '#8ED16F'],
          },
        ],
      };

      return (
        <Card className={classes.root}>
          <CardContent>
            {coursesCompleted || testCompleted ? (
              <Doughnut data={data} />
            ) : (
              <Typography align='center' color='textSecondary'>
                No analytics has been taken
              </Typography>
            )}
          </CardContent>
        </Card>
      );
    }
  }
);
