import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Button, Paper, Input, Icon, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';

function ItemsHeader(props) {
  const { match } = props;
  const dispatch = useDispatch();
  const searchText = '';
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
  const itemReducer = useSelector(({ inventoryApp }) => inventoryApp.items)
  const item = itemReducer.item

  return (
    <div className='flex flex-1 w-full items-center justify-between'>
      <div className='flex items-center'>
        <FuseAnimate animation='transition.expandIn' delay={300}>
          <Icon className='text-32 mr-0 sm:mr-12'>person</Icon>
        </FuseAnimate>
        <FuseAnimate animation='transition.slideLeftIn' delay={300}>
          <Typography className='hidden sm:flex' variant='h6'>
            {match.params.id ? 'Item Details' : 'Items'}
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
                // onChange={ev => dispatch(Actions.setProductsSearchText(ev))}
              />
            </Paper>
          </FuseAnimate>
        </ThemeProvider>
      </div>

      <FuseAnimate animation='transition.slideRightIn' delay={300}>
        {match.params.id ?
          <Button className='whitespace-no-wrap' variant='contained' onClick={() => dispatch(Actions.openItemDialog(item))}>
            <span className='hidden sm:flex'>Update Item</span>
            <span className='flex sm:hidden'>New</span>
          </Button>
          :
          <Button
            component={Link}
            to='/inventory/items/new'
            className='whitespace-no-wrap'
            variant='contained'
          >
            <span className='hidden sm:flex'>Add Item</span>
            <span className='flex sm:hidden'>Update</span>
          </Button>
        }
      </FuseAnimate>
    </div>
  );
}

export default withRouter(ItemsHeader);
