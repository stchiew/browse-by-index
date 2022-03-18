import * as React from 'react';
import styles from './FileLabel.module.scss';
import { getFileTypeIconProps, initializeFileTypeIcons } from '@fluentui/react-file-type-icons';
import { TooltipHost, TooltipDelay, DirectionalHint, ITooltipProps, ITooltipHostStyles } from '@fluentui/react';

import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IFileLabelProps } from './IFileLabelProps';

initializeFileTypeIcons(undefined);

const tooltipProps: ITooltipProps = {
  onRenderContent: () => (
    <div style={{ margin: 10, padding: 0 }}>
      <span>Additional document information displayed here</span>
    </div>
  ),
};
const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };

export const FileLabel: React.FC<IFileLabelProps> = (props) => {
/*   const drag = (ev) => {
    ev.dataTransfer.setData("text/plain", JSON.stringify(props.file));
  }; */

  return (
    <li className={styles.fileLabel}>
      <Icon {...getFileTypeIconProps({ extension: props.file.extension, size: 16 })} />
      <TooltipHost
        tooltipProps={tooltipProps}
        delay={TooltipDelay.zero}
        //id={tooltipId}
        directionalHint={DirectionalHint.bottomCenter}
        styles={hostStyles}
      >
        <a className={styles.filelink} href={props.file.url} data-interception="off" target="_blank">{props.file.title}</a>
      </TooltipHost>
    </li>
  );
};