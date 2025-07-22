import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

import pkg from '../../package.json';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/New_York');

const DEPLOY_INTERVAL = 10; // minutes

export const UpdateCheck = () => {
  const updateAvailableAtom = atom(false);

  const [updateAvailable, setUpdateAvailable] = useAtom(updateAvailableAtom);

  useEffect(() => {
    const getLatestVersion = async (
      org = 'cu-cit-cloud-team',
      repo = 'azure-openai-gpt4-chat'
    ) => {
      const latest = await fetch(
        `https://api.github.com/repos/${org}/${repo}/releases/latest`
      )
        .then(async (response) => {
          const data = await response.json();
          const { version, published } = data;
          return {
            version,
            published,
          };
        })
        .catch((error) => {
          setUpdateAvailable(false);
          console.error(error);
        });

      setUpdateAvailable(
        latest.version !== `v${pkg.version}` &&
          dayjs().utc() >
            dayjs(latest.published).utc().add(DEPLOY_INTERVAL, 'm')
      );
    };

    // check for updates every hour
    const updateHandle = setInterval(getLatestVersion(), 1000 * 60 * 60);

    // check for updates on load
    getLatestVersion();

    // clear update check interval on unmount
    return () => clearInterval(updateHandle);
  }, [setUpdateAvailable]);

  const clickHandler = () => {
    window.location.reload();
  };

  return updateAvailable ? (
    <button
      type="button"
      onClick={clickHandler}
      className="hidden tooltip tooltip-bottom tooltip-accent lg:block"
      data-tip="Click here or manually reload for latest version"
    >
      <span className="px-2 text-sm indicator-item badge badge-accent">
        <FontAwesomeIcon className="mr-1" icon={faCircleArrowUp} />
        Update available
      </span>
    </button>
  ) : null;
};

export default UpdateCheck;
