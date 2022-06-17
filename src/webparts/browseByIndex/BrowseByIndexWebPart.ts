import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';
import { sp } from '@pnp/sp/presets/all';

import * as strings from 'BrowseByIndexWebPartStrings';
//import { BrowseByIndex } from './components/BrowseByIndex';
import { Debug } from './components/Debug';
import { IBrowseByIndexProps } from './components/IBrowseByIndexProps';

export interface IBrowseByIndexWebPartProps {
  fieldName: string;
  listName: string;
}

export default class BrowseByIndexWebPart extends BaseClientSideWebPart<IBrowseByIndexWebPartProps> {

  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IBrowseByIndexProps> = React.createElement(
      //BrowseByIndex,
      Debug,
      {
        fieldName: this.properties.fieldName,
        listName: this.properties.listName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: strings.ListnameFieldLabel
                }),
                PropertyPaneTextField('fieldName', {
                  label: strings.FieldnameFieldLabel
                })
              ]
            },
            {
              groupName: strings.AboutGroupName,
              groupFields: [
                PropertyPaneWebPartInformation({ description: `View by file explorer`, key: 'webPartInfoId' }),
                PropertyPaneWebPartInformation({
                  description: `${strings.ManifestVersionLabel} ${this.context.manifest.version}.0`,
                  key: 'webPartInfoStaticId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
