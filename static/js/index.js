window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function () {
  // Toggle navbar burger menu
  $(".navbar-burger").click(function () {
    $(".navbar-burger, .navbar-menu").toggleClass("is-active");
  });

  // Default carousel options
  const options = {
    slidesToScroll: 3,
    slidesToShow: 3,
    loop: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  // Initialize default carousels
  const carousels = bulmaCarousel.attach('.carousel', options);

  // Initialize sliders
  bulmaSlider.attach();
});

// Additional carousel configurations and chart initialization
document.addEventListener('DOMContentLoaded', () => {
  // Separate carousel for results
  bulmaCarousel.attach('#results-carousel', {
    slidesToScroll: 3,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 10000,
    loop: true,
  });

  bulmaCarousel.attach('#segmentation-results-carousel', {
    slidesToScroll: 3,
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 10000,
    loop: true,
    controls: false,
  });

  // Control carousel navigation visibility based on screen size
  const carousel = document.querySelector('#segmentation-results-carousel');
  if (carousel) {
    const prevButton = carousel.querySelector('.slider-navigation-previous');
    const nextButton = carousel.querySelector('.slider-navigation-next');
    
    if (window.innerWidth <= 768) {
      if (prevButton) prevButton.style.display = 'flex';
      if (nextButton) nextButton.style.display = 'flex';
    } else {
      if (prevButton) prevButton.style.display = 'none';
      if (nextButton) nextButton.style.display = 'none';
    }
  }

 // Plotly scatter plot data & layout
const scatterData = [
  // Real data points 3D R50
  {
    y: [53.58],
    x: [27.98],
    mode: 'markers+text',
    type: 'scatter',
    name: '3D R50 Input-space',
    showlegend: false,
    text: ['Input-space (FG−BG)'],
    textposition: 'bottom center',
    marker: { size: 15, color: '#d0abc9', symbol: 'star' },
    customdata: ['3D R50'],
    hovertemplate: '<b>Input-space (FG−BG)</b><br>Model: %{customdata}<br>uAP: %{y}<br>mAP: %{x}<extra></extra>'
  },
  {
    y: [57.74],
    x: [30.89],
    mode: 'markers+text',
    type: 'scatter',
    name: '3D R50 Baseline F',
    showlegend: false,
    text: ['Foreground-only baseline (F)'],
    textposition: 'bottom center',
    marker: { size: 15, color: '#d06bbc', symbol: 'star' },
    customdata: ['3D R50'],
    hovertemplate: '<b>Foreground-only baseline (F)</b><br>Model: %{customdata}<br>uAP: %{y}<br>mAP: %{x}<extra></extra>'
  },
  {
    y: [66.69],
    x: [36.31],
    mode: 'markers+text',
    type: 'scatter',
    name: '3D R50 Latent-space',
    showlegend: false,
    text: ['Latent-space (FG−BG)'],
    textposition: 'bottom center',
    marker: { size: 15, color: '#900073', symbol: 'star' },
    customdata: ['3D R50'],
    hovertemplate: '<b>Latent-space (FG−BG)</b><br>Model: %{customdata}<br>uAP: %{y}<br>mAP: %{x}<extra></extra>'
  },

  // Real data points MViT-V2
  {
    y: [57.21],
    x: [28.80],
    mode: 'markers+text',
    type: 'scatter',
    name: 'MViT-V2 Input-space',
    showlegend: false,
    text: ['Input-space (FG−BG)'],
    textposition: 'top center',
    marker: { size: 15, color: '#d0abc9', symbol: 'circle' },
    customdata: ['MViT-V2'],
    hovertemplate: '<b>Input-space (FG−BG)</b><br>Model: %{customdata}<br>uAP: %{y}<br>mAP: %{x}<extra></extra>'
  },
  {
    y: [70.50],
    x: [35.29],
    mode: 'markers+text',
    type: 'scatter',
    name: 'MViT-V2 Baseline F',
    showlegend: false,
    text: ['Foreground-only baseline (F)'],
    textposition: 'bottom center',
    marker: { size: 15, color: '#d06bbc', symbol: 'circle' },
    customdata: ['MViT-V2'],
    hovertemplate: '<b>Foreground-only baseline (F)</b><br>Model: %{customdata}<br>uAP: %{y}<br>mAP: %{x}<extra></extra>'
  },
  {
    y: [71.64],
    x: [39.04],
    mode: 'markers+text',
    type: 'scatter',
    name: 'MViT-V2 Latent-space',
    showlegend: false,
    text: ['Latent-space (FG−BG)'],
    textposition: 'top center',
    marker: { size: 15, color: '#900073', symbol: 'circle' },
    customdata: ['MViT-V2'],
    hovertemplate: '<b>Latent-space (FG−BG)</b><br>Model: %{customdata}<br>uAP: %{y}<br>mAP: %{x}<extra></extra>'
  },

  // Legend dummies for Models (shape only, gray color)
  {
    x: [-10],
    y: [-10],
    mode: 'markers',
    type: 'scatter',
    name: '3D R50',
    marker: { size: 15, color: '#444', symbol: 'star' },
    showlegend: true,
    legendgroup: 'models',
    hovertemplate: '<b>3D R50</b><br>Model: 3D R50<br>uAP: %{y}<br>mAP: %{x}<extra></extra>'
  },
  {
    x: [-10],
    y: [-10],
    mode: 'markers',
    type: 'scatter',
    name: 'MViT-V2',
    marker: { size: 15, color: '#444', symbol: 'circle' },
    showlegend: true,
    legendgroup: 'models',
    hovertemplate: '<b>MViT-V2</b><br>Model: MViT-V2<br>uAP: %{y}<br>mAP: %{x}<extra></extra>'
  },

  // Legend dummies for Background subtraction types (color only, square shape)
  {
    x: [-11],
    y: [-11],
    mode: 'markers',
    type: 'scatter',
    name: 'Foreground-only baseline (F)',
    marker: { size: 15, color: '#d06bbc', symbol: 'square' },
    showlegend: true,
    legendgroup: 'bgsub',
    hovertemplate: '<b>Foreground-only baseline (F)</b><br>Model: %{customdata}<br>uAP: %{y}<br>mAP: %{x}<extra></extra>'
  },
  {
    x: [-11],
    y: [-12],
    mode: 'markers',
    type: 'scatter',
    name: 'Input-space (FG−BG)',
    marker: { size: 15, color: '#d0abc9', symbol: 'square' },
    showlegend: true,
    legendgroup: 'bgsub',
    hovertemplate: '<b>Input-space (FG−BG)</b><br>Model: %{customdata}<br>uAP: %{y}<br>mAP: %{x}<extra></extra>'
  },
  {
    x: [-11],
    y: [-13],
    mode: 'markers',
    type: 'scatter',
    name: 'Latent-space (FG−BG)',
    marker: { size: 15, color: '#900073', symbol: 'square' },
    showlegend: true,
    legendgroup: 'bgsub',
    hovertemplate: '<b>Latent-space (FG−BG)</b><br>Model: %{customdata}<br>uAP: %{y}<br>mAP: %{x}<extra></extra>'
  }
];

  const scatterLayout = {
    title: '',
    margin: {
      t: 10,   // reduce top margin (default is usually bigger, like 80)
      b: 10,
      l: 60,
      r: 60
    },
    xaxis: { title: 'mAP (%)', range: [25, 42.5] },
    yaxis: { title: 'uAP (%)', range: [50, 75] },
    hovermode: 'closest',
    legend: {
      x: 0.5,
      y: -0.2,
      xanchor: 'center',
      yanchor: 'top',
      bgcolor: '#f9f9f9',
      bordercolor: '#ccc',
      borderwidth: 1,
      traceorder: 'grouped',
      orientation: 'h',
      tracegroupgap: 20,
      font: { size: 12 }
    }
  };

  const plotlyConfig = {
    displayModeBar: false
  };

  // Bar chart data & layout
  const traceCommon = {
    x: ['3D R50', 'MViT-V2'],
    y: [19.15, 19.15],
    name: 'Dummy',
    type: 'bar',
    marker: {
      color: '#bebebe',
      line: { color: '#bebebe', width: 1 }
    },
    hovertemplate: '<b>%{fullData.name}</b><br>uAP: %{y}<br><extra></extra>'
  };

  const barData = [
    // Overlap dataset (left subplot)
    {
      x: ['3D R50', 'MViT-V2'],
      y: [19.15, 19.15],
      name: 'Dummy',
      type: 'bar',
      xaxis: 'x1',
      yaxis: 'y1',
      marker: {
        color: '#bebebe',
        line: { color: '#bebebe', width: 1 }
      },
      text: ['19.15', '19.15'],
      textposition: 'middle',
      textfont: { color: 'white', size: 12 },
      hovertemplate: '<b>%{fullData.name}</b><br>uAP: %{y}<br><extra></extra>'
    },
    {
      x: ['3D R50', 'MViT-V2'],
      y: [58.92 - 19.15, 61.90 - 19.15],
      name: 'Background (B)',
      type: 'bar',
      xaxis: 'x1',
      yaxis: 'y1',
      marker: { color: '#fe4d4e', line: { color: '#fe4d4e', width: 1 } },
      customdata: [58.92, 61.90],
      text: ['58.92', '61.90'],
      textposition: 'middle',
      textfont: { color: 'white', size: 12 },
      hovertemplate: '<b>%{fullData.name}</b><br>uAP: %{customdata}<br><extra></extra>'
    },
    {
      x: ['3D R50', 'MViT-V2'],
      y: [72.79 - 58.92, 75.44 - 61.90],
      name: 'Foreground (F)',
      type: 'bar',
      xaxis: 'x1',
      yaxis: 'y1',
      marker: { color: '#5c5cff', line: { color: '#5c5cff', width: 1 } },
      customdata: [72.79, 75.44],
      text: ['72.79', '75.44'],
      textposition: 'middle',
      textfont: { color: 'white', size: 12 },
      hovertemplate: '<b>%{fullData.name}</b><br>uAP: %{customdata}<br><extra></extra>'
    },

    // Disjoint dataset (right subplot)
    {
      x: ['3D R50', 'MViT-V2'],
      y: [19.15, 19.15],
      name: 'Dummy',
      showlegend: false,
      type: 'bar',
      xaxis: 'x2',
      yaxis: 'y2',
      marker: {
        color: '#bebebe',
        line: { color: '#bebebe', width: 1 }
      },
      text: ['19.15', '19.15'],
      textposition: 'middle',
      textfont: { color: 'white', size: 12 },
      hovertemplate: '<b>%{fullData.name}</b><br>uAP: %{y}<br><extra></extra>'
    },
    {
      x: ['3D R50', 'MViT-V2'],
      y: [48.40 - 19.15, 50.03 - 19.15],
      name: 'Background (B)',
      showlegend: false,
      type: 'bar',
      xaxis: 'x2',
      yaxis: 'y2',
      marker: { color: '#fe4d4e', line: { color: '#fe4d4e', width: 1 } },
      customdata: [48.40, 50.03],
      text: ['48.40', '50.03'],
      textposition: 'middle',
      textfont: { color: 'white', size: 12 },
      hovertemplate: '<b>%{fullData.name}</b><br>uAP: %{customdata}<br><extra></extra>'
    },
    {
      x: ['3D R50', 'MViT-V2'],
      y: [57.74 - 48.40, 70.50 - 50.03],
      name: 'Foreground (F)',
      showlegend: false,
      type: 'bar',
      xaxis: 'x2',
      yaxis: 'y2',
      marker: { color: '#5c5cff', line: { color: '#5c5cff', width: 1 } },
      customdata: [57.74, 70.50],
      text: ['57.74', '70.50'],
      textposition: 'middle',
      textfont: { color: 'white', size: 12 },
      hovertemplate: '<b>%{fullData.name}</b><br>uAP: %{customdata}<br><extra></extra>'
    }
  ];

  const barLayout = {
    grid: { rows: 1, columns: 2, pattern: 'independent' },
    barmode: 'stack',
    title: {
      text: 'uAP Performance on D<sup>overlap</sup> (left) and D<sup>disjoint</sup> (right) views',
      x: 0.5,
      font: { size: 17 }
    },
    plot_bgcolor: '#FAFAFA',
    paper_bgcolor: 'white',
    font: { family: 'Noto Sans, sans-serif' },
    legend: {
      orientation: 'v',
      x: 1.1,
      y: 1,
      bgcolor: 'rgba(255,255,255,0.8)',
      bordercolor: '#DDD',
      borderwidth: 1,
      font: { size: 12 }
    },
    margin: { l: 60, r: 180, t: 100, b: 80 }, // Increased top margin for subplot titles
  
    // Add annotations for subplot titles
    annotations: [
      {
        text: 'ID',
        x: 0.225, // Center of left subplot (domain midpoint: (0 + 0.45) / 2)
        y: 1.01,  // Above the plot area
        xref: 'paper',
        yref: 'paper',
        showarrow: false,
        font: { size: 16, color: 'black' },
        xanchor: 'center',
        yanchor: 'bottom'
      },
      {
        text: 'OOD',
        x: 0.775, // Center of right subplot (domain midpoint: (0.55 + 1) / 2)
        y: 1.01,  // Above the plot area
        xref: 'paper',
        yref: 'paper',
        showarrow: false,
        font: { size: 16, color: 'black' },
        xanchor: 'center',
        yanchor: 'bottom'
      }
    ],
  
    xaxis: {
      title: 'Model Architecture',
      domain: [0, 0.45],
      tickfont: { size: 12 },
      titlefont: { size: 14 },
      gridcolor: '#E0E0E0'
    },
    yaxis: {
      title: 'uAP (Micro Average Precision)',
      range: [0, 80],
      tickfont: { size: 12 },
      titlefont: { size: 14 },
      gridcolor: '#E0E0E0'
    },
    xaxis2: {
      title: 'Model Architecture',
      domain: [0.55, 1],
      tickfont: { size: 12 },
      titlefont: { size: 14 },
      gridcolor: '#E0E0E0'
    },
    yaxis2: {
      range: [0, 80],
      gridcolor: '#E0E0E0'
    }
  };

  // Initialize charts - bar chart first, then scatter plot
  const barChartElement = document.getElementById('bar-chart');
  const scatterPlotElement = document.getElementById('scatter-plot');

  if (barChartElement && scatterPlotElement) {
    Plotly.newPlot('bar-chart', barData, barLayout, plotlyConfig).then(() => {
      Plotly.newPlot('scatter-plot', scatterData, scatterLayout, plotlyConfig);
    });
  } else {
    // Initialize individual charts if elements exist
    if (barChartElement) {
      Plotly.newPlot('bar-chart', barData, barLayout, plotlyConfig);
    }
    if (scatterPlotElement) {
      Plotly.newPlot('scatter-plot', scatterData, scatterLayout, plotlyConfig);
    }
  }
});