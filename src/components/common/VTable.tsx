import { useTheme, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableFooter, LinearProgress,  } from '@mui/material';
import { useState, useEffect } from 'react';
import { scrollStyle } from '../../shared/styles/styles';
import { useAppThemeContext } from '../../contexts';
import { useWindowSize } from '../../shared/hooks/useWindowSize';

interface IVTableProps {
  titles: string[];
  overflow?: string;
  children: React.ReactNode;
  headerHeight?: number;
  h?: string | number | null;
}

export const VTable = ({ titles, children, headerHeight = 20, overflow = 'auto', h = null }: IVTableProps) => {
  const [tableHeight, setTableHeight] = useState(window.innerHeight / 7.7 - headerHeight);

  useEffect(() => {
    const handleResize = () => setTableHeight(window.innerHeight / 7.7 - headerHeight);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [headerHeight]);

  const theme = useTheme();
 const { windowHeight } = useWindowSize()
  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{
        maxHeight: h ? `calc( ${windowHeight}px - ${h} )` : theme.spacing(tableHeight > 100 ? 100 : tableHeight),
        overflow: overflow,
        mx: 1,
        width: 'auto',
        ...scrollStyle
      }}
    >
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            {titles.map((title, index) => (
              <TableCell key={index}>{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        {children}
      </Table>
    </TableContainer>
  );
};

interface IVTableFooterProps {
  colSpan: number;
  children: React.ReactNode;
  isLoading: boolean;
}

export const VTableFooter = ({ isLoading, children, colSpan }: IVTableFooterProps) => {
  const { theme } = useAppThemeContext();
  return (
    
    <TableFooter sx={{ position: 'sticky', bottom: 0, width: '100%', zIndex: 10}} >

      {isLoading && (
        <TableRow>

          <TableCell colSpan={colSpan} >

            <LinearProgress variant='indeterminate' />

          </TableCell>
        </TableRow>
      )}
      <TableRow sx={{background: theme.palette.background.paper }} >
        <TableCell colSpan={colSpan}>
          {children}
         
        </TableCell>
      </TableRow>
    </TableFooter>
   

  )
}
