import 'vtk.js/Sources/favicon';

import vtkColorTransferFunction from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction';
import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import vtkHttpDataSetReader from 'vtk.js/Sources/IO/Core/HttpDataSetReader';
import vtkPiecewiseFunction from 'vtk.js/Sources/Common/DataModel/PiecewiseFunction';
import vtkPiecewiseGaussianWidget from 'vtk.js/Sources/Interaction/Widgets/PiecewiseGaussianWidget';
import vtkVolume from 'vtk.js/Sources/Rendering/Core/Volume';
import vtkVolumeMapper from 'vtk.js/Sources/Rendering/Core/VolumeMapper';

import vtkColorMaps from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction/ColorMaps';

import vtkXMLImageDataReader from 'vtk.js/Sources/IO/XML/XMLImageDataReader';

//import headsq from './headsq.vti';

// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------
const total3D = (input_file) => {
	
/*const frames = [];
frames.push(require(`./headsq.vti`));*/

const rootContainer = document.querySelector(
  '#total3D'
);
const containerStyle = rootContainer ;

const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
  background: [0.2, 0.2, 0.2],
  rootContainer,
  containerStyle,
});
const renderer = fullScreenRenderer.getRenderer();
const renderWindow = fullScreenRenderer.getRenderWindow();

renderWindow.getInteractor().setDesiredUpdateRate(15.0);

// ----------------------------------------------------------------------------
// Example code
// ----------------------------------------------------------------------------

const body = document.querySelector('.KKK');
//const body = rootContainer || document.getElementById('body');

const testcontainer = document.createElement('testcontainer');
testcontainer.id = 'testcontainer';


// Create Widget container
const widgetContainer = document.createElement('div');
widgetContainer.style.position = 'absolute';
widgetContainer.style.top = 'calc(10px + 1em)';
widgetContainer.style.left = '5px';
widgetContainer.style.background = 'rgba(255, 255, 255, 0.3)';
widgetContainer.id = 'wtest';
rootContainer.appendChild(widgetContainer);

// Create Label for preset
const labelContainer = document.createElement('div');
labelContainer.style.position = 'absolute';
labelContainer.style.top = '5px';
labelContainer.style.left = '5px';
labelContainer.style.width = '100%';
labelContainer.style.color = 'white';
labelContainer.style.textAlign = 'center';
labelContainer.style.userSelect = 'none';
labelContainer.style.cursor = 'pointer';
rootContainer.appendChild(labelContainer);

let presetIndex = 1;
const globalDataRange = [0, 255];
const lookupTable = vtkColorTransferFunction.newInstance();
lookupTable.addRGBPoint(0, 0, 0, 0);
lookupTable.addRGBPoint(255, 1.0, 1.0, 1.0);
const piecewiseFunction = vtkPiecewiseFunction.newInstance();
piecewiseFunction.addPoint(0.0, 0.0);
piecewiseFunction.addPoint(100.0, 0.5);
piecewiseFunction.addPoint(250.0, 1.0);

// ----------------------------------------------------------------------------
// Example code
// ----------------------------------------------------------------------------

const widget = vtkPiecewiseGaussianWidget.newInstance({
  numberOfBins: 256,
  size: [400, 150],
});
widget.updateStyle({
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  histogramColor: 'rgba(100, 100, 100, 0.5)',
  strokeColor: 'rgb(0, 0, 0)',
  activeColor: 'rgb(255, 255, 255)',
  handleColor: 'rgb(50, 150, 50)',
  buttonDisableFillColor: 'rgba(255, 255, 255, 0.5)',
  buttonDisableStrokeColor: 'rgba(0, 0, 0, 0.5)',
  buttonStrokeColor: 'rgba(0, 0, 0, 1)',
  buttonFillColor: 'rgba(255, 255, 255, 1)',
  strokeWidth: 2,
  activeStrokeWidth: 3,
  buttonStrokeWidth: 1.5,
  handleWidth: 3,
  iconSize: 20, // Can be 0 if you want to remove buttons (dblClick for (+) / rightClick for (-))
  padding: 10,
});

fullScreenRenderer.setResizeCallback(({ width, height }) => {
  widget.setSize(Math.min(200, width - 10), 75);
});

const actor = vtkVolume.newInstance();
const mapper = vtkVolumeMapper.newInstance({ sampleDistance: 1.1 });
//const reader = vtkHttpDataSetReader.newInstance({ fetchGzip: true });
const reader = vtkXMLImageDataReader.newInstance();

console.log(reader);

reader.setUrl(input_file).then(() => {
  reader.loadData().then(() => {
    const imageData = reader.getOutputData();
    const dataArray = imageData.getPointData().getScalars();
    const dataRange = dataArray.getRange();
    globalDataRange[0] = dataRange[0];
    globalDataRange[1] = dataRange[1];

    widget.setDataArray(dataArray.getData());

    renderer.addVolume(actor);
    renderer.resetCamera();
    renderer.getActiveCamera().elevation(70);
    renderWindow.render();
  });
});

actor.setMapper(mapper);
mapper.setInputConnection(reader.getOutputPort());

actor.getProperty().setRGBTransferFunction(0, lookupTable);
actor.getProperty().setScalarOpacity(0, piecewiseFunction);
actor.getProperty().setInterpolationTypeToLinear();


widget.addGaussian(0.75, 1, 0.3, 0, 0);

widget.setContainer(widgetContainer);
widget.bindMouseListeners();

widget.onAnimation((start) => {
  if (start) {
    renderWindow.getInteractor().requestAnimation(widget);
  } else {
    renderWindow.getInteractor().cancelAnimation(widget);
  }
});

widget.onOpacityChange(() => {
  widget.applyOpacity(piecewiseFunction);
  if (!renderWindow.getInteractor().isAnimating()) {
    renderWindow.render();
  }
});


global.widget = widget;

};

export default total3D;