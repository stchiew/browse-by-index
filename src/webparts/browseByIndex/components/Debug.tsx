import * as React from "react";
import { SPService } from "../../../services/SPService";
import { IBrowseByIndexProps } from "./IBrowseByIndexProps";

export const Debug: React.FC<IBrowseByIndexProps> = (props) => {
  const buildTree = async () => {
    const spSrvc: SPService = new SPService(props.listName, props.fieldName);
    const files = await spSrvc.getItemsByChoice();

    //console.log("files");
    //console.log(files);
  };
  React.useEffect(() => {
    buildTree();
  }, []);
  return <div>Debug Page</div>;
};
