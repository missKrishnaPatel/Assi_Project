import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Skeleton,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Divider,
  Fade
} from '@mui/material';
import { Visibility, FavoriteBorder } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  const [posts, setPosts] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data.slice(0, 10)); // Limit to 10 posts for better UX
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  const handleTitleClick = () => {
    setClickCount(prevCount => prevCount + 1);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Loading Posts...
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[...Array(10)].map((_, index) => (
              <Skeleton key={index} variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
            ))}
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Fade in timeout={600}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 3,
              color: 'white',
            }}
          >
            <Typography variant="h3" align="center" gutterBottom>
              Post Explorer
            </Typography>
            <Typography variant="h5" align="center" sx={{ opacity: 0.9 }}>
              Click titles to explore! Total clicks: {clickCount}
            </Typography>
          </Paper>
        </Fade>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {posts.map((post) => (
            <Fade in timeout={600 + post.id * 100} key={post.id}>
              <Card
                sx={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 8,
                  },
                }}
              >
                <CardContent sx={{ pb: '0 !important' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Chip
                      label={`Post #${post.id}`}
                      color="primary"
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={`${Math.floor(Math.random() * 100)} views`}
                      icon={<Visibility />}
                      color="secondary"
                      size="small"
                    />
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <Typography
                    variant="h5"
                    onClick={handleTitleClick}
                    sx={{
                      cursor: 'pointer',
                      fontWeight: 600,
                      lineHeight: 1.3,
                      mb: 2,
                      '&:hover': {
                        color: 'primary.main',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {post.body.substring(0, 150)}...
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <IconButton size="small" color="secondary">
                    <FavoriteBorder />
                  </IconButton>
                  <Typography variant="caption" color="text.secondary" sx={{ flexGrow: 1, textAlign: 'right' }}>
                    Click to read more
                  </Typography>
                </CardActions>
              </Card>
            </Fade>
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;