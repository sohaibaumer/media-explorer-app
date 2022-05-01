import { useState, useEffect } from 'react';
import imageIcon from '../images/imageIcon.png';
import videoIcon from '../images/videoIcon.png';

function ToggleSwitch(props) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(()=> {
    props.onGetSwitchState(checked);
  }, [checked])

  return (
    <div
      style={{
        display: 'inline-block',
        position: 'relative',
        width: '64px',
        height: '24px',
        borderRadius: '12px',
        backgroundColor: '#b5b5b5',
        transition: 'background-color 0.2s ease',
        cursor: 'pointer',
        marginLeft: 'auto'
      }}
      onClick={handleChange}
    >
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: checked ? 'calc(100% - 24px)' : '0px',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundImage: `url(${checked ? videoIcon : imageIcon})`,
          backgroundSize: 'contain',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.4)',
          transition: 'left 0.2s ease',
        }}
      />
      <span
        style={{
          fontSize: '11px',
          position: 'absolute',
          top: '4px',
          left: `${checked ? '1px' : ''}`,
          right: `${!checked ? '1px' : ''}`,
        }}
      >
        {checked ? 'Videos' : 'Images'}
      </span>
    </div>
  );
}

export default ToggleSwitch;
