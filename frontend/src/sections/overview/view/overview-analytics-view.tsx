import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { _posts, _tasks, _traffic, _timeline } from 'src/_mock';

import { Iconify } from 'src/components/iconify';

import { AnalyticsNews } from '../analytics-news';
import { AnalyticsTasks } from '../analytics-tasks';
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsOrderTimeline } from '../analytics-order-timeline';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';


// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
    const navigate = useNavigate();

  const handleClick = () => {
    navigate('/createcomanda'); // Reemplaza con tu ruta deseada
  };

  async function fetchResumData() {
  const response = await fetch('http://127.0.0.1:8000/comandes/resum');
  if (!response.ok) throw new Error('Error fetching resum data');
  return await response.json();
}

const [resum, setResum] = useState<{
  total_revenue: number;
  total_comandes: number;
  unique_members: number;
} | null>(null);

useEffect(() => {
  const loadResum = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/comandes/resum');
      if (!response.ok) throw new Error('Error fetching resum data');
      const data = await response.json();
      setResum(data);
    } catch (error) {
      console.error('Error fetching resum:', error);
    }
  };

  loadResum();
}, []);

  return (
    <DashboardContent maxWidth="xl">
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
        Hola de nou! 👋
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleClick}
        >
          Nova comanda
        </Button>
      </Box>


      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Total ganancies"
            //percent={2.6}
            total={resum?.total_revenue ?? 0}
            icon={<img alt="Weekly sales" src="/assets/icons/glass/ic-glass-bag.svg" />}
            /*chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}*/
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Clients nous"
            total={resum?.unique_members ?? 0}
            color="secondary"
            icon={<img alt="New users" src="/assets/icons/glass/ic-glass-users.svg" />}
            // chart={{
            //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            //   series: [56, 47, 40, 62, 73, 30, 23, 54],
            // }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Vendes diaries"
            //percent={2.8}
            total={resum?.total_comandes ?? 0}
            color="warning"
            icon={<img alt="Purchase orders" src="/assets/icons/glass/ic-glass-buy.svg" />}
           /* chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}*/
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title="Tipus de clients diaris"
            chart={{
              series: [
                { label: 'Estudiant', value: 3500 },
                { label: 'Profesor', value: 2500 },
                { label: 'No identificat', value: 1500 },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Ranking productes més venuts"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              series: [
                { name: 'Team A', data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
                { name: 'Team B', data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
              ],
            }}
          />
        </Grid>

      </Grid>
    </DashboardContent>
  );
}
