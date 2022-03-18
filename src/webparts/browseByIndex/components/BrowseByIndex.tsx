import * as React from 'react';
import styles from './BrowseByIndex.module.scss';
import { IBrowseByIndexProps } from './IBrowseByIndexProps';
import { IFileItem } from '../../../model/IFileItem';
import { ITermNode } from '../../../model/ITermNode';
import { TaxonomyService } from '../../../services/TaxonomyService';
import { SPService } from '../../../services/SPService';
import { FileLabel } from './FileLabel';
import { TermLabel } from './TermLabel';

export const BrowseByIndex: React.FC<IBrowseByIndexProps> = (props) => {
  const [spSvc, setSpSvc] = React.useState<SPService>();
  const [fileItems, setFileItems] = React.useState<IFileItem[]>([]);
  const [terms, setTerms] = React.useState<ITermNode[]>([]);
  const [shownFiles, setShownFiles] = React.useState<IFileItem[]>([]);
  const [selectedTermnode, setSelectedTermnode] = React.useState<string>("");

  const termsetJson:string = '[{"guid":"650d1791-051a-4908-ad8f-076c443a4d44","childDocuments":0,"name":"000 Quality Manual","children":[],"subFiles":[]},{"guid":"2cdf37f6-3af1-4c02-ba41-6e3069a87c69","childDocuments":0,"name":"100 Development","children":[{"guid":"1b7c0c88-f23b-4f1f-9bae-7428b6872474","childDocuments":0,"name":"110 Product Development","children":[],"subFiles":[]},{"guid":"097ac040-4ce3-4554-807a-1b2f37de51ef","childDocuments":0,"name":"120 Manufacturing Process Development","children":[],"subFiles":[]},{"guid":"ef70f288-8c8d-4c4d-8094-a63f4fd39a14","childDocuments":0,"name":"130 Materials ＆ Component Management","children":[],"subFiles":[]}],"subFiles":[]},{"guid":"ec5eff43-40bc-4575-abcf-72f8b649cd6c","childDocuments":0,"name":"200 Production","children":[{"guid":"bdbe2e7f-23c6-4b23-86e5-4d638ee9cb20","childDocuments":0,"name":"210 Forecasting","children":[],"subFiles":[]},{"guid":"8bdafbe4-4f4a-42aa-b9a9-a52b3ee8e248","childDocuments":0,"name":"220 Planning","children":[],"subFiles":[]},{"guid":"e9f7b1e7-4925-4d59-b2c0-a1720e797c2f","childDocuments":0,"name":"230 Procurement","children":[],"subFiles":[]},{"guid":"02a94351-c228-4dc7-83c6-fd0c30f0b2d0","childDocuments":0,"name":"240 Receiving","children":[],"subFiles":[]},{"guid":"064d593f-0ac3-430d-9166-ed1099d50fdd","childDocuments":0,"name":"250 Production","children":[],"subFiles":[]}],"subFiles":[]},{"guid":"3fee90b1-10fa-4f04-b3d2-09f9a5f32ce9","childDocuments":0,"name":"300 Sales ＆ Distribution","children":[{"guid":"5716cbb0-7c02-43b5-b763-3a7d8bb03af0","childDocuments":0,"name":"310 Orders","children":[],"subFiles":[]},{"guid":"78f234bc-4b7f-4d36-8249-9f067d92dac6","childDocuments":0,"name":"320 Contract Management","children":[],"subFiles":[]},{"guid":"8410e127-7be9-467a-b24d-175fdd97627d","childDocuments":0,"name":"330 Warehouse Management","children":[],"subFiles":[]},{"guid":"d8699929-d90c-4abf-9de0-43801186d509","childDocuments":0,"name":"340 Installation","children":[],"subFiles":[]},{"guid":"8322bb63-4a55-4719-aa22-9670ac2438f8","childDocuments":0,"name":"350 Product Management","children":[],"subFiles":[]}],"subFiles":[]},{"guid":"1a4340fc-09fd-41d5-bbfe-6df7a4a5abaf","childDocuments":0,"name":"400 After Sales Support","children":[{"guid":"99f62276-a4f3-4551-8d25-6941fb273e68","childDocuments":0,"name":"410 Customer Service ＆ Technical Support","children":[],"subFiles":[]},{"guid":"5b4d2cfe-54dc-49a9-92cc-6d96bad6c947","childDocuments":0,"name":"420 Product Returns ＆ Repairs","children":[],"subFiles":[]},{"guid":"a1b0b75b-e7b7-490d-99c4-657430c1e4d8","childDocuments":0,"name":"430 Complaint Handling","children":[],"subFiles":[]},{"guid":"da010514-bb9b-4961-b179-809435086c3e","childDocuments":0,"name":"440 Post Market Surveillance","children":[],"subFiles":[]}],"subFiles":[]},{"guid":"6d43be9f-30be-4566-b306-ac4c4a76d830","childDocuments":0,"name":"500 Resource Management","children":[{"guid":"fa051aad-3923-4134-b7cf-01e392283553","childDocuments":0,"name":"510 Supplier Management","children":[],"subFiles":[]},{"guid":"0c647245-53a2-4a4b-873b-0affe2c6f044","childDocuments":0,"name":"520 HR Management","children":[],"subFiles":[]},{"guid":"47e63a1f-bd2b-47ff-bfab-a63f1768ef89","childDocuments":0,"name":"520 HR Management, 500 Resource Management","children":[],"subFiles":[]},{"guid":"550e93fd-501f-413c-869e-c9044ccf661b","childDocuments":0,"name":"520 HR Management, 620 Change Control","children":[],"subFiles":[]},{"guid":"ea024147-1f14-4236-b84c-d6a164c90670","childDocuments":0,"name":"530 Facility Management","children":[],"subFiles":[]},{"guid":"962e6c74-0a46-4988-9c1c-9f4ae43f3940","childDocuments":0,"name":"540 Equipment Management","children":[],"subFiles":[]},{"guid":"9bfb3680-3203-4c92-a658-76b9c340410c","childDocuments":0,"name":"550 Economic Operators","children":[],"subFiles":[]},{"guid":"5e76cb1e-efe8-45f8-bc69-915870296ab0","childDocuments":0,"name":"560 Contract Management","children":[],"subFiles":[]},{"guid":"b63a59b9-bd8f-4ad8-a724-521618e81607","childDocuments":0,"name":"570 IT Management","children":[],"subFiles":[]}],"subFiles":[]},{"guid":"5419d1ee-15d5-4a04-9d34-eae1289d0423","childDocuments":0,"name":"600 Change ＆ Risk Management","children":[{"guid":"9e6d67a7-3ca8-415b-81f7-5695af5f491c","childDocuments":0,"name":"610 Document ＆ Record Management","children":[],"subFiles":[]},{"guid":"98cada86-d320-4f0c-8e49-ff1b419dd3c6","childDocuments":0,"name":"620 Change Control","children":[],"subFiles":[]},{"guid":"032fc12c-4794-4231-a2c6-d12e0042e828","childDocuments":0,"name":"630 Risk Management","children":[],"subFiles":[]},{"guid":"f2702b47-2d87-4785-9ac0-844a97c6db33","childDocuments":0,"name":"640 Clinical","children":[],"subFiles":[]}],"subFiles":[]},{"guid":"a0e6b906-dd06-40b3-9f57-ea735a2ad42d","childDocuments":0,"name":"700 Improvement Management","children":[{"guid":"9bc3dfa1-c25d-4eac-b966-2a6c5584614b","childDocuments":0,"name":"710 Handling Non-Conformities","children":[],"subFiles":[]},{"guid":"3a7451f5-becc-41d1-a50d-7d5f10244cc7","childDocuments":0,"name":"720 CAPA","children":[],"subFiles":[]},{"guid":"7a9b9c35-e160-47fb-9828-e6163198a5e0","childDocuments":0,"name":"730 Quality Audits","children":[],"subFiles":[]},{"guid":"89618b4e-da66-4d35-844e-d2c36c44904c","childDocuments":0,"name":"740 Management Review","children":[],"subFiles":[]},{"guid":"bdf91781-2797-49b4-b4db-90b003c21c0b","childDocuments":0,"name":"750 Monitoring ＆ Improvement","children":[],"subFiles":[]}],"subFiles":[]}]';
  const buildTree = async () => {
    const taxSvc: TaxonomyService = new TaxonomyService();
    //const termsetID = await taxSvc.getTermsetInfo(props.fieldName);
    let termnodetree: ITermNode[];
    //const termnodetreeStr = sessionStorage.getItem(`Termtree_${termsetID}`);
    const termnodetreeStr = termsetJson;
    //if (termnodetreeStr === null) {
    //  termnodetree = await taxSvc.getTermset(termsetID);
    //  sessionStorage.setItem(`Termtree_${termsetID}`, JSON.stringify(termnodetree));
    //}
    //else {
      termnodetree = JSON.parse(termnodetreeStr);
      console.log("termnodetreeStr");
      console.log(termnodetreeStr);
    //}

    const spSrvc: SPService = new SPService(props.listName, props.fieldName);
    const files = await spSrvc.getItems("termsetID");
    setSpSvc(spSrvc);
    updateFiles(files, termnodetree);
  };

  const updateFiles = (files: IFileItem[], termnodetree: ITermNode[]) => {
    const taxSvc: TaxonomyService = new TaxonomyService();
    termnodetree = taxSvc.incorporateFiles(termnodetree, files);
    setFileItems(files);
    setTerms(termnodetree);
  };

  const renderFiles = (files: IFileItem[]) => {
    setShownFiles(files);
  };

  const resetChecked = (newNodeID: string) => {
    setSelectedTermnode(newNodeID);
  };

/*   const reloadFiles = (file: IFileItem) => {
    const newFiles: IFileItem[] = [];
    fileItems.forEach(fi => {
      if (fi.id === file.id && fi.url === file.url) {
        newFiles.push(file);
      }
      else {
        newFiles.push(fi);
      }
    });
    updateFiles(newFiles, terms);
  };

  const loadNewFiles = (file: IFileItem) => {
    const newFiles: IFileItem[] = [file].concat(fileItems);
    updateFiles(newFiles, terms);
  }; */

/*   const addTerm = (file: IFileItem, newTaxonomyValue: string) => {
    spSvc.updateTaxonomyItemByAdd(file, props.fieldName, newTaxonomyValue);
    reloadFiles(file);
  };

  const replaceTerm = (file: IFileItem, newTaxonomyValue: string) => {
    spSvc.updateTaxonomyItemByReplace(file, props.fieldName, newTaxonomyValue);
    reloadFiles(file);
  };

  const copyFile = async (file: IFileItem, newTaxonomyValue: string) => {
    const newFile = await spSvc.newTaxonomyItemByCopy(file, props.fieldName, newTaxonomyValue);
    loadNewFiles(newFile);
  };

  const uploadFile = async (file: any, newTaxonomyValue: string) => {
    const newFile = await spSvc.newTaxonomyItemByUpload(file, props.fieldName, newTaxonomyValue);
    loadNewFiles(newFile);
  }; */

  React.useEffect(() => {
    buildTree();
  }, []);
  return (
    <div className={styles.browseByIndex}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <ul>
              {terms.map(nc => {
                return <TermLabel node={nc}
                  renderFiles={renderFiles}
                  resetChecked={resetChecked}
                  selectedNode={selectedTermnode}
                  //addTerm={addTerm}
                  //replaceTerm={replaceTerm}
                  //copyFile={copyFile}
                  //uploadFile={uploadFile}
                   />;
              })}
            </ul>
          </div>
          <div className={styles.column}>
            {shownFiles.length > 0 &&
              <ul>
                {shownFiles.map(f => {
                  return <FileLabel file={f} />;
                })}
              </ul>}
          </div>
        </div>
      </div>
    </div>
  );

};
