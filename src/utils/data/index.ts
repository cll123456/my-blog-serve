
/**
 * 成功数据包裹
 * @param data 
 * @returns 
 */
export function dataFormate(data: unknown, code = 200){
  return {
    code,
    data
  }
}

