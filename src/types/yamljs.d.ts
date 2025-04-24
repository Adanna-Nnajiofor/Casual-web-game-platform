declare module "yamljs" {
  const yamljs: {
    load: (path: string) => any;
    parse: (yamlString: string) => any;
    stringify: (obj: any, inline?: number, spaces?: number) => string;
  };
  export = yamljs;
}
