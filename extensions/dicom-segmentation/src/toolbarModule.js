/* TODO: Creation tools (future release).*/

const TOOLBAR_BUTTON_TYPES = {
  COMMAND: 'command',
  SET_TOOL_ACTIVE: 'setToolActive',
  BUILT_IN: 'builtIn',
};



//const definitions = []; /* TODO: Creation tools (future release). [
  const definitions = [{
    id: 'SegDropdown',
    label: 'Segmentation',
    icon: 'ellipse-circle',
    buttons: [
      {
        id: 'Brush',
        label: 'Brushtool',
        icon: 'brush',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'Brush' },
      },
      {
        id: 'SphericalBrush',
        label: 'Spherical',
        icon: 'sphere',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'SphericalBrush' },
      },
      {
        id: 'CorrectionScissors',
        label: 'Correction Scissors',
        icon: 'scissors',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'CorrectionScissors' },
      },
      {
        id: 'BrushEraser',
        label: 'Eraser',
        icon: 'trash',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'BrushEraser' },
      },
      {    //矩形框工具
        id: 'RectangleScissors',
        label: 'RectangleScissors',
        icon: 'square-o',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'RectangleScissors' },
      },
      /*{
        id: 'FreehandRoi2',
        label: 'top slice',
        icon: 'measure-temp',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'FreehandRoi2' },
      },
      {
        id: 'FreehandRoi3',
        label: 'middle slice',
        icon: 'measure-temp',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'FreehandRoi3' },
      },
      {
        id: 'FreehandRoi4',
        label: 'bottom slice',
        icon: 'measure-temp',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'FreehandRoi4' },
      },
      {
        id: 'FreehandRoi',
        label: 'FreehandRoi',
        icon: 'measure-temp',
        //
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setToolActive',
        commandOptions: { toolName: 'FreehandRoi' },
      },*/  
    ],
  },
]; 

export default {
  definitions,
  defaultContext: 'ACTIVE_VIEWPORT::CORNERSTONE',
};
