import {swaggerJson} from './swaggerObj';
import { PathItem } from './types';

export function genOpenApiMark(pathname: string, obj: PathItem){

  swaggerJson.paths[pathname] = obj
}