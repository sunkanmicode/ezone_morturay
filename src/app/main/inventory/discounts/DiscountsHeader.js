import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Paper, Input, Icon, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../store/actions';

function DiscountsHeader(props) {
  const { match } = props;
  const dispatch = useDispatch();
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
  const searchText = useSelector(({ inventoryApp }) => inventoryApp.discounts.searchText);

  return (
    <div className='flex flex-1 w-full items-center justify-between'>
      <div className='flex items-center'>
        <FuseAnimate animation='transition.slideLeftIn' delay={300}>
          <Typography className='hidden sm:flex' variant='h6'>
            {match.params.id ? 'Discount Details' : 'Discounts'}
          </Typography>
        </FuseAnimate>
      </div>

      <div className='flex flex-1 items-center justify-center px-12'>
        <ThemeProvider theme={mainTheme}>
          <FuseAnimate animation='transition.slideDownIn' delay={300}>
            <Paper
              className='flex items-center w-full max-w-512 px-8 py-4 rounded-8'
              elevation={1}
            >
              <Icon className='mr-8' color='action'>
                search
              </Icon>

              <Input
                placeholder='Search'
                className='flex flex-1'
                disableUnderline
                fullWidth
                value={searchText}
                inputProps={{
                  'aria-label': 'Search',
                }}
                onChange={ev => dispatch(Actions.setSearchText(ev))}
              />
            </Paper>
          </FuseAnimate>
        </ThemeProvider>
      </div>

      <FuseAnimate animation='transition.slideRightIn' delay={300}>
        <Button
          className='whitespace-no-wrap'
          variant='contained'
        >
          <span className='hidden sm:flex' onClick={() => dispatch(Actions.openDiscountDialog())}>Add Discount</span>
          <span className='flex sm:hidden'>New</span>
        </Button>
      </FuseAnimate>
    </div>
  );
}

export default withRouter(DiscountsHeader);
