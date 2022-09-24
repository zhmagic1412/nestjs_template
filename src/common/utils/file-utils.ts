import * as dayjs from "dayjs";

const fs = require("fs");


const readDirSync =(id: number, parentId: number, root: string,path:string, res: any[])=>{
  const pa = fs.readdirSync(path);
  pa.forEach(function(ele, index) {
    const info = fs.statSync(root + "/"+path + "/" + ele);
    id++;
    if (info.isDirectory()) {
      res.push(
        {
          id: id,
          parentId: parentId,
          name: ele,
          isDirectory: 1,
          size: -1
        }
      )
      readDirSync(id, id, root,path + "/" + ele, res);
      id = res.length;
    } else {
      res.push(
        {
          id: id,
          parentId: parentId,
          name:  ele,
          isDirectory: 0,
          size: info.size
        }
      )
    }
  });
}

const uploadStaticFile = (file:any):string=>{
  const { buffer } = file
  const arr = file.originalname.split('.')
  const fileType = arr[arr.length - 1]
  const name = arr[0] + '_' +dayjs().format('YYYYMMDD_hhmmss')
  const fileName = name + '.' + fileType
  fs.writeFileSync(`./static/blog/${fileName}`, buffer)
  return `/static/blog/${fileName}`
}


export {
  readDirSync,
  uploadStaticFile
};

