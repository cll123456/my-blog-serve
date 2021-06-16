/**
 * swaggerjson 的最外层的配置
 */
export interface ISwaggerJson {
  openapi: string;
  info: Information;
  servers?: any;
  paths: Paths;
  components?: any;
  security?: any;
  tags?: ReadonlyArray<Tag>;
  [key: string]: any;
}
/**
 * info config
 */
interface Information {
  title: string;
  description?: string;
  termsOfService?: string;
  contact?: string;
  license?: string;
  version: string;
  [key: string]: any;
}
/**
 * module catalog config
 */
interface Tag {
  name: string;
  description?: string;
  externalDocs?: any;
  [key: string]: any;
}

/**
 * paths config
 */
interface Paths {
  [key: string]: PathItem;
}


/**
 * pathItem 
 */
export interface PathItem {
  $ref?: string;
  summary?: string;
  description?: string;
  get?: Operation;
  put?: Operation;
  post?: Operation;
  delete?: Operation;
  options?: Operation;
  head?: Operation;
  patch?: Operation;
  trace?: Operation;
  parameters?: Parameter | Reference;
  [key: string]: any;
}

interface Operation {
  tags?: string[];
  summary?: string;
  description?: string;
  operationId?: string;
  parameters?: ReadonlyArray<Parameter | Reference>;
  requestBody?: RequestBody | Reference;
  responses?: any;
  [key: string]: any;
}

interface Parameter {
  name: string;
  in: "query" | "header" | "path" | "cookie";
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  allowEmptyValue?: boolean;
  style?: string;
  explode?: boolean;
  allowReserved?: boolean;
  schema?: any;
  example?: any;
  examples?: any;
  [key: string]: any;
}

interface Reference {
  $ref: string;
}

interface RequestBody {
  description?: string;
  content: any;
  required?: boolean;
  [key: string]: any;
}