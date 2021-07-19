import csTools from 'cornerstone-tools';
import DICOMSegTempCrosshairsTool from './tools/DICOMSegTempCrosshairsTool';

/**
 *
 * @param {object} configuration
 * @param {Object|Array} configuration.csToolsConfig
 */
export default function init({ servicesManager, configuration = {} }) {
  const { BrushTool, SphericalBrushTool, CorrectionScissorsTool,RectangleScissorsTool ,Brush2Tool ,Brush3Tool, FreehandRoiTool2 ,FreehandRoiTool3 ,FreehandRoiTool4,FreehandRoiTool} = csTools;
  const tools = [BrushTool, SphericalBrushTool, CorrectionScissorsTool ,RectangleScissorsTool ,Brush2Tool, Brush3Tool, FreehandRoiTool2 ,FreehandRoiTool3 ,FreehandRoiTool4,FreehandRoiTool];

  tools.forEach(tool => csTools.addTool(tool));

  /*csTools.addTool(BrushTool, {
    name: 'BrushEraser',
    configuration: {
      alwaysEraseOnClick: true,
    },
  });*/
  
  csTools.addTool(RectangleScissorsTool, {  //矩形框
    name: 'RectangleScissors',
    configuration: {
      //alwaysEraseOnClick: true,
	},
  }); 
  
  csTools.addTool(Brush2Tool, {  
    name: 'Brush2Tool',
    configuration: {
      globalToolSyncEnabled: true,
	},
  });
  


  csTools.addTool(DICOMSegTempCrosshairsTool);
}