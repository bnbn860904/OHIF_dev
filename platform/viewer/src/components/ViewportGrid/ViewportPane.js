import React from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ViewportPane.css';
//import test from './test.js';
////

const ViewportPane = function (props) {
  const { children, onDrop, viewportIndex, className: propClassName } = props;
  const [{ hovered, highlighted }, drop] = useDrop({
    accept: 'thumbnail',
    drop: (droppedItem, monitor) => {
      const canDrop = monitor.canDrop();
      const isOver = monitor.isOver();

      if (canDrop && isOver && onDrop) {
        const { StudyInstanceUID, displaySetInstanceUID } = droppedItem;

        onDrop({ viewportIndex, StudyInstanceUID, displaySetInstanceUID });
      }
    },
    // Monitor, and collect props.
    // Returned as values by `useDrop`
    collect: monitor => ({
      highlighted: monitor.canDrop(),
      hovered: monitor.isOver(),
    }),
  });
  
  if(viewportIndex == 3){
	  //test();
	  return (
	<div 
		className={classNames(
		'KKK')}
		>
	<div id = 'hellow'></div> 
	<script src="test.js" async></script> 
	</div>
	//<div id = 'testcontainer'></div> 
  );
  
  }
  
  return (
    <div
      className={classNames(
        'viewport-drop-target',
        { hovered: hovered },
        { highlighted: highlighted },
        propClassName
      )}
      ref={drop}
      data-cy={`viewport-container-${viewportIndex}`}
    >
	<div id = 'total3D'></div> 
      {children}
    </div>	
  );
};

ViewportPane.propTypes = {
  children: PropTypes.node.isRequired,
  viewportIndex: PropTypes.number.isRequired,
  onDrop: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default ViewportPane;
