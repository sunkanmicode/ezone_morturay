import React from 'react';
import { Button, Icon, IconButton, MenuItem, Popover } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { withRouter } from 'react-router-dom';

function DeceasedToolbar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const deceased = {};

  if (!deceased) {
    return null;
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : null;

  return (
    <div className='flex flex-1 items-center justify-end overflow-hidden sm:px-16'>
      <div className='flex items-center justify-start' aria-label='Toggle star'>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton onClick={() => {}}>
            <Icon>print</Icon>
          </IconButton>
        </FuseAnimate>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton onClick={() => {}}>
            <Icon>delete</Icon>
          </IconButton>
        </FuseAnimate>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <IconButton onClick={() => {}}>
            <Icon>mail</Icon>
          </IconButton>
        </FuseAnimate>
        <FuseAnimate animation='transition.expandIn' delay={100}>
          <div className='ml-16'>
            <Button
              aria-describedby={id}
              variant='contained'
              size='small'
              disableElevation
              onClick={handleClick}
            >
              Options <Icon>expand_more</Icon>
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <MenuItem>Send Receipt</MenuItem>
            </Popover>
          </div>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default withRouter(DeceasedToolbar);
