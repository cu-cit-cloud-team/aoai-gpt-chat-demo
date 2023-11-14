import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ParameterSlider } from './ParameterSlider';

export const Parameters = () => {
  return (
    <details>
      <summary>
        <FontAwesomeIcon icon={faSliders} />
        Parameters
      </summary>
      <ul className="bg-base-200">
        <li className="text-xs">
          <ParameterSlider
            paramName={'temperature'}
            min={0}
            max={2}
            step={0.1}
          />
        </li>
        <li className="text-xs">
          <ParameterSlider paramName={'top_p'} min={0} max={1} step={0.1} />
        </li>
        <li className="text-xs">
          <ParameterSlider
            paramName={'frequency_penalty'}
            min={-2}
            max={2}
            step={0.1}
          />
        </li>
        <li className="text-xs">
          <ParameterSlider
            paramName={'presence_penalty'}
            min={-2}
            max={2}
            step={0.1}
          />
        </li>
      </ul>
    </details>
  );
};

Parameters.displayName = 'Parameters';

export default Parameters;
