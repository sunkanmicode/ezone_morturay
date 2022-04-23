import React from 'react';
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import moment from 'moment';

function FooterLayout1(props) {
  const footerTheme = useSelector(({ fuse }) => fuse.settings.footerTheme);

  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar id='fuse-footer' className='relative z-10' color='default'>
        <Toolbar className='px-16 py-0 flex items-center'>
          <Typography>
            <strong>Ezone ERP</strong>, Mortuary &copy; Copyright{' '}
            {moment().format('YYYY')}, All Rights Reserved. Learn more @{' '}
            <Link href='https://ezoneerp.com/'>Ezone.com</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default FooterLayout1;
