export type MakeAPIRequestProps = {
  url: string;
  apiKey: string | undefined;
  queryParams?: {
    field_list: string;
    filter: string;
    json?: string;
    limit: number;
  };
};
