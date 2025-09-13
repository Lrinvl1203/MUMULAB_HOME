// Google Analytics 4 Configuration
// Replace 'G-XXXXXXXXXX' with your actual Measurement ID

// Initialize Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

// Configure with your Measurement ID
const GA_MEASUREMENT_ID = 'G-R96NX2MK78';
gtag('config', GA_MEASUREMENT_ID, {
  // Enhanced measurement settings
  send_page_view: true,
  // Privacy settings
  anonymize_ip: true,
  // Custom settings for MUMULAB
  custom_map: {
    'custom_parameter_1': 'page_type'
  }
});

// Custom event tracking functions for MUMULAB
const Analytics = {
  // Track page views with custom data
  trackPageView: (pageName, pageType = 'general') => {
    gtag('event', 'page_view', {
      page_title: pageName,
      page_type: pageType,
      page_location: window.location.href
    });
  },

  // Track tool usage
  trackToolUsage: (toolName, action = 'open') => {
    gtag('event', 'tool_interaction', {
      tool_name: toolName,
      action: action,
      timestamp: new Date().toISOString()
    });
  },

  // Track blog interactions
  trackBlogInteraction: (action, postTitle = '', category = '') => {
    gtag('event', 'blog_interaction', {
      action: action, // 'view', 'filter', 'read_more'
      post_title: postTitle,
      category: category
    });
  },

  // Track app launches from tools page
  trackAppLaunch: (appName, launchType = 'inline') => {
    gtag('event', 'app_launch', {
      app_name: appName,
      launch_type: launchType, // 'inline' or 'fullscreen'
      page_location: window.location.href
    });
  },

  // Track custom events
  trackCustomEvent: (eventName, parameters = {}) => {
    gtag('event', eventName, {
      event_category: 'MUMULAB',
      ...parameters
    });
  }
};

// Make Analytics available globally
window.Analytics = Analytics;

console.log('📊 Google Analytics 4 loaded for MUMULAB');