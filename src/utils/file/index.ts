import fs from 'fs';
/**
 * 通过文件夹名称来动态导入
 * @param dirName 
 */
export function syncImportByDir(dirAbsName: string) {
  // 获取目录文件夹
  const fileRes = fs.readdirSync(dirAbsName);
  // 读取文件夹，然后动态导入
  fileRes.forEach(p => {
    import( dirAbsName + '/' + p)
  });
}