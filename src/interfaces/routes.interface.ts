export enum ROUTE {
  HOME = '/',
  SETTINGS = '/store/:store/postavke',
  DASHBOARD = '/store/:store/dashboard',
  CATEGORIES = '/store/:store/kategorije',
  ARTICLES = '/store/:store/artikli',
  ORDERS = '/store/:store/narudzbe',
  NAPLATA = '/store/:store/naplata',
  STORE = '/store/:store',
  NAME = '/store/name',
}

type TArgs =
  | { path: ROUTE.HOME }
  | { path: ROUTE.SETTINGS; params: { store: string } }
  | { path: ROUTE.CATEGORIES; params: { store: string } }
  | { path: ROUTE.ARTICLES; params: { store: string } }
  | { path: ROUTE.ORDERS; params: { store: string } }
  | { path: ROUTE.NAPLATA; params: { store: string } }
  | { path: ROUTE.STORE; params: { store: string } }
  | { path: ROUTE.NAME }
  | { path: ROUTE.DASHBOARD; params: { store: string } };

type TArgsWithParams = Extract<TArgs, { path: any; params: any }>;

export function createPath(args: TArgs) {
  // Save some CPU power for routes without params
  if (args.hasOwnProperty('params') === false) return args.path;

  // Create a path by replacing params in the route definition
  return Object.entries((args as TArgsWithParams).params).reduce(
    (previousValue: string, [param, value]) =>
      previousValue.replace(`:${param}`, '' + value),
    args.path
  );
}
