import * as React from 'react';
import styles from './FileLabel.module.scss';
import { getFileTypeIconProps, initializeFileTypeIcons } from '@fluentui/react-file-type-icons';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IFileLabelProps } from './IFileLabelProps';

initializeFileTypeIcons(undefined);

export const FileLabel: React.FC<IFileLabelProps> = (props) => {
  const drag = (ev) => {
    ev.dataTransfer.setData("text/plain", JSON.stringify(props.file));
  };

  return (
    <li className={styles.fileLabel} draggable={true} onDragStart={drag}>
      <Icon {...getFileTypeIconProps({ extension: props.file.extension, size: 16 })} />
      <a className={styles.filelink} href={props.file.url}>Click here:{props.file.title} - {props.file.url}</a>
    </li>
  );
};